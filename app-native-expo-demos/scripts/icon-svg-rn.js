//  node ./scripts/icon-svg-rn.js ./assets/icons ./components/Icons
const fs = require('fs').promises;
const path = require('path');
const { transform } = require('@svgr/core');

// 将文件名转换为大驼峰命名
function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]/g, ' ') // 将非字母数字字符替换为空格
    .split(' ')
    .filter((word) => word.length > 0)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// 检查文件是否为SVG文件
function isSvgFile(filename) {
  return path.extname(filename).toLowerCase() === '.svg';
}

// 预处理SVG内容，处理可能导致问题的元素
function preprocessSvg(svgContent) {
  // 移除XML声明
  let processed = svgContent.replace(/<\?xml[^>]*\?>/g, '');

  // 移除standalone属性
  processed = processed.replace(/standalone="[^"]*"/g, '');

  // 确保SVG有正确的命名空间
  if (!processed.includes('xmlns="http://www.w3.org/2000/svg"')) {
    processed = processed.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  return processed.trim();
}

// 转换单个SVG文件
async function convertSvgFile(inputPath, outputDir) {
  try {
    // 读取SVG文件内容
    const originalSvgContent = await fs.readFile(inputPath, 'utf8');

    // 预处理SVG内容
    const svgContent = preprocessSvg(originalSvgContent);

    // 获取文件名（不含扩展名）
    const filename = path.basename(inputPath, '.svg');

    // 转换为大驼峰命名
    const componentName = toPascalCase(filename);

    // 使用@svgr/core转换SVG
    const jsxCode = await transform(
      svgContent,
      {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
        native: true, // React Native模式
        typescript: true, // 生成TypeScript
        expandProps: 'end', // 将props展开放在末尾
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                  removeDimensions: false,
                  // 保留所有重要的颜色和样式相关元素
                  removeUselessDefs: false,
                  cleanupIds: false,
                  removeUnknownsAndDefaults: false,
                  // 保留渐变和样式
                  removeStyleElement: false,
                  removeUselessStrokeAndFill: false,
                  // 不要移除或修改颜色
                  convertColors: false,
                  // 保留所有属性
                  removeUnusedNS: false,
                  removeXMLNS: false,
                  // 不要合并路径，可能会影响渐变
                  mergePaths: false,
                  convertShapeToPath: false,
                },
              },
            },
          ],
        },
        // 自定义模板
        template: (variables, { tpl }) => {
          return tpl`
${variables.imports};

${variables.interfaces};

const ${componentName} = (${variables.props}) => (
  ${variables.jsx}
);

export default ${componentName};
`;
        },
        // JSX运行时配置
        jsxRuntime: 'classic',
        // 保留原始属性名
        svgProps: {
          titleProp: true,
          descProp: true,
        },
      },
      { componentName },
    );

    // 输出文件路径
    const outputPath = path.join(outputDir, `${componentName}.tsx`);

    // 写入转换后的文件
    await fs.writeFile(outputPath, jsxCode);

    console.log(`✅ 转换成功: ${filename}.svg -> ${componentName}.tsx`);
  } catch (error) {
    console.error(`❌ 转换失败: ${path.basename(inputPath)}`);
    console.error(`   错误信息: ${error.message}`);

    // 尝试使用更宽松的配置重新转换
    try {
      console.log(`🔄 尝试使用备用配置转换: ${path.basename(inputPath)}`);
      await convertSvgFileWithFallback(inputPath, outputDir);
    } catch (fallbackError) {
      console.error(`❌ 备用转换也失败: ${fallbackError.message}`);

      // 最后尝试不使用SVGO优化
      try {
        console.log(`🔄 尝试不使用优化转换: ${path.basename(inputPath)}`);
        await convertSvgFileWithoutOptimization(inputPath, outputDir);
      } catch (finalError) {
        console.error(`❌ 所有转换方式都失败: ${finalError.message}`);
      }
    }
  }
}

