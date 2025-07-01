const os = require('os');
const path = require('path');
const fs = require('fs');
const child_process = require('child_process');
const CryptoJS = require('crypto-js');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
// 解析参数为对象
const params = parseArgs(args);

const startTime = +new Date();

// console.log(args);
const options = {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit',
  encoding: 'utf-8',
};

if (os.type() === 'Windows_NT') {
  options.shell = true;
}

const comName = params?.name;
const version = params?.v || '';
if (!comName) {
  console.error('请输入组件名');
} else {
  console.log('start...');
  const tempContent = String(fs.readFileSync('./src/template.txt')).replaceAll('{packageName}', comName);
  const md5 = CryptoJS.MD5(tempContent).toString();
  console.log('md5', md5);
  fs.writeFileSync(`./src/${comName}.tsx`, `// md5: ${md5} ; version: ${version} \n${tempContent}`);
  execute(
    `npx react-native bundle --platform android --dev false --entry-file ./src/${comName}.tsx --bundle-output ./bundles/${comName}.android.bundle --config business.config.js --assets-dest ./assets`,
  );
}

// let result;

// result = child_process.spawnSync(
//   'npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output ./bundles/index.android.bundle --config business.config.js --assets-dest ./assets',
//   args,
//   options,
// );

// process.exitCode = result.status;

function execute(cmd) {
  child_process.exec(cmd, function (error, stdout, stderr) {
    if (error) {
      console.error(error);
    } else {
      const endTime = +new Date();
      console.log('Done in ' + Math.round((endTime - startTime) / 10) / 100 + 's');
    }
  });
}

function parseArgs(args) {
  const result = {};
  let currentKey = null;

  args.forEach(arg => {
    if (arg.startsWith('--')) {
      currentKey = arg.slice(2);
      result[currentKey] = true;
    } else if (currentKey) {
      result[currentKey] = arg;
      currentKey = null;
    }
  });

  return result;
}
