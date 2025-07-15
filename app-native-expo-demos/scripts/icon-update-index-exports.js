// node ./scripts/update-index-exports.js ./components/Icons --preview ./app/icon.tsx
const fs = require('fs');
const path = require('path');

// 导出标记
const EXPORT_START_MARKER = '// 导出所有图标组件开始';
const EXPORT_END_MARKER = '// 导出所有图标组件完毕';

// 从文件内容中提取实际的组件名
function extractComponentNameFromContent(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // 查找 const ComponentName = 或 export default ComponentName 模式
    const constMatch = content.match(/const\s+([A-Z][a-zA-Z0-9]*)\s*=/);
    if (constMatch) {
      return constMatch[1];
    }

    const exportMatch = content.match(/export\s+default\s+([A-Z][a-zA-Z0-9]*)/);
    if (exportMatch) {
      return exportMatch[1];
    }

    // 如果都找不到，从文件名推断
    return getComponentNameFromFile(path.basename(filePath));
  } catch (error) {
    console.warn(`⚠️  Warning: Could not read ${filePath}, using filename for component name`);
    return getComponentNameFromFile(path.basename(filePath));
  }
}

// 从文件名提取组件名
function getComponentNameFromFile(fileName) {
  // 移除.tsx扩展名
  const nameWithoutExt = fileName.replace('.tsx', '');

  // 如果文件名已经是PascalCase（如IconWarningJingao），直接返回
  if (/^[A-Z][a-zA-Z0-9]*$/.test(nameWithoutExt)) {
    return nameWithoutExt;
  }

  // 如果是kebab-case或snake_case，转换为PascalCase
  return nameWithoutExt
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// 获取所有图标组件文件
function getIconFiles(dirPath) {
  const files = [];

  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      // 只处理tsx文件，排除index.tsx
      if (stat.isFile() && item.endsWith('.tsx') && item !== 'index.tsx') {
        const componentName = extractComponentNameFromContent(fullPath);
        const fileNameWithoutExt = item.replace('.tsx', '');

        files.push({
          fileName: item,
          filePath: fullPath,
          componentName: componentName,
          importPath: `./${fileNameWithoutExt}`,
        });
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dirPath}:`, error.message);
  }

  // 按组件名排序
  return files.sort((a, b) => a.componentName.localeCompare(b.componentName));
}

// 生成导出语句
function generateExportStatements(iconFiles) {
  return iconFiles.map((file) => `export { default as ${file.componentName} } from '${file.importPath}';`).join('\n');
}

// 生成图标预览文件内容
function generatePreviewContent(iconFiles, iconsDirPath, previewFilePath) {
  // 计算相对导入路径
  const previewDir = path.dirname(previewFilePath);
  const relativePath = path.relative(previewDir, iconsDirPath);
  const importPath = relativePath.replace(/\\/g, '/'); // Windows 路径兼容

  // 生成导入语句
  const importNames = iconFiles.map((file) => file.componentName);
  const importStatements = `import IconUri, {\n  ${importNames.join(',\n  ')}\n} from '${importPath}';`;

  // 生成预览组件的JSX
  const iconPreviews = iconFiles
    .map((file) => {
      const { componentName } = file;

      // 根据图标名称决定默认大小
      let defaultSize = 60;
      if (componentName.toLowerCase().includes('warning') || componentName.toLowerCase().includes('icon')) {
        defaultSize = 24;
      } else if (
        componentName.toLowerCase().includes('extroversion') ||
        componentName.toLowerCase().includes('neuroticism')
      ) {
        defaultSize = 100;
      }

      return `        <Text style={styles.iconLabel}>${componentName}:</Text>
        <${componentName} size={${defaultSize}} />`;
    })
    .join('\n');

  const previewContent = `import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

${importStatements}

export default function IconPreviewScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Icon Preview' }} />
      <ScrollView style={styles.container}>
      <IconUri
          size={16}
          url="https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/svg/attention.svg"
        />
      ${iconPreviews}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  iconLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});
