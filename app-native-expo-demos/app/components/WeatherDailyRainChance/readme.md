# WeatherDailyRainChance 组件说明文档

## 组件概述

`WeatherDailyRainChance` 是一个天气降水概率展示组件，使用面积图的形式展示一天中不同时间点的降水概率变化趋势。

## 功能特性

- 📊 **面积图展示**：使用平滑曲线和渐变填充展示降水概率趋势
- 🎨 **主题适配**：完全适配 FlexUI 设计系统的 token
- 📱 **响应式设计**：支持自定义宽高，自适应不同屏幕尺寸
- 🔒 **数据安全**：所有数据字段都有安全的条件渲染处理
- ⚡ **性能优化**：使用 react-native-chart-kit 确保流畅的图表渲染

## 视觉规范

- **线条颜色**：`#317AF7` (蓝色)
- **填充渐变**：从 `rgba(255, 255, 0, 0.8)` 到 `rgba(255, 255, 0, 0.5)` (黄色渐变)
- **网格线**：黄色实线 (`#FFFF00`)
- **文字颜色**：使用主题 token (`textTitle`, `textPrimary`)

## Props 接口

### IProps

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}
```

### TData

```typescript
type TData = {
  location?: string; // 地区名称
  description?: string; // 标题内容（如"周四的降水概率：50%"）
  chartData?: {
    x: string[]; // X轴时间标签数组
    y: number[]; // Y轴降水概率数据数组
  };
  message?: string; // 底部说明文字
};
```

## Mock Data JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "WeatherDailyRainChance Mock Data Schema",
  "type": "object",
  "properties": {
    "location": {
      "type": "string",
      "description": "地区名称",
      "examples": ["北京市朝阳区", "上海市浦东新区", "广州市天河区"]
    },
    "description": {
      "type": "string",
      "description": "标题内容，通常包含日期和总体降水概率",
      "pattern": "^.+的降水概率：[0-9]+%$",
      "examples": ["周四的降水概率：50%", "今日的降水概率：75%", "明天的降水概率：30%"]
    },
    "chartData": {
      "type": "object",
      "description": "图表数据对象",
      "properties": {
        "x": {
          "type": "array",
          "description": "X轴时间标签数组",
          "items": {
            "type": "string"
          },
          "minItems": 2,
          "maxItems": 12,
          "examples": [
            ["上午12时", "上午6时", "下午12时", "下午6时"],
            ["0时", "3时", "6时", "9时", "12时", "15时", "18时", "21时"]
          ]
        },
        "y": {
          "type": "array",
          "description": "Y轴降水概率数据数组，取值范围0-100",
          "items": {
            "type": "number",
            "minimum": 0,
            "maximum": 100
          },
          "minItems": 2,
          "maxItems": 12,
          "examples": [
            [5, 8, 12, 20],
            [10, 15, 25, 45, 60, 40, 30, 20]
          ]
        }
      },
      "required": ["x", "y"],
      "additionalProperties": false
    },
    "message": {
      "type": "string",
      "description": "底部说明文字",
      "examples": ["每日的降水概率往往比每小时的概率更高", "今日降雨概率较高，建议携带雨具", "降水主要集中在下午时段"]
    }
  },
  "additionalProperties": false
}
```

## Mock Data 示例

### 基础示例

```javascript
const basicMockData = {
  location: '北京市朝阳区',
  description: '周四的降水概率：50%',
  chartData: {
    x: ['上午12时', '上午6时', '下午12时', '下午6时', '下午7时'],
    y: [5, 8, 12, 20, 60],
  },
  message: '每日的降水概率往往比每小时的概率更高',
};
```

### 高降水概率示例

```javascript
const highRainMockData = {
  location: '上海市浦东新区',
  description: '今日的降水概率：85%',
  chartData: {
    x: ['凌晨2时', '上午6时', '上午10时', '下午2时', '下午6时', '晚上10时'],
    y: [20, 35, 60, 85, 75, 45],
  },
  message: '今日降雨概率较高，建议携带雨具出行',
};
```

### 详细时间点示例

```javascript
const detailedMockData = {
  location: '广州市天河区',
  description: '明天的降水概率：65%',
  chartData: {
    x: ['0时', '3时', '6时', '9时', '12时', '15时', '18时', '21时'],
    y: [10, 15, 25, 45, 65, 70, 55, 30],
  },
  message: '降水主要集中在下午至傍晚时段',
};
```

### 最小数据示例

```javascript
const minimalMockData = {
  description: '降水概率：30%',
  chartData: {
    x: ['上午', '下午'],
    y: [15, 30],
  },
};
```

## 使用示例

### 基础使用

```tsx
import WeatherDailyRainChance from './WeatherDailyRainChance';

const App = () => {
  const weatherData = {
    location: '北京市朝阳区',
    description: '周四的降水概率：50%',
    chartData: {
      x: ['上午12时', '上午6时', '下午12时', '下午6时', '下午7时'],
      y: [5, 8, 12, 20, 60],
    },
    message: '每日的降水概率往往比每小时的概率更高',
  };

  return <WeatherDailyRainChance data={weatherData} opts={{ width: 360, height: 300 }} />;
};
```

### 自定义尺寸

```tsx
<WeatherDailyRainChance
  data={weatherData}
  opts={{
    width: '90%',
    height: 280,
  }}
/>
```

### 响应式使用

```tsx
const { width } = Dimensions.get('window');

<WeatherDailyRainChance
  data={weatherData}
  opts={{
    width: width - 40,
    height: 320,
  }}
/>;
```

## 注意事项

1. **数据一致性**：确保 `chartData.x` 和 `chartData.y` 数组长度一致
2. **数值范围**：降水概率值应在 0-100 之间
3. **时间格式**：建议使用清晰的时间标签，如"上午6时"、"下午2时"
4. **数据点数量**：建议 2-12 个数据点，过多可能影响显示效果
5. **依赖安装**：需要安装 `react-native-chart-kit` 和 `react-native-svg`

## 依赖要求

```json
{
  "react-native-chart-kit": "^6.12.0",
  "react-native-svg": "^13.4.0"
}
```

## 安装命令

```bash
npm install react-native-chart-kit react-native-svg
# 或
yarn add react-native-chart-kit react-native-svg

# iOS 需要额外执行
cd ios && pod install
```