// 备用转换方法，使用更宽松的配置
async function convertSvgFileWithFallback(inputPath, outputDir) {
  const originalSvgContent = await fs.readFile(inputPath, 'utf8');
  const svgContent = preprocessSvg(originalSvgContent);
  const filename = path.basename(inputPath, '.svg');
  const componentName = toPascalCase(filename);

  // 使用最小化的配置，但保留颜色
  const jsxCode = await transform(
    svgContent,
    {
      plugins: ['@svgr/plugin-jsx'],
      native: true,
      typescript: true,
      expandProps: 'end',
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                removeViewBox: false,
                removeDimensions: false,
                removeUselessDefs: false,
                cleanupIds: false,
                removeXMLNS: false,
                // 完全禁用可能影响颜色的优化
                convertShapeToPath: false,
                mergePaths: false,
                convertColors: false,
                removeUselessStrokeAndFill: false,
                removeStyleElement: false,
                removeUnknownsAndDefaults: false,
              },
            },
          },
        ],
      },
      template: (variables, { tpl }) => {
        return tpl`
${variables.imports};

${variables.interfaces};

const ${componentName} = (${variables.props}) => (
  ${variables.jsx}
);

export default ${componentName};
`;
      },
    },
    { componentName },
  );

  const outputPath = path.join(outputDir, `${componentName}.tsx`);
  await fs.writeFile(outputPath, jsxCode);

  console.log(`✅ 备用转换成功: ${filename}.svg -> ${componentName}.tsx`);
}

// 不使用SVGO优化的转换方法
async function convertSvgFileWithoutOptimization(inputPath, outputDir) {
  const originalSvgContent = await fs.readFile(inputPath, 'utf8');
  const svgContent = preprocessSvg(originalSvgContent);
  const filename = path.basename(inputPath, '.svg');
  const componentName = toPascalCase(filename);

  // 完全不使用SVGO优化
  const jsxCode = await transform(
    svgContent,
    {
      plugins: ['@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      native: true,
      typescript: true,
      expandProps: 'end',
      // 不使用SVGO
      svgo: false,
      template: (variables, { tpl }) => {
        return tpl`
${variables.imports};

${variables.interfaces};

const ${componentName} = (${variables.props}) => (
  ${variables.jsx}
);

export default ${componentName};
`;
      },
    },
    { componentName },
  );

  const outputPath = path.join(outputDir, `${componentName}.tsx`);
  await fs.writeFile(outputPath, jsxCode);

  console.log(`✅ 无优化转换成功: ${filename}.svg -> ${componentName}.tsx`);
}

// 批量转换目录下的所有SVG文件
async function convertSvgDirectory(inputDir, outputDir) {
  try {
    // 检查输入目录是否存在
    const inputStats = await fs.stat(inputDir);
    if (!inputStats.isDirectory()) {
      throw new Error(`输入路径不是目录: ${inputDir}`);
    }

    // 创建输出目录（如果不存在）
    await fs.mkdir(outputDir, { recursive: true });

    // 读取输入目录中的所有文件
    const files = await fs.readdir(inputDir);

    // 过滤出SVG文件
    const svgFiles = files.filter(isSvgFile);

    if (svgFiles.length === 0) {
      console.log(`📂 目录 ${inputDir} 中没有找到SVG文件`);
      return;
    }

    console.log(`📂 找到 ${svgFiles.length} 个SVG文件，开始转换...`);
    console.log('');

    // 顺序转换SVG文件（避免并发导致的问题）
    for (const file of svgFiles) {
      const inputPath = path.join(inputDir, file);
      await convertSvgFile(inputPath, outputDir);
    }

    console.log('');
    console.log(`🎉 转换完成！共处理 ${svgFiles.length} 个文件`);
    console.log(`📁 输出目录: ${path.resolve(outputDir)}`);
  } catch (error) {
    console.error('❌ 批量转换失败:', error.message);
    process.exit(1);
  }
}

// 主函数
async function main() {
  // 从命令行参数获取输入和输出目录
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('使用方法:');
    console.log('  node svg-converter.js <输入目录> [输出目录]');
    console.log('');
    console.log('示例:');
    console.log('  node svg-converter.js ./svg-icons ./components');
    console.log('  node svg-converter.js ./icons');
    console.log('');
    console.log('选项:');
    console.log('  --no-optimize  不使用SVGO优化（保留所有原始属性）');
    process.exit(1);
  }

  const inputDir = args[0];
  const outputDir = args[1] || './converted-components';

  console.log(`🚀 开始转换 SVG 文件...`);
  console.log(`📂 输入目录: ${path.resolve(inputDir)}`);
  console.log(`📁 输出目录: ${path.resolve(outputDir)}`);
  console.log('');

  await convertSvgDirectory(inputDir, outputDir);
}

// 运行主函数
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ 脚本执行失败:', error);
    process.exit(1);
  });
}

module.exports = {
  convertSvgDirectory,
  convertSvgFile,
  toPascalCase,
};
