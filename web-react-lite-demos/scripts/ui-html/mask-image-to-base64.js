// # 处理当前目录
// node mask-image-to-base64.js
// # 处理指定目录
// node mask-image-to-base64.js ./public

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// 支持的图片扩展名及其对应的MIME类型
const MIME_TYPES = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

// 递归扫描文件夹获取所有HTML文件
async function scanHtmlFiles(dir) {
  const files = await readdir(dir);
  const htmlFiles = [];

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      htmlFiles.push(...await scanHtmlFiles(filePath));
    } else if (path.extname(filePath).toLowerCase() === '.html') {
      htmlFiles.push(filePath);
    }
  }

  return htmlFiles;
}

// 将图片文件转换为Base64 Data URL
async function imageToBase64(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[ext];

  if (!mimeType) {
    throw new Error(`不支持的图片格式: ${ext}`);
  }

  try {
    const data = await readFile(filePath);
    return `data:${mimeType};base64,${data.toString('base64')}`;
  } catch (err) {
    throw new Error(`读取图片失败: ${filePath} - ${err.message}`);
  }
}

// 处理HTML文件中的mask-image样式
async function processHtmlFile(htmlPath) {
  let html = await readFile(htmlPath, 'utf8');
  let modified = false;

  // 正则表达式匹配mask-image属性
  const maskImageRegex = /mask-image\s*:\s*url\(['"]?([^'")]+)['"]?\)/gi;

  // 查找所有匹配项
  const matches = [];
  let match;
  while ((match = maskImageRegex.exec(html)) !== null) {
    matches.push({
      fullMatch: match[0],
      imagePath: match[1],
      index: match.index,
    });
  }

  // 倒序处理（避免替换后索引变化）
  for (let i = matches.length - 1; i >= 0; i--) {
    const { fullMatch, imagePath, index } = matches[i];

    try {
      // 解析图片绝对路径
      const imageFullPath = path.resolve(
        path.dirname(htmlPath),
        decodeURIComponent(imagePath),
      );

      // 转换为Base64
      const base64 = await imageToBase64(imageFullPath);

      // 创建替换内容
      const replacement = `mask-image: url('${base64}')`;

      // 替换HTML内容
      html = html.substring(0, index) +
             replacement +
             html.substring(index + fullMatch.length);

      modified = true;
      console.log(`已替换: ${imagePath} -> Base64`);
    } catch (err) {
      console.error(`处理失败: ${imagePath} - ${err.message}`);
    }
  }

  // 如果有修改，写回文件
  if (modified) {
    await writeFile(htmlPath, html, 'utf8');
    console.log(`已更新文件: ${htmlPath}`);
  } else {
    console.log(`无需更新: ${htmlPath}`);
  }
}

// 主函数
async function main(targetDir) {
  try {
    console.log(`开始扫描目录: ${targetDir}`);
    const htmlFiles = await scanHtmlFiles(targetDir);
    console.log(`找到 ${htmlFiles.length} 个HTML文件`);

    for (const file of htmlFiles) {
      console.log(`\n处理文件: ${file}`);
      await processHtmlFile(file);
    }

    console.log('\n处理完成！');
  } catch (err) {
    console.error('处理过程中出错:', err);
  }
}

// 启动脚本
const targetDirectory = process.argv[2] || './';
main(path.resolve(targetDirectory));
