我来根据优化后的主题变量同步更新组件说明文档：

# Button 按钮组件

## 组件描述

基于 React Native TouchableOpacity 的按钮组件，遵循设计系统规范，提供主要按钮、次要按钮和纯文字按钮三种类型，支持大、中、小三种尺寸。组件集成了完整的状态管理、图标支持和主题系统，适用于各种交互场景。

### 功能特性

- 支持三种按钮类型：主要按钮、次要按钮、纯文字按钮
- 提供大、中、小三种尺寸规格
- 内置图标支持，可设置图标位置
- 完整的状态管理：默认、按压、禁用、加载状态
- 集成主题系统，自动适配设计规范
- 支持自定义样式覆盖
- 提供加载状态和禁用状态的视觉反馈
- 支持纯图标按钮模式

## 组件API

### Props

| 参数            | 说明             | 类型                                 | 默认值      |
| --------------- | ---------------- | ------------------------------------ | ----------- |
| type            | 按钮类型         | `'primary' \| 'secondary' \| 'text'` | `'primary'` |
| size            | 按钮尺寸         | `'large' \| 'medium' \| 'small'`     | `'medium'`  |
| disabled        | 是否禁用         | `boolean`                            | `false`     |
| loading         | 是否显示加载状态 | `boolean`                            | `false`     |
| children        | 按钮内容         | `React.ReactNode`                    | -           |
| title           | 按钮文字         | `string`                             | -           |
| icon            | 图标组件         | `React.ReactNode`                    | -           |
| iconPosition    | 图标位置         | `'left' \| 'right'`                  | `'left'`    |
| onPress         | 点击事件回调     | `() => void`                         | -           |
| style           | 自定义容器样式   | `object`                             | -           |
| textStyle       | 自定义文字样式   | `object`                             | -           |
| backgroundColor | 自定义背景色     | `string`                             | -           |
| textColor       | 自定义文字颜色   | `string`                             | -           |
| width           | 自定义宽度       | `number \| string`                   | -           |

### 按钮类型说明

#### Primary（主要按钮）

- 背景色：品牌主色 `primaryBgDefault`
- 文字色：反色文字 `primaryTextColor`
- 用于主要操作和强调场景

#### Secondary（次要按钮）

- 背景色：品牌辅助色 `secondaryBgDefault`
- 文字色：主要文字色 `secondaryTextColor`
- 用于次要操作场景

#### Text（纯文字按钮）

- 背景色：透明
- 文字色：主要文字色 `secondaryTextColor`
- 用于轻量级操作场景

### 尺寸规格

| 尺寸   | 高度 | 默认宽度 | 左右内边距 | 文字字体 | 主题变量  |
| ------ | ---- | -------- | ---------- | -------- | --------- |
| Large  | 48px | 120px    | 24px       | `fontL`  | `heightL` |
| Medium | 40px | 104px    | 16px       | `fontM`  | `heightM` |
| Small  | 32px | 88px     | 12px       | `fontS`  | `heightS` |

### 主题变量

组件使用以下主题变量，支持通过主题系统进行定制：

#### 尺寸变量

- `heightS/M/L`: 按钮高度
- `minWidthS/M/L`: 按钮最小宽度
- `paddingHorizontalS/M/L`: 按钮水平内边距
- `paddingHorizontalText`: 文字按钮内边距

#### 样式变量

- `borderRadius`: 按钮圆角
- `spacingIconText`: 图标与文字间距
- `spacingBetweenButtons`: 按钮间距
- `spacingBetweenButtonsS`: 小按钮间距

#### 颜色变量

- `primaryBgDefault/Pressed/Disabled`: 主要按钮背景色
- `secondaryBgDefault/Pressed/Disabled`: 次要按钮背景色
- `primaryTextColor`: 主要按钮文字色
- `secondaryTextColor`: 次要按钮文字色
- `textColorDisabled`: 禁用状态文字色

#### 字体变量

- `fontS/M/L`: 对应尺寸的字体样式

## 使用示例

### 基础用法

```typescript
import Button from './Button';

// 主要按钮
<Button title="主要按钮" onPress={() => console.log('pressed')} />

// 次要按钮
<Button type="secondary" title="次要按钮" onPress={() => console.log('pressed')} />

// 纯文字按钮
<Button type="text" title="纯文字按钮" onPress={() => console.log('pressed')} />
```

### 尺寸变化

```typescript
// 大按钮 (heightL: 48px)
<Button size="large" title="大按钮" onPress={() => console.log('pressed')} />

// 中按钮 (heightM: 40px)
<Button size="medium" title="中按钮" onPress={() => console.log('pressed')} />

// 小按钮 (heightS: 32px)
<Button size="small" title="小按钮" onPress={() => console.log('pressed')} />
```

### 图标按钮

```typescript
import { WeatherThunder } from '../../components/basic/Icon';

// 左侧图标
<Button
  title="天气预报"
  icon={<WeatherThunder size={18} />}
  onPress={() => console.log('pressed')}
/>

// 右侧图标
<Button
  title="查看详情"
  icon={<WeatherThunder size={18} />}
  iconPosition="right"
  onPress={() => console.log('pressed')}
/>

// 纯图标按钮（自动正方形尺寸）
<Button
  icon={<WeatherThunder size={20} />}
  onPress={() => console.log('pressed')}
/>
```

