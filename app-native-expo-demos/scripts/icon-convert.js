const fs = require('fs');
const path = require('path');
const { transform } = require('@svgr/core');
const { ensureDir, readdir, readFile, writeFile } = require('fs-extra');
const prettier = require('prettier');

// 配置项
const SVG_DIR = '../assets/icons'; // SVG源目录
const COMPONENT_DIR = '../components/Icons'; // 组件输出目录

// Prettier配置
const PRETTIER_CONFIG = {
  printWidth: 120,
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  parser: 'typescript',
};

// 转换为大驼峰命名
const toPascalCase = (str) => {
  return str
    .replace(/-/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\.[^/.]+$/, '')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
};

// 使用Prettier格式化代码
const formatCode = (code) => {
  return prettier.format(code, PRETTIER_CONFIG);
};

// 核心转换函数
const convertSvgToComponent = async () => {
  try {
    await ensureDir(COMPONENT_DIR);
    const files = await readdir(SVG_DIR);
    const svgFiles = files.filter((file) => path.extname(file).toLowerCase() === '.svg');

    for (const file of svgFiles) {
      const filePath = path.join(SVG_DIR, file);
      const svgCode = await readFile(filePath, 'utf8');

      // 获取组件名
      const componentName = toPascalCase(path.basename(file, '.svg'));

      // 使用SVGR转换
      const jsCode = await transform(
        svgCode,
        {
          plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
          native: true,
          expandProps: 'end', // 属性扩展位置
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                    // 清理可能干扰props的颜色属性
                    removeAttrs: {
                      attrs: '(fill|stroke|width|height)',
                    },
                  },
                },
              },
            ],
          },
        },
        { componentName },
      );

      // 格式化并写入文件
      const formattedCode = await formatCode(jsCode);
      const outputPath = path.join(COMPONENT_DIR, `${componentName}.tsx`);
      await writeFile(outputPath, formattedCode);
      console.log(`Generated: ${componentName}.tsx`);
    }

    console.log(`\n✅ 转换完成！共生成 ${svgFiles.length} 个组件`);
  } catch (error) {
    console.error('转换出错:', error);
  }
};

// 执行转换
convertSvgToComponent();
