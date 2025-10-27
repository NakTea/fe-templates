# IconFont 图标组件

## 组件描述

基于 React Native SVG 的图标组件，支持内置图标和远程 SVG 图标的加载展示。提供了丰富的图标集合，包括系统图标、媒体图标、源图标、天气图标等多个分类，同时支持自定义尺寸和颜色。

### 功能特性

- 支持丰富的内置图标集合
- 支持远程 SVG 图标加载
- 支持自定义尺寸和颜色
- 提供多分类图标（系统、媒体、源、天气等）
- 支持单独导入特定图标组件

## 组件API

### Props

| 参数   | 说明                   | 类型     | 默认值 |
| ------ | ---------------------- | -------- | ------ |
| name   | 内置图标名称           | `string` | -      |
| url    | 远程SVG图标地址        | `string` | -      |
| size   | 图标大小               | `number` | 16     |
| width  | 图标宽度（优先于size） | `string` | -      |
| height | 图标高度（优先于size） | `string` | -      |
| color  | 图标颜色               | `string` | -      |

### 内置图标类型

#### 系统类图标

- `systemAlertBellFill` - 提醒铃铛
- `systemFavoriteLine` - 收藏线性
- `systemMoreLine` - 更多选项
- `systemPauseFill` - 暂停填充
- `systemPlayCircle` - 播放圆形
- `systemPlayFill` - 播放填充
- `systemStarFill` - 星星填充
- `systemWatchFill` - 观看填充
- `systemLocalFill` - 当前位置

#### 信息提示类图标

- `iconInformationSMethod` - 信息方法
- `iconInformationSTips` - 信息提示
- `iconWarningSDanger` - 危险警告
- `iconWarningSNotice` - 注意警告
- `iconWarningSWarning` - 一般警告

#### 媒体平台图标

- `mediaDouban` - 豆瓣
- `mediaDoubanOval` - 豆瓣椭圆
- `mediaIqiyi` - 爱奇艺
- `mediaMetacritic` - Metacritic
- `mediaYouku` - 优酷
- `imdbLogo2016` - IMDB

#### 音乐源图标

- `sourceAppleFill` - Apple Music
- `sourceMusicFill` - 音乐填充
- `sourceSpotifyFill` - Spotify
- `sourceYoutubeFill` - YouTube

#### 其他图标

- `downloadLineIcon` - 下载线性
- `iconFilmFillIcon` - 电影填充
- `iconUserFill` - 用户填充
- `weatherCloudy` - 多云天气
- `weatherRain` - 雨天天气
- `weatherThunder` - 雷电天气
- `iconTshirtFill` - Tshirt图标，穿衣提示
- `iconHumidityFill` - 水滴图标
- `iconUvFill` - 太阳图标
- `iconWindFill` - 刮风图标
- `weatherLightingRed` - 雷电红色预警
- `weatherTyphoonRed` - 台风红色预警

## 使用示例

### 基础用法

```typescript
import { IconFont } from './IconFont';

// 使用内置图标
<IconFont name="systemPlayFill" size={24} color="#3E996B" />

// 使用远程SVG
<IconUri
  url="https://example.com/icon.svg"
  size={32}
  color="#000000"
/>
```

### 单独导入图标组件

```typescript
import { SystemPlayFill, MediaDouban, SourceSpotifyFill } from './IconFont';

// 直接使用具体图标组件
<SystemPlayFill />
<MediaDouban />
<SourceSpotifyFill />
```

### 状态提示图标

```typescript
// 危险状态
<IconFont name="iconWarningSDanger" size={16} />

// 警告状态
<IconFont name="iconWarningSWarning" size={16} />

// 提示状态
<IconFont name="iconInformationSTips" size={16} />

// 通知状态
<IconFont name="iconWarningSNotice" size={16} />
```

### 媒体平台图标

```typescript
// 豆瓣图标
<IconFont name="mediaDouban" size={20} />

// IMDB图标
<IconFont name="imdbLogo2016" size={20} />

// 爱奇艺图标
<IconFont name="mediaIqiyi" size={20} />
```

### 音乐源图标

```typescript
// Spotify图标
<IconFont name="sourceSpotifyFill" size={24} color="#1DB954" />

// Apple Music图标
<IconFont name="sourceAppleFill" size={24} />

// YouTube图标
<IconFont name="sourceYoutubeFill" size={24} color="#FF0000" />
```

## 注意事项

1. **远程SVG使用**
   - url 参数通过 IconUri 组件处理
   - 需要确保远程SVG资源可访问
   - 建议设置合适的尺寸

2. **尺寸设置**
   - width/height 优先于 size
   - size 为正方形快捷设置
   - 推荐使用 size 保持图标比例

3. **颜色使用**
   - color 属性可统一设置颜色
   - 部分图标可能有固定颜色样式
   - 建议根据图标类型选择合适颜色

4. **性能考虑**
   - 支持单独导入减少包体积
   - 相同图标实例会自动复用
   - 远程SVG会产生网络请求

5. **导入方式**
   - 可以使用 IconFont 组件统一调用
   - 也可以直接导入具体图标组件
   - 建议根据使用场景选择合适方式

## 依赖说明

- react-native-svg: SVG 渲染基础库
- react-native-svg-uri: 远程 SVG 加载支持

适用于需要使用图标的各种场景，特别适合多媒体应用、音乐播放器、天气应用等需要丰富图标支持的项目。