### 状态示例

```typescript
// 禁用状态
<Button disabled title="禁用按钮" onPress={() => console.log('pressed')} />

// 加载状态
<Button loading title="加载中..." onPress={() => console.log('pressed')} />

// 加载状态的纯图标按钮
<Button
  loading
  icon={<WeatherThunder size={18} />}
  onPress={() => console.log('pressed')}
/>
```

### 自定义样式

```typescript
// 自定义宽度
<Button title="全宽按钮" width="100%" onPress={() => console.log('pressed')} />

// 自定义颜色
<Button
  title="自定义按钮"
  backgroundColor="#FF6B6B"
  textColor="#FFFFFF"
  onPress={() => console.log('pressed')}
/>

// 自定义样式
<Button
  title="圆形按钮"
  style={{ borderRadius: 25 }}
  textStyle={{ fontWeight: 'bold' }}
  onPress={() => console.log('pressed')}
/>
```

### 按钮组布局

```typescript
// 中按钮组 - 使用 spacingBetweenButtons (24px)
<View style={{
  flexDirection: 'row',
  gap: 24, // button.spacingBetweenButtons
  marginVertical: 8,
}}>
  <Button size="medium" title="确认" />
  <Button size="medium" type="secondary" title="取消" />
</View>

// 小按钮组 - 使用 spacingBetweenButtonsS (12px)
<View style={{
  flexDirection: 'row',
  gap: 12, // button.spacingBetweenButtonsS
  marginVertical: 8,
}}>
  <Button size="small" title="选项1" />
  <Button size="small" title="选项2" />
  <Button size="small" title="选项3" />
</View>
```

### 复杂内容

```typescript
// 自定义复杂内容
<Button onPress={() => console.log('custom content pressed')}>
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <WeatherThunder size={18} />
    <Text style={{ marginLeft: 8, color: '#fff', fontSize: 16 }}>
      自定义内容
    </Text>
  </View>
</Button>
```

## 设计规范

### 颜色规范

**主要按钮**

- 默认：背景 `primaryBgDefault`，文字 `primaryTextColor`
- 按压：背景 `primaryBgPressed`，文字 `primaryTextColor`
- 禁用：背景 `primaryBgDisabled`，文字 `textColorDisabled`

**次要按钮**

- 默认：背景 `secondaryBgDefault`，文字 `secondaryTextColor`
- 按压：背景 `secondaryBgPressed`，文字 `secondaryTextColor`
- 禁用：背景 `secondaryBgDisabled`，文字 `textColorDisabled`

**纯文字按钮**

- 默认：透明背景，文字 `secondaryTextColor`
- 按压：透明背景，文字 `secondaryTextColor`
- 禁用：透明背景，文字 `textColorDisabled`

### 间距规范

- 按钮间距：24px (`spacingBetweenButtons`)
- 小按钮间距：12px (`spacingBetweenButtonsS`)
- 图标与文字间距：8px (`spacingIconText`)

### 圆角规范

- 所有尺寸按钮圆角：20px (`borderRadius`)
- 纯文字按钮无圆角

### 特殊模式

**纯图标按钮**

- 当只传入 `icon` 而没有 `title` 和 `children` 时，自动进入纯图标模式
- 按钮变为正方形，尺寸等于对应的按钮高度
- 内边距为0，图标居中显示

## 注意事项

1. **状态管理**
   - disabled 和 loading 状态会阻止 onPress 事件触发
   - loading 状态会显示加载指示器
   - 状态变化会自动更新视觉样式和透明度

2. **图标使用**
   - 图标尺寸建议根据按钮尺寸调整（大:20px，中:18px，小:16px）
   - 图标颜色会自动继承文字颜色
   - 支持左右两个位置放置图标
   - 纯图标模式下图标不会有额外间距

3. **尺寸选择**
   - 大按钮适用于重要操作和宽松布局
   - 中按钮适用于常规操作场景
   - 小按钮适用于紧凑布局和次要操作

4. **类型选择**
   - Primary 用于主要操作，每个界面建议只有一个
   - Secondary 用于次要操作，可以有多个
   - Text 用于轻量级操作，如链接、取消等

5. **主题定制**
   - 所有样式都通过主题变量控制，支持全局定制
   - 主题变量使用 S/M/L 后缀表示尺寸
   - 自定义样式会覆盖主题样式，请谨慎使用

6. **按压效果**
   - 组件内置按压状态管理，会自动切换背景色
   - 使用 `activeOpacity={1}` 配合自定义按压效果
   - 禁用和加载状态下不会触发按压效果

## 依赖说明

- react-native: 基础组件库
- useFlexUIConfig: 主题配置 Hook
- 需要正确配置组件 Token 才能正常使用

适用于各种需要用户交互的场景，如表单提交、操作确认、导航跳转等，是构建用户界面的核心组件之一。
