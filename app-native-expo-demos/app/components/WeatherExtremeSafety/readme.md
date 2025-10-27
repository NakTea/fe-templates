# WeatherExtremeSafety 组件说明文档

## 组件概述

WeatherExtremeSafety 是一个用于展示极端天气安全预警信息的React Native组件。该组件包含位置信息、预警图标、降水概率图表和安全提示等功能模块，适用于天气预警场景。

## 功能特性

- 📍 **位置显示**：展示当前预警地区
- ⚠️ **预警图标**：显示对应的天气预警图标
- 📊 **数据图表**：使用ECharts展示降水概率趋势
- 💡 **安全提示**：提供相应的安全建议信息
- 🎨 **主题适配**：完全支持Design Token主题系统

## 组件Props

### IProps 接口定义

```typescript
interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}
```

### TData 数据类型定义

```typescript
type TData = {
  location?: string; // 位置信息
  weatherIcon?: string; // 天气预警图标名称
  title?: string; // 预警标题
  chartData?: {
    x?: string[]; // 时间标签
    y?: number[]; // 数值数据
    unit?: string; // 单位
    highlight?: string[]; // 高亮时间点
  };
  tips?: {
    type: string; // 提示类型：'error' | 'warning' | 'info' | 'success'
    message: string; // 提示信息
  };
};
```

## JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "title": "WeatherExtremeSafety Component Schema",
  "properties": {
    "data": {
      "type": "object",
      "properties": {
        "location": {
          "type": "string",
          "description": "位置信息",
          "example": "上海"
        },
        "weatherIcon": {
          "type": "string",
          "description": "天气预警图标名称",
          "example": "weatherLightingRed"
        },
        "title": {
          "type": "string",
          "description": "预警标题",
          "example": "雷电红色预警"
        },
        "chartData": {
          "type": "object",
          "properties": {
            "x": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "时间标签数组",
              "example": ["19:00", "21:00", "23:00", "01:00", "03:00"]
            },
            "y": {
              "type": "array",
              "items": {
                "type": "number",
                "minimum": 0,
                "maximum": 100
              },
              "description": "数值数据数组",
              "example": [15, 25, 40, 35, 20]
            },
            "unit": {
              "type": "string",
              "description": "数据单位",
              "example": "mm"
            },
            "highlight": {
              "type": "array",
              "items": {
                "type": "string"
              },
              "description": "需要高亮显示的时间点",
              "example": ["23:00"]
            }
          }
        },
        "tips": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["error", "warning", "info", "success"],
              "description": "提示类型"
            },
            "message": {
              "type": "string",
              "description": "提示信息内容"
            }
          },
          "required": ["type", "message"]
        }
      }
    },
    "opts": {
      "type": "object",
      "description": "opts专用配置",
      "additionalProperties": true
    }
  }
}
```

## Mock Data

### 基础示例数据

```javascript
const mockData = {
  location: '上海',
  weatherIcon: 'weatherLightingRed',
  title: '雷电红色预警',
  chartData: {
    x: ['19:00', '21:00', '23:00', '01:00', '03:00'],
    y: [15, 25, 40, 35, 20],
    unit: 'mm',
    highlight: ['23:00'],
  },
  tips: {
    type: 'error',
    message: '预计30分钟后将有强降雨和雷电，请避免在低洼、树下或广告牌下停车。',
  },
};
```

### 多种预警类型示例

```javascript
// 大雾预警
const fogWarningData = {
  location: '北京',
  weatherIcon: 'weatherFogRed',
  title: '大雾红色预警',
  chartData: {
    x: ['06:00', '08:00', '10:00', '12:00', '14:00'],
    y: [80, 90, 95, 85, 70],
    unit: '%',
    highlight: ['10:00'],
  },
  tips: {
    type: 'warning',
    message: '能见度极低，请减速慢行，开启雾灯，保持安全车距。',
  },
};

// 暴雨预警
const rainstormData = {
  location: '广州',
  weatherIcon: 'weatherRainstormOrange',
  title: '暴雨橙色预警',
  chartData: {
    x: ['14:00', '16:00', '18:00', '20:00', '22:00'],
    y: [30, 60, 80, 70, 45],
    unit: 'mm',
    highlight: ['18:00'],
  },
  tips: {
    type: 'error',
    message: '强降雨即将来临，请避免前往低洼地区，注意防范积水和山洪。',
  },
};

// 高温预警
const heatWaveData = {
  location: '重庆',
  weatherIcon: 'weatherHeatRed',
  title: '高温红色预警',
  chartData: {
    x: ['10:00', '12:00', '14:00', '16:00', '18:00'],
    y: [35, 38, 42, 40, 37],
    unit: '°C',
    highlight: ['14:00'],
  },
  tips: {
    type: 'warning',
    message: '气温极高，请避免长时间户外活动，及时补充水分，预防中暑。',
  },
};
```

### 无数据状态示例

```javascript
const noDataExample = {
  location: '深圳',
  weatherIcon: 'weatherSunny',
  title: '天气良好',
  tips: {
    type: 'info',
    message: '当前天气状况良好，适宜出行。',
  },
  // 注意：没有 chartData 字段，组件会显示"暂无图表数据"
};
```

## 使用示例

### 基础用法

```tsx
import WeatherExtremeSafety from './WeatherExtremeSafety';

const App = () => {
  return <WeatherExtremeSafety data={mockData} opts={{ width: 360 }} />;
};
```

### 响应式布局

```tsx
<WeatherExtremeSafety
  data={mockData}
  opts={{
    width: '90%',
    height: 'auto',
  }}
/>
```

### 自定义尺寸

```tsx
<WeatherExtremeSafety
  data={mockData}
  opts={{
    width: 400,
    height: 300,
  }}
/>
```

## 图表配置说明

组件使用ECharts绘制降水概率趋势图，支持以下特性：

- **平滑曲线**：使用贝塞尔曲线平滑连接数据点
- **区域填充**：图表下方填充半透明颜色
- **高亮显示**：支持特定时间点的高亮标记
- **响应式**：图表宽度自适应容器大小
- **交互提示**：点击数据点显示详细信息

## 样式定制

组件完全基于Design Token系统，支持以下样式定制：

- **颜色主题**：通过theme provider统一管理
- **字体样式**：使用标准化字体token
- **间距布局**：遵循统一的间距规范
- **圆角边框**：使用系统圆角token

## 注意事项

1. **数据安全**：所有props都进行了安全解构，支持部分数据缺失
2. **图表依赖**：需要安装`@wuba/react-native-echarts`和相关依赖
3. **性能优化**：图表使用SVG渲染，支持硬件加速
4. **类型安全**：完整的TypeScript类型定义
5. **无障碍访问**：建议为图标和图表添加accessibility标签

## 依赖要求

```json
{
  "@wuba/react-native-echarts": "^1.0.0",
  "echarts": "^5.0.0"
}
```
