// node ./scripts/icon-update-index-exports.js ./components/Icons --preview ./app/icon.tsx
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

// 生成IconFont组件的switch cases
function generateIconFontSwitchCases(iconFiles) {
  return iconFiles
    .map((file) => {
      const { componentName } = file;
      // 将组件名转换为小写的case名称
      const caseName = componentName.charAt(0).toLowerCase() + componentName.slice(1);
      return `    case '${caseName}':\n      return <${componentName} key="${caseName}" {...rest} />;`;
    })
    .join('\n');
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

      return `          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>${componentName}:</Text>
            <${componentName} size={${defaultSize}} />
          </View>`;
    })
    .join('\n');

  const previewContent = `import { Stack } from 'expo-router';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

${importStatements}

export default function IconPreviewScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Icon Preview' }} />
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconUri:</Text>
            <IconUri
              size={24}
              url="https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/svg/attention.svg"
            />
          </View>
${iconPreviews}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  iconItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
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

// 更新index.tsx文件中的导出区间和IconFont组件
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

    // 生成IconFont组件的switch cases
    const switchCases = generateIconFontSwitchCases(iconFiles);

    // 构建新内容：保持标记前的内容 + 标记 + 新导出 + 标记后的内容
    const beforeStartMarker = existingContent.substring(0, startIndex + EXPORT_START_MARKER.length);
    const afterEndMarker = existingContent.substring(endIndex);

    // 检查是否已经存在IconFont组件，如果存在则替换，否则添加
    const iconFontRegex = /export const IconFont[\s\S]*?return null;\s*};/;
    let newAfterEndMarker = afterEndMarker;

    const iconFontComponent = `
export const IconFont = ({ size = 16, width, height, color, name, ...rest }: IIconProps) => {
  switch (name) {
${switchCases}
  }
  return null;
};`;

    if (iconFontRegex.test(afterEndMarker)) {
      // 替换现有的IconFont组件
      newAfterEndMarker = afterEndMarker.replace(iconFontRegex, iconFontComponent.trim());
    } else {
      // 添加新的IconFont组件
      newAfterEndMarker = afterEndMarker + iconFontComponent;
    }

    const newContent = `${beforeStartMarker}\n${exportStatements}\n${newAfterEndMarker}`;

    // 写入文件
    fs.writeFileSync(indexPath, newContent, 'utf8');

    return true;
  } catch (error) {
    console.error(`❌ Error updating index.tsx:`, error.message);
    return false;
  }
}

// 生成所有图标组件的导入语句
function generateImportStatements(iconFiles) {
  const imports = iconFiles
    .map((file) => {
      return `import ${file.componentName} from '${file.importPath}';`;
    })
    .join('\n');

  return imports;
}

// 创建新的index.tsx文件（如果不存在）
function createIndexFile(dirPath, iconFiles) {
  const indexPath = path.join(dirPath, 'index.tsx');

  const importStatements = generateImportStatements(iconFiles);
  const switchCases = generateIconFontSwitchCases(iconFiles);

  const baseContent = `import React from 'react';

${importStatements}

export interface IIconItemProps {
  size?: number;
  color?: string | string[] | undefined;
  width?: number;
  height?: number;
}

export interface IIconProps {
  size?: number;
  width?: number;
  height?: number;
  color?: string | string[] | undefined;
  name: string;
  [key: string]: any;
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

export const IconFont = ({ size = 16, width, height, color, name, ...rest }: IIconProps) => {
  switch (name) {
${switchCases}
  }
  return null;
};
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

// 更新index.tsx文件中的导出区间和IconFont组件
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

    // 生成新的导入语句
    const importStatements = generateImportStatements(iconFiles);

    // 生成新的导出语句
    const exportStatements = generateExportStatements(iconFiles);

    // 生成IconFont组件的switch cases
    const switchCases = generateIconFontSwitchCases(iconFiles);

    // 查找并替换导入语句区域
    let newContent = existingContent;

    // 查找现有的导入语句区域（从文件开始到第一个export或interface）
    const importEndRegex = /(export\s+interface|export\s+const|export\s+{)/;
    const importEndMatch = existingContent.match(importEndRegex);

    if (importEndMatch) {
      const importEndIndex = importEndMatch.index;
      const beforeImports = existingContent.substring(0, 0);
      const afterImports = existingContent.substring(importEndIndex);

      // 保留React导入，添加新的图标导入
      const reactImport = "import React from 'react';\nimport { SvgUri } from 'react-native-svg';\n\n";
      newContent = `${reactImport}${importStatements}\n\n${afterImports}`;
    } else {
      // 如果找不到合适的位置，就在文件开头添加
      const reactImport = existingContent.includes("import React from 'react';") ? '' : "import React from 'react';\n";
      newContent = `${reactImport}${importStatements}\n\n${existingContent}`;
    }

    // 更新导出区域
    const newStartIndex = newContent.indexOf(EXPORT_START_MARKER);
    const newEndIndex = newContent.indexOf(EXPORT_END_MARKER);

    if (newStartIndex !== -1 && newEndIndex !== -1) {
      const beforeStartMarker = newContent.substring(0, newStartIndex + EXPORT_START_MARKER.length);
      const afterEndMarker = newContent.substring(newEndIndex);

      // 检查是否已经存在IconFont组件，如果存在则替换，否则添加
      const iconFontRegex = /export const IconFont[\s\S]*?return null;\s*};/;
      let newAfterEndMarker = afterEndMarker;

      const iconFontComponent = `
export const IconFont = ({ size = 16, width, height, color, name, ...rest }: IIconProps) => {
  switch (name) {
${switchCases}
  }
  return null;
};`;

      if (iconFontRegex.test(afterEndMarker)) {
        // 替换现有的IconFont组件
        newAfterEndMarker = afterEndMarker.replace(iconFontRegex, iconFontComponent.trim());
      } else {
        // 添加新的IconFont组件
        newAfterEndMarker = afterEndMarker + iconFontComponent;
      }

      newContent = `${beforeStartMarker}\n${exportStatements}\n${newAfterEndMarker}`;
    }

    // 写入文件
    fs.writeFileSync(indexPath, newContent, 'utf8');

    return true;
  } catch (error) {
    console.error(`❌ Error updating index.tsx:`, error.message);
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
    console.log('Usage: node icon-update-index-exports.js <directory-path> [options]');
    console.log('');
    console.log('Examples:');
    console.log('  node icon-update-index-exports.js ./src/components/icons');
    console.log('  node icon-update-index-exports.js ./src/components/icons --create');
    console.log('  node icon-update-index-exports.js ./src/components/icons --preview ./app/icon.tsx');
    console.log('  node icon-update-index-exports.js ./components/Icons --preview ./app/icon.tsx --create');
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
  generateIconFontSwitchCases,
};