`;

  return previewContent;
}

// 创建或更新预览文件
function createPreviewFile(iconFiles, iconsDirPath, previewFilePath) {
  try {
    // 确保目录存在
    const previewDir = path.dirname(previewFilePath);
    if (!fs.existsSync(previewDir)) {
      fs.mkdirSync(previewDir, { recursive: true });
      console.log(`📁 Created directory: ${previewDir}`);
    }

    const previewContent = generatePreviewContent(iconFiles, iconsDirPath, previewFilePath);
    fs.writeFileSync(previewFilePath, previewContent, 'utf8');

    console.log(`✅ Created icon preview file: ${previewFilePath}`);
    console.log(`📊 Preview includes ${iconFiles.length} icons`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating preview file:`, error.message);
    return false;
  }
}

// 更新index.tsx文件中的导出区间
function updateIndexFileExports(dirPath, iconFiles) {
  const indexPath = path.join(dirPath, 'index.tsx');

  if (!fs.existsSync(indexPath)) {
    console.error(`❌ index.tsx file does not exist: ${indexPath}`);
    console.log('💡 Please create index.tsx first or run with --create flag');
    return false;
  }

  try {
    const existingContent = fs.readFileSync(indexPath, 'utf8');

    const startIndex = existingContent.indexOf(EXPORT_START_MARKER);
    const endIndex = existingContent.indexOf(EXPORT_END_MARKER);

    if (startIndex === -1 || endIndex === -1) {
      console.error(`❌ Export markers not found in index.tsx`);
      console.log(`💡 Please add these markers to your index.tsx:`);
      console.log(`   ${EXPORT_START_MARKER}`);
      console.log(`   ${EXPORT_END_MARKER}`);
      return false;
    }

    if (startIndex >= endIndex) {
      console.error(`❌ Invalid marker positions in index.tsx`);
      console.log(`💡 Start marker should come before end marker`);
      return false;
    }

    // 生成新的导出语句
    const exportStatements = generateExportStatements(iconFiles);

    // 构建新内容：保持标记前的内容 + 标记 + 新导出 + 标记后的内容
    const beforeStartMarker = existingContent.substring(0, startIndex + EXPORT_START_MARKER.length);
    const afterEndMarker = existingContent.substring(endIndex);

    const newContent = `${beforeStartMarker}\n${exportStatements}\n${afterEndMarker}`;

    // 写入文件
    fs.writeFileSync(indexPath, newContent, 'utf8');

    return true;
  } catch (error) {
    console.error(`❌ Error updating index.tsx:`, error.message);
    return false;
  }
}

// 创建新的index.tsx文件（如果不存在）
function createIndexFile(dirPath, iconFiles) {
  const indexPath = path.join(dirPath, 'index.tsx');

  const baseContent = `export interface IIconItemProps {
  size?: number;
  color?: string | string[] | undefined;
  width?: number;
  height?: number;
}

export const getIconColor = (color: string | string[] | undefined, index: number, defaultColor: string) => {
  if (!color) {
    return defaultColor;
  } else if (typeof color === 'string' && index === 0) {
    return color;
  } else if (Array.isArray(color)) {
    return color[index] || defaultColor;
  } else {
    return defaultColor;
  }
};

${EXPORT_START_MARKER}
${generateExportStatements(iconFiles)}
${EXPORT_END_MARKER}
`;

  try {
    fs.writeFileSync(indexPath, baseContent, 'utf8');
    console.log(`✅ Created new index.tsx file: ${indexPath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error creating index.tsx:`, error.message);
    return false;
  }
}

// 显示当前导出区间的内容
function showCurrentExports(dirPath) {
  const indexPath = path.join(dirPath, 'index.tsx');

  if (!fs.existsSync(indexPath)) {
    console.log('ℹ️  index.tsx does not exist');
    return;
  }

  try {
    const content = fs.readFileSync(indexPath, 'utf8');
    const startIndex = content.indexOf(EXPORT_START_MARKER);
    const endIndex = content.indexOf(EXPORT_END_MARKER);

    if (startIndex === -1 || endIndex === -1) {
      console.log('ℹ️  Export markers not found in index.tsx');
      return;
    }

    const currentExports = content.substring(startIndex + EXPORT_START_MARKER.length, endIndex).trim();

    if (currentExports) {
      console.log('📋 Current exports in index.tsx:');
      console.log(currentExports);
    } else {
      console.log('ℹ️  No exports found between markers');
    }
  } catch (error) {
    console.error(`❌ Error reading index.tsx:`, error.message);
  }
}

