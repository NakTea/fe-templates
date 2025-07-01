const fs = require('fs');
const path = require('path');

/**
 * @typedef {Object} inputConfig
 * @property {string[]} sourcePaths - 源文件夹数组
 * @property {string[]} targetPaths - 目标文件夹数组
 */


/** @type {inputConfig} */
const inputConfig = {
  sourcePaths: [
    path.resolve(__dirname, '../components'),
    path.resolve(__dirname, '../design'),
  ],
  targetPaths: [
    path.resolve(__dirname, '../../development-rn-expo-demo/app/components'),
    path.resolve(__dirname, '../../development-rn-expo-demo/app/design'),
  ],
};

/**
 * 递归替换 sourcePath → targetPath 中的内容
 * @param {string} sourcePath
 * @param {string} targetPath
 */
function replace(sourcePath, targetPath) {
  console.log(`${sourcePath}`);
  const entries = fs.readdirSync(sourcePath, { withFileTypes: true });

  for (const entry of entries) {
    const sourceFilePath = path.join(sourcePath, entry.name);
    const targetFilePath = path.join(targetPath, entry.name);

    if (entry.isDirectory()) {
      fs.mkdirSync(targetFilePath, { recursive: true });
      replace(sourceFilePath, targetFilePath);
    } else if (entry.isFile()) {
      const sourceContent = fs.readFileSync(sourceFilePath, 'utf-8');
      fs.mkdirSync(path.dirname(targetFilePath), { recursive: true });
      fs.writeFileSync(targetFilePath, sourceContent, 'utf-8');
    }
  }
}

// 遍历 source 和 target 对
for (let i = 0; i < inputConfig.sourcePaths.length; i++) {
  const source = inputConfig.sourcePaths[i];
  const target = inputConfig.targetPaths[i];
  console.log(`${source} 替换 ${target}`);
  replace(source, target);
}
