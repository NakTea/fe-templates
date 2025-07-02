#!/usr/bin/env node

const ThemeReplacer = require('./themeReplacer');
const themeMapping = require('./themeMapping');
const themeMappingLight = require('./themeMappingLight');
const path = require('path');

// 解析命令行参数
const args = process.argv.slice(2);
const options = {};
const files = [];

const themes = {
  light: themeMappingLight,
  dark: themeMapping,
};

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    switch (arg) {
        case '--output':
        case '-o':
            options.output = args[++i];
            break;
        case '-theme':
            options.theme = args[++i];
            break;
        case '--preview':
        case '-p':
            options.preview = true;
            break;
        case '--directory':
        case '-d':
            options.directory = true;
            break;
        case '--extensions':
        case '-e':
            options.extensions = args[++i].split(',');
            break;
        case '--help':
        case '-h':
            showHelp();
            process.exit(0);
            break;
        default:
            if (!arg.startsWith('-')) {
                files.push(arg);
            }
            break;
    }
}

function showHelp() {
    console.log(`
主题替换工具 - Theme Replacer

用法:
  node cli.js [选项] <文件或目录路径>

选项:
  -o, --output <路径>     指定输出路径
  -p, --preview          预览模式，不实际替换文件
  -d, --directory        处理整个目录
  -e, --extensions <ext>  指定处理的文件扩展名 (默认: .html,.css)
  -h, --help             显示帮助信息

示例:
  node cli.js input.html                          # 处理单个文件
  node cli.js input.html -o output.html          # 处理单个文件并指定输出
  node cli.js -p input.html                      # 预览替换结果
  node cli.js -d ./src -o ./dist                 # 处理整个目录
  node cli.js -d ./src -e .html,.css,.scss       # 处理目录中的特定文件类型
  node cli.js -d ./source -o ./target -theme light # 替换html的白天主题
  node cli.js -d ./source -o ./target -theme dark # 替换html的夜间主题
    `);
}

// 主执行函数
function main() {
    if (files.length === 0) {
        console.error('错误: 请指定要处理的文件或目录');
        showHelp();
        process.exit(1);
    }

    const replacer = new ThemeReplacer(themes?.[options.theme || 'dark']);

    // 验证映射配置
    if (!replacer.validateMapping()) {
        process.exit(1);
    }

    try {
        files.forEach(filePath => {
            const fullPath = path.resolve(filePath);

            if (options.preview) {
                // 预览模式
                replacer.previewReplacements(fullPath);
            } else if (options.directory) {
                // 目录处理模式
                const extensions = options.extensions || ['.html', '.css'];
                replacer.processDirectory(fullPath, options.output, extensions);
            } else {
                // 单文件处理模式
                replacer.processFile(fullPath, options.output);
            }
        });

        if (!options.preview) {
            console.log('\n✅ 所有文件处理完成!');
        }
    } catch (error) {
        console.error('❌ 处理过程中出现错误:', error.message);
        process.exit(1);
    }
}

// 如果没有提供参数，显示帮助
if (args.length === 0) {
    showHelp();
    process.exit(0);
}

main();