// 主要的更新函数
function updateIndexExports(dirPath, options = {}) {
  console.log(`🚀 Updating exports in index.tsx: ${dirPath}`);

  // 检查目录是否存在
  if (!fs.existsSync(dirPath)) {
    console.error(`❌ Directory does not exist: ${dirPath}`);
    return false;
  }

  // 获取所有图标文件
  const iconFiles = getIconFiles(dirPath);

  if (iconFiles.length === 0) {
    console.log('ℹ️  No icon TSX files found');
    return false;
  }

  console.log(`📁 Found ${iconFiles.length} icon files:`);
  iconFiles.forEach((file) => {
    console.log(`   - ${file.fileName} → ${file.componentName}`);
  });

  // 显示当前导出（如果存在）
  if (options.showCurrent) {
    console.log('\n📋 Before update:');
    showCurrentExports(dirPath);
  }

  const indexPath = path.join(dirPath, 'index.tsx');
  let success = false;

  if (fs.existsSync(indexPath)) {
    // 更新现有文件
    success = updateIndexFileExports(dirPath, iconFiles);
  } else if (options.create) {
    // 创建新文件
    success = createIndexFile(dirPath, iconFiles);
  } else {
    console.error(`❌ index.tsx does not exist: ${indexPath}`);
    console.log('💡 Use --create flag to create a new index.tsx file');
    return false;
  }

  // 生成预览文件（如果指定了预览路径）
  if (success && options.previewPath) {
    console.log(`\n🎨 Creating icon preview file...`);
    const previewSuccess = createPreviewFile(iconFiles, dirPath, options.previewPath);
    if (previewSuccess) {
      console.log(`📱 You can now view all icons at: ${options.previewPath}`);
    }
  }

  if (success) {
    console.log(`\n✅ Successfully updated index.tsx with ${iconFiles.length} exports`);

    // 显示更新后的导出预览
    console.log('\n📋 Updated exports:');
    iconFiles.slice(0, 5).forEach((file) => {
      console.log(`   export { default as ${file.componentName} } from '${file.importPath}';`);
    });

    if (iconFiles.length > 5) {
      console.log(`   ... and ${iconFiles.length - 5} more exports`);
    }

    console.log(`\n📄 File location: ${indexPath}`);
  }

  return success;
}

// 主函数
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node update-index-exports.js <directory-path> [options]');
    console.log('');
    console.log('Examples:');
    console.log('  node update-index-exports.js ./src/components/icons');
    console.log('  node update-index-exports.js ./src/components/icons --create');
    console.log('  node update-index-exports.js ./src/components/icons --preview ./app/icon.tsx');
    console.log('  node update-index-exports.js ./components/Icons --preview ./app/icon.tsx --create');
    console.log('');
    console.log('Options:');
    console.log('  --create              Create index.tsx if it does not exist');
    console.log('  --show-current        Show current exports before updating');
    console.log('  --preview <path>      Create icon preview file at specified path');
    console.log('');
    console.log('Note: This script only updates content between these markers:');
    console.log(`  ${EXPORT_START_MARKER}`);
    console.log(`  ${EXPORT_END_MARKER}`);
    process.exit(1);
  }

  const targetDir = args[0];

  // 解析选项
  const options = {
    create: args.includes('--create'),
    showCurrent: args.includes('--show-current'),
    previewPath: null,
  };

  // 获取预览路径
  const previewIndex = args.indexOf('--preview');
  if (previewIndex !== -1 && previewIndex + 1 < args.length) {
    options.previewPath = args[previewIndex + 1];
  }

  const absolutePath = path.resolve(targetDir);
  console.log(`🎯 Target directory: ${absolutePath}`);

  if (options.previewPath) {
    const absolutePreviewPath = path.resolve(options.previewPath);
    console.log(`🎨 Preview file: ${absolutePreviewPath}`);
    options.previewPath = absolutePreviewPath;
  }

  const success = updateIndexExports(absolutePath, options);

  if (success) {
    console.log('\n🎉 Done!');
    if (options.previewPath) {
      console.log(`💡 Tip: Navigate to the preview screen to see all your icons in action!`);
    }
  } else {
    console.log('\n❌ Update failed!');
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}

module.exports = {
  updateIndexExports,
  getIconFiles,
  showCurrentExports,
  extractComponentNameFromContent,
  createPreviewFile,
  generatePreviewContent,
};
