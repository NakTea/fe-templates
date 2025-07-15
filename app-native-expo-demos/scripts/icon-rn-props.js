// node ./scripts/icon-rn-props.js ./components/Icons

const fs = require('fs');
const path = require('path');

// 转换标签
const TRANSFORM_TAG = '// @transformed-icon';

// 检查文件是否已经转换过
function isAlreadyTransformed(content) {
  return content.includes(TRANSFORM_TAG);
}

// 转换函数（精简版）
function transformIconComponent(sourceCode) {
  // 如果已经转换过，直接返回
  if (isAlreadyTransformed(sourceCode)) {
    return null;
  }

  // 提取组件名称
  const componentNameMatch = sourceCode.match(/const\s+(\w+)\s*=/);
  const componentName = componentNameMatch ? componentNameMatch[1] : 'IconComponent';

  // 判断颜色是否为白色
  function isWhiteColor(color) {
    const whiteColors = ['white', '#fff', '#FFF', '#FFFFFF', '#ffffff'];
    return whiteColors.includes(color);
  }

  // 规范化颜色值
  function normalizeColor(color) {
    if (color === '#fff' || color === '#FFF') {
      return '#FFFFFF';
    }
    if (color === '#ffffff') {
      return '#FFFFFF';
    }
    if (color === 'white') {
      return '#FFFFFF';
    }
    return color;
  }

  // 替换fill属性
  function replaceFillAttributes(code) {
    return code.replace(/fill="([^"]+)"/g, (match, color) => {
      const isWhite = isWhiteColor(color);
      const index = isWhite ? 1 : 0;
      const normalizedColor = normalizeColor(color);
      return `fill={getIconColor(color, ${index}, '${normalizedColor}')}`;
    });
  }

  // 更新组件参数
  function updateComponentParams(code) {
    // 替换组件参数
    const paramPattern = /const\s+(\w+)\s*=\s*\(([^)]*)\)\s*=>/;
    return code.replace(paramPattern, `const $1 = ({ size = 16, width, height, color, ...rest }: IIconItemProps) =>`);
  }

  // 移除不需要的属性
  function removeUnwantedAttributes(code) {
    // 移除 xmlns:svg 属性
    let updatedCode = code.replace(/\s*xmlns:svg="http:\/\/www\.w3\.org\/2000\/svg"/g, '');

    // 移除 titleProp={true} 和 descProp={true} 属性
    updatedCode = updatedCode.replace(/\s*titleProp=\{true\}/g, '');
    updatedCode = updatedCode.replace(/\s*descProp=\{true\}/g, '');

    // 也处理可能的其他格式
    updatedCode = updatedCode.replace(/\s*titleProp={true}/g, '');
    updatedCode = updatedCode.replace(/\s*descProp={true}/g, '');
    updatedCode = updatedCode.replace(/\s*titleProp\s*=\s*\{true\}/g, '');
    updatedCode = updatedCode.replace(/\s*descProp\s*=\s*\{true\}/g, '');

    return updatedCode;
  }

  // 更新SVG属性
  function updateSvgAttributes(code) {
    // 先移除不需要的属性
    let updatedCode = removeUnwantedAttributes(code);

    // 检查是否已经有 width 和 height 属性
    const hasWidth = /width=\{[^}]*\}/.test(updatedCode);
    const hasHeight = /height=\{[^}]*\}/.test(updatedCode);
    const hasSizeBasedWidth = /width=\{[^}]*(?:width|size)[^}]*\}/.test(updatedCode);
    const hasSizeBasedHeight = /height=\{[^}]*(?:height|size)[^}]*\}/.test(updatedCode);

    // 如果没有基于 size 的 width/height 属性，需要添加或替换
    if (!hasSizeBasedWidth || !hasSizeBasedHeight) {
      // 查找 SVG 标签的开始位置
      const svgTagMatch = updatedCode.match(/(<Svg[^>]*?)>/s);
      if (svgTagMatch) {
        let svgContent = svgTagMatch[1];

        // 移除现有的 width 和 height 属性（如果存在）
        svgContent = svgContent.replace(/\s+width=\{[^}]*\}/g, '');
        svgContent = svgContent.replace(/\s+height=\{[^}]*\}/g, '');

        // 查找合适的位置插入 width 和 height
        // 如果有 viewBox，在它后面插入；否则在标签名后插入
        if (svgContent.includes('viewBox')) {
          svgContent = svgContent.replace(
            /(viewBox="[^"]*")/,
            '$1\n    width={width || size}\n    height={height || size}',
          );
        } else {
          // 在 <Svg 后面插入
          svgContent = svgContent.replace(/(<Svg)/, '$1\n    width={width || size}\n    height={height || size}');
        }

        updatedCode = updatedCode.replace(svgTagMatch[1], svgContent);
      }
    }

    // 替换 props 为 rest
    updatedCode = updatedCode.replace(/\{\.\.\.props\}/, '{...rest}');

    return updatedCode;
  }

  // 添加import语句
  function addImportStatement(code) {
    // 查找第一个import语句的位置
    const importMatch = code.match(/^(import[^;]+;)/m);
    if (importMatch) {
      const firstImport = importMatch[0];
      const newImport = `import { getIconColor, IIconItemProps } from './utils';`;
      return code.replace(firstImport, `${firstImport}\n${newImport}`);
    }
    // 如果没有找到import语句，在文件开头添加
    return `import { getIconColor, IIconItemProps } from './utils';\n${code}`;
  }

  // 处理源代码
  let transformedCode = sourceCode;

  // 添加转换标签（在文件开头）
  transformedCode = `${TRANSFORM_TAG}\n${transformedCode}`;

  // 添加import语句
  transformedCode = addImportStatement(transformedCode);

  // 替换fill属性
  transformedCode = replaceFillAttributes(transformedCode);

  // 更新组件参数
  transformedCode = updateComponentParams(transformedCode);

  // 更新SVG属性
  transformedCode = updateSvgAttributes(transformedCode);

  return transformedCode;
}

