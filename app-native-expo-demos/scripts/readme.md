## ICON转换

1. svg 转成 svg 组件
   node ./scripts/icon-svg-rn.js ./assets/icons ./components/Icons
2. svg 转成 可用的tsx 组件
   node ./scripts/icon-rn-props.js ./components/Icons
3. 把 icons 写入 Icon/index.tsx， 并添加预览页面
   node ./scripts/icon-update-index-exports.js ./components/Icons --preview ./app/icon.tsx
