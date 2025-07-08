// node convertFontStyles.js [目标文件夹路径]

const fs = require('fs');
const path = require('path');

/**
 * 将复合的 `font` 属性转换为单独属性
 * 示例：
 *   font: 800 70px/1.4 sans-serif;
 *   转换为：
 *   font-weight: 800; font-size: 70px; line-height: 1.4;
 */
function convertFontStyles(htmlContent) {
    // 匹配 font: <weight> <size>/<lineHeight> <family>; 格式
    const fontRegex = /font:\s*(\d{3})\s+(\d+px)\/([\d.]+)\s+sans-serif;/g;

    return htmlContent.replace(fontRegex, (match, weight, size, lineHeight) => {
        return `font-weight: ${weight}; font-size: ${size}; line-height: ${lineHeight};`;
    });
}

/**
 * 处理单个 HTML 文件
 */
function processHtmlFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        const newContent = convertFontStyles(content);

        if (newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`✅ 已更新: ${filePath}`);
        } else {
            console.log(`🔍 无需更新: ${filePath}`);
        }
    } catch (err) {
        console.error(`❌ 处理 ${filePath} 时出错:`, err.message);
    }
}

/**
 * 递归扫描文件夹中的 HTML 文件
 */
function scanAndProcessHtmlFiles(directory) {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanAndProcessHtmlFiles(fullPath); // 递归处理子目录
        } else if (file.endsWith('.html')) {
            processHtmlFile(fullPath);
        }
    });
}

// 主程序
const targetDir = process.argv[2] || './'; // 从命令行参数获取路径，默认当前目录

if (!fs.existsSync(targetDir)) {
    console.error('❌ 错误：指定的路径不存在！');
    process.exit(1);
}

console.log(`🔄 开始扫描目录: ${targetDir}`);
scanAndProcessHtmlFiles(targetDir);
console.log('🎉 处理完成！');