// 获取目录下所有TSX文件（排除index.tsx）
function getTsxFiles(dirPath) {
  const files = [];

  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isFile() && item.endsWith('.tsx') && item !== 'index.tsx') {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }

  return files;
}

// 检查index.tsx是否存在并包含必要的导出
function checkIndexFile(dirPath) {
  const indexPath = path.join(dirPath, 'utils.ts');

  if (!fs.existsSync(indexPath)) {
    console.warn(`⚠️  Warning: index.tsx not found in ${dirPath}`);
    console.warn('   Please make sure index.tsx exists and exports getIconColor and IIconItemProps');
    return false;
  }

  try {
    const indexContent = fs.readFileSync(indexPath, 'utf8');
    const hasGetIconColor = indexContent.includes('getIconColor');
    const hasIIconItemProps = indexContent.includes('IIconItemProps');

    if (!hasGetIconColor || !hasIIconItemProps) {
      console.warn(`⚠️  Warning: utils.ts may not export required functions/types`);
      console.warn('   Please make sure it exports: getIconColor, IIconItemProps');
      return false;
    }

    return true;
  } catch (error) {
    console.error(`❌ Error reading utils.ts:`, error.message);
    return false;
  }
}

// 批量转换文件
function batchTransformFiles(dirPath) {
  console.log(`🚀 Starting batch transformation in: ${dirPath}`);

  // 检查目录是否存在
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Directory does not exist: ${dirPath}`);
    return;
  }

  // 检查index.tsx文件
  const indexValid = checkIndexFile(dirPath);
  if (!indexValid) {
    console.log('❌ Stopping transformation due to missing or invalid index.tsx');
    return;
  }

  const tsxFiles = getTsxFiles(dirPath);

  if (tsxFiles.length === 0) {
    console.log('ℹ️  No TSX files found (excluding index.tsx)');
    return;
  }

  console.log(`📁 Found ${tsxFiles.length} TSX files:`);

  let successCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const filePath of tsxFiles) {
    try {
      // 读取原文件
      const originalContent = fs.readFileSync(filePath, 'utf8');

      // 检查是否已经转换过
      if (isAlreadyTransformed(originalContent)) {
        console.log(`⏭️  Skipped (already transformed): ${path.basename(filePath)}`);
        skippedCount++;
        continue;
      }

      // 转换内容
      const transformedContent = transformIconComponent(originalContent);

      if (transformedContent === null) {
        console.log(`⏭️  Skipped: ${path.basename(filePath)}`);
        skippedCount++;
        continue;
      }

      // 写入转换后的内容
      fs.writeFileSync(filePath, transformedContent, 'utf8');

      console.log(`✅ Successfully transformed: ${path.basename(filePath)}`);
      successCount++;
    } catch (error) {
      console.error(`❌ Error transforming ${path.basename(filePath)}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Transformation Summary:');
  console.log(`   ✅ Success: ${successCount} files`);
  console.log(`   ⏭️  Skipped: ${skippedCount} files`);
  console.log(`   ❌ Error: ${errorCount} files`);
  console.log(`   📝 Total: ${tsxFiles.length} files`);

  if (successCount > 0) {
    console.log('\n🎉 Batch transformation completed!');
    console.log(`💡 Tip: Files with "${TRANSFORM_TAG}" tag will be skipped in future runs`);
  }
}

// 清除转换标签的函数（用于重置）
function clearTransformTags(dirPath) {
  console.log(`🧹 Clearing transform tags in: ${dirPath}`);

  const tsxFiles = getTsxFiles(dirPath);
  let clearedCount = 0;

  for (const filePath of tsxFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      if (isAlreadyTransformed(content)) {
        const cleanedContent = content.replace(`${TRANSFORM_TAG}\n`, '');
        fs.writeFileSync(filePath, cleanedContent, 'utf8');
        console.log(`🧹 Cleared tag: ${path.basename(filePath)}`);
        clearedCount++;
      }
    } catch (error) {
      console.error(`❌ Error clearing tag from ${path.basename(filePath)}:`, error.message);
    }
  }

  console.log(`\n✅ Cleared tags from ${clearedCount} files`);
}

// 主函数
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node transform-icons.js <directory-path> [--clear-tags]');
    console.log('');
    console.log('Examples:');
    console.log('  node transform-icons.js ./src/components/icons');
    console.log('  node transform-icons.js ./src/components/icons --clear-tags');
    console.log('');
    console.log('Options:');
    console.log('  --clear-tags    Remove transform tags from all files (for reset)');
    process.exit(1);
  }

  const targetDir = args[0];
  const shouldClearTags = args.includes('--clear-tags');
  const absolutePath = path.resolve(targetDir);

  console.log(`🎯 Target directory: ${absolutePath}`);

  if (shouldClearTags) {
    clearTransformTags(absolutePath);
  } else {
    batchTransformFiles(absolutePath);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  transformIconComponent,
  batchTransformFiles,
  getTsxFiles,
  clearTransformTags,
  isAlreadyTransformed,
};
