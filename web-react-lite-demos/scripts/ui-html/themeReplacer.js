const fs = require('fs');
const path = require('path');

class ThemeReplacer {
    constructor(mappingConfig) {
        this.mapping = mappingConfig;
        this.cssVarPattern = /--([a-zA-Z][a-zA-Z0-9-]*)\s*:\s*([^;]+);/g;
        this.cssVarUsagePattern = /var\(--([a-zA-Z][a-zA-Z0-9-]*)\)/g;
        // 新增：CSS类选择器模式
        this.cssClassPattern = /\.([a-zA-Z][a-zA-Z0-9-_]*)\s*\{([^}]+)\}/g;
        // 新增：HTML类名模式
        this.htmlClassPattern = /class\s*=\s*["']([^"']+)["']/g;
    }

    /**
     * 替换CSS变量定义（:root 部分）
     */
    replaceCSSVariableDefinitions(content) {
        return content.replace(this.cssVarPattern, (match, varName, value) => {
            const mapping = this.mapping[varName];
            if (mapping) {
                console.log(`替换变量定义: --${varName} → --${mapping.name}`);
                console.log(`替换变量值: ${value.trim()} → ${mapping.value}`);
                return `--${mapping.name}: ${mapping.value};`;
            }
            return match;
        });
    }

    /**
     * 替换CSS变量使用（var() 部分）
     */
    replaceCSSVariableUsages(content) {
        return content.replace(this.cssVarUsagePattern, (match, varName) => {
            const mapping = this.mapping[varName];
            if (mapping) {
                console.log(`替换变量使用: var(--${varName}) → var(--${mapping.name})`);
                return `var(--${mapping.name})`;
            }
            return match;
        });
    }

    /**
     * 新增：替换CSS类定义
     */
    replaceCSSClassDefinitions(content) {
        return content.replace(this.cssClassPattern, (match, className, styles) => {
            const mapping = this.mapping[className];
            if (mapping && typeof mapping.value === 'object') {
                console.log(`替换CSS类定义: .${className} → .${mapping.name}`);

                // 将对象形式的样式转换为CSS字符串
                const newStyles = this.objectToCSSString(mapping.value);
                console.log(`替换类样式: ${styles.trim()} → ${newStyles}`);

                return `.${mapping.name} { ${newStyles} }`;
            }
            return match;
        });
    }

    /**
     * 新增：替换HTML中的类名
     */
    replaceHTMLClassNames(content) {
        return content.replace(this.htmlClassPattern, (match, classNames) => {
            const classes = classNames.split(/\s+/).filter(cls => cls.length > 0);
            let hasReplacement = false;

            const newClasses = classes.map(className => {
                const mapping = this.mapping[className];
                if (mapping) {
                    console.log(`替换HTML类名: ${className} → ${mapping.name}`);
                    hasReplacement = true;
                    return mapping.name;
                }
                return className;
            });

            if (hasReplacement) {
                const quote = match.includes('"') ? '"' : "'";
                return `class=${quote}${newClasses.join(' ')}${quote}`;
            }
            return match;
        });
    }

    /**
     * 新增：将样式对象转换为CSS字符串
     */
    objectToCSSString(styleObj) {
        return `${Object.entries(styleObj)
            .map(([property, value]) => `${property}: ${value}`)
            .join('; ')};`;
    }

    /**
     * 新增：检测内容类型
     */
    detectContentType(content, filePath) {
        const ext = path.extname(filePath).toLowerCase();

        if (ext === '.css') {
            return 'css';
        } else if (ext === '.html' || ext === '.htm') {
            return 'html';
        } else {
            // 基于内容检测
            if (content.includes('<!DOCTYPE') || content.includes('<html')) {
                return 'html';
            } else if (content.includes('{') && content.includes('}')) {
                return 'css';
            }
            return 'unknown';
        }
    }

    /**
     * 更新：处理单个文件 - 支持类名替换
     */
    processFile(filePath, outputPath = null) {
        try {
            console.log(`\n开始处理文件: ${filePath}`);

            // 读取文件内容
            const content = fs.readFileSync(filePath, 'utf8');
            const contentType = this.detectContentType(content, filePath);

            console.log(`检测到文件类型: ${contentType}`);

            let processedContent = content;

            // 根据文件类型执行不同的替换策略
            if (contentType === 'html') {
                // HTML文件：替换CSS变量、CSS类定义和HTML类名
                processedContent = this.replaceCSSVariableDefinitions(processedContent);
                processedContent = this.replaceCSSVariableUsages(processedContent);
                processedContent = this.replaceCSSClassDefinitions(processedContent);
                processedContent = this.replaceHTMLClassNames(processedContent);
            } else if (contentType === 'css') {
                // CSS文件：只替换CSS变量和类定义
                processedContent = this.replaceCSSVariableDefinitions(processedContent);
                processedContent = this.replaceCSSVariableUsages(processedContent);
                processedContent = this.replaceCSSClassDefinitions(processedContent);
            } else {
                console.log('未知文件类型，尝试执行所有替换...');
                processedContent = this.replaceCSSVariableDefinitions(processedContent);
                processedContent = this.replaceCSSVariableUsages(processedContent);
                processedContent = this.replaceCSSClassDefinitions(processedContent);
                processedContent = this.replaceHTMLClassNames(processedContent);
            }

            // 确定输出路径
            const finalOutputPath = outputPath || this.generateOutputPath(filePath);

            // 写入处理后的文件
            fs.writeFileSync(finalOutputPath, processedContent, 'utf8');

            console.log(`文件处理完成，输出到: ${finalOutputPath}`);
            return finalOutputPath;
        } catch (error) {
            console.error(`处理文件 ${filePath} 时出错:`, error.message);
            throw error;
        }
    }

    /**
     * 批量处理文件夹
     */
    processDirectory(inputDir, outputDir = null, fileExtensions = ['.html', '.css']) {
        try {
            console.log(`\n开始处理目录: ${inputDir}`);

            const files = fs.readdirSync(inputDir);
            const processedFiles = [];

            // 创建输出目录
            if (outputDir && !fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            files.forEach(file => {
                const filePath = path.join(inputDir, file);
                const stat = fs.statSync(filePath);

                if (stat.isFile()) {
                    const ext = path.extname(file).toLowerCase();
                    if (fileExtensions.includes(ext)) {
                        const outputPath = outputDir ? path.join(outputDir, file) : null;
                        const processedPath = this.processFile(filePath, outputPath);
                        processedFiles.push(processedPath);
                    }
                } else if (stat.isDirectory()) {
                    // 递归处理子目录
                    const subOutputDir = outputDir ? path.join(outputDir, file) : null;
                    const subProcessedFiles = this.processDirectory(filePath, subOutputDir, fileExtensions);
                    processedFiles.push(...subProcessedFiles);
                }
            });

            console.log(`目录处理完成，共处理 ${processedFiles.length} 个文件`);
            return processedFiles;
        } catch (error) {
            console.error(`处理目录 ${inputDir} 时出错:`, error.message);
            throw error;
        }
    }

    /**
     * 生成输出文件路径
     */
    generateOutputPath(inputPath) {
        const dir = path.dirname(inputPath);
        const ext = path.extname(inputPath);
        const name = path.basename(inputPath, ext);
        return path.join(dir, `${name}_themed${ext}`);
    }

    /**
     * 更新：预览替换结果 - 包含类名替换
     */
    previewReplacements(filePath) {
        console.log(`\n预览文件替换: ${filePath}`);

        const content = fs.readFileSync(filePath, 'utf8');
        const contentType = this.detectContentType(content, filePath);
        const replacements = [];

        console.log(`文件类型: ${contentType}`);

        // 查找CSS变量定义
        let match;
        while ((match = this.cssVarPattern.exec(content)) !== null) {
            const varName = match[1];
            const value = match[2].trim();
            const mapping = this.mapping[varName];

            if (mapping) {
                replacements.push({
                    type: 'css-variable-definition',
                    original: `--${varName}: ${value}`,
                    replacement: `--${mapping.name}: ${mapping.value}`,
                    line: this.getLineNumber(content, match.index),
                });
            }
        }
        this.cssVarPattern.lastIndex = 0;

        // 查找CSS变量使用
        while ((match = this.cssVarUsagePattern.exec(content)) !== null) {
            const varName = match[1];
            const mapping = this.mapping[varName];

            if (mapping) {
                replacements.push({
                    type: 'css-variable-usage',
                    original: `var(--${varName})`,
                    replacement: `var(--${mapping.name})`,
                    line: this.getLineNumber(content, match.index),
                });
            }
        }
        this.cssVarUsagePattern.lastIndex = 0;

        // 查找CSS类定义
        while ((match = this.cssClassPattern.exec(content)) !== null) {
            const className = match[1];
            const styles = match[2];
            const mapping = this.mapping[className];

            if (mapping && typeof mapping.value === 'object') {
                const newStyles = this.objectToCSSString(mapping.value);
                replacements.push({
                    type: 'css-class-definition',
                    original: `.${className} { ${styles.trim()} }`,
                    replacement: `.${mapping.name} { ${newStyles} }`,
                    line: this.getLineNumber(content, match.index),
                });
            }
        }
        this.cssClassPattern.lastIndex = 0;

        // 查找HTML类名（仅对HTML文件）
        if (contentType === 'html') {
            while ((match = this.htmlClassPattern.exec(content)) !== null) {
                const classNames = match[1];
                const classes = classNames.split(/\s+/).filter(cls => cls.length > 0);
                let hasMapping = false;

                const newClasses = classes.map(className => {
                    const mapping = this.mapping[className];
                    if (mapping) {
                        hasMapping = true;
                        return mapping.name;
                    }
                    return className;
                });

                if (hasMapping) {
                    const quote = match[0].includes('"') ? '"' : "'";
                    replacements.push({
                        type: 'html-class-name',
                        original: `class=${quote}${classNames}${quote}`,
                        replacement: `class=${quote}${newClasses.join(' ')}${quote}`,
                        line: this.getLineNumber(content, match.index),
                    });
                }
            }
            this.htmlClassPattern.lastIndex = 0;
        }

        // 输出预览结果
        if (replacements.length > 0) {
            console.log(`\n找到 ${replacements.length} 个需要替换的项目:`);
            replacements.forEach((item, index) => {
                console.log(`${index + 1}. 第${item.line}行 [${item.type}]:`);
                console.log(`   原始: ${item.original}`);
                console.log(`   替换: ${item.replacement}`);
            });
        } else {
            console.log('未找到需要替换的变量或类名');
        }

        return replacements;
    }

    /**
     * 获取指定位置的行号
     */
    getLineNumber(content, index) {
        return content.substring(0, index).split('\n').length;
    }

    /**
     * 更新：验证映射配置 - 支持对象值
     */
    validateMapping() {
        console.log('\n验证映射配置:');
        const issues = [];

        Object.entries(this.mapping).forEach(([key, config]) => {
            if (!config.name || config.value === undefined) {
                issues.push(`配置项 "${key}" 缺少必要的 name 或 value 字段`);
            }

            // 检查CSS变量名格式
            if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(config.name)) {
                issues.push(`配置项 "${key}" 的 name "${config.name}" 不符合CSS变量/类名命名规范`);
            }

            // 验证对象类型的值
            if (typeof config.value === 'object') {
                Object.entries(config.value).forEach(([prop, val]) => {
                    if (typeof val !== 'string' && typeof val !== 'number') {
                        issues.push(`配置项 "${key}" 的样式属性 "${prop}" 值类型无效`);
                    }
                });
            }
        });

        if (issues.length > 0) {
            console.error('映射配置存在问题:');
            issues.forEach(issue => console.error(`- ${issue}`));
            return false;
        }

        console.log('映射配置验证通过');
        return true;
    }

    /**
     * 新增：生成映射统计报告
     */
    generateMappingReport() {
        console.log('\n=== 映射配置报告 ===');

        const stats = {
            cssVariables: 0,
            cssClasses: 0,
            total: 0,
        };

        Object.entries(this.mapping).forEach(([key, config]) => {
            stats.total++;

            if (typeof config.value === 'object') {
                stats.cssClasses++;
                console.log(`📝 CSS类: ${key} → ${config.name}`);
                console.log(`   样式: ${this.objectToCSSString(config.value)}`);
            } else {
                stats.cssVariables++;
                console.log(`🎨 CSS变量: ${key} → ${config.name} (${config.value})`);
            }
        });

        console.log('\n📊 统计信息:');
        console.log(`   CSS变量: ${stats.cssVariables} 个`);
        console.log(`   CSS类: ${stats.cssClasses} 个`);
        console.log(`   总计: ${stats.total} 个`);

        return stats;
    }
}

module.exports = ThemeReplacer;
