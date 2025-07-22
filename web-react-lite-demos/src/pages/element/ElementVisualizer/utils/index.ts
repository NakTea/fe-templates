// 统一的样式配置
export const styleConfig = {
  // 默认样式
  defaultLineColor: '#1890ff',
  defaultLineWidth: 3,
  defaultLineDash: [5, 3],
  defaultFillColor: 'rgba(24, 144, 255, 0.05)',

  // 选中样式（红色 - 当前活动选中）
  selectedLineColor: '#ff4d4f',
  selectedLineWidth: 3,
  selectedLineDash: [8, 4],
  selectedFillColor: 'rgba(255, 77, 79, 0.2)',

  // 普通选中样式（绿色 - 在列表中但非活动）
  normalSelectedLineColor: '#52c41a',
  normalSelectedLineWidth: 2,
  normalSelectedLineDash: [6, 3],
  normalSelectedFillColor: 'rgba(82, 196, 26, 0.1)',

  // 悬停样式
  hoverFillColor: 'rgba(255, 255, 0, 0.1)',
  hoverLineColor: '#faad14',
  hoverLineWidth: 2,

  // 圈选矩形样式
  marqueeDefaultColor: '#52c41a',
  marqueeSelectedColor: '#1890ff',
  marqueeDefaultFill: 'rgba(82, 196, 26, 0.05)',
  marqueeSelectedFill: 'rgba(24, 144, 255, 0.1)',
  marqueeDefaultDash: [5, 5],
  marqueeSelectedDash: [8, 4],

  // 节点选择样式
  nodeInListColor: '#52c41a',
  nodeHighlightColor: '#ff4d4f', // 改为红色，表示当前活动选中
  nodeInListFill: 'rgba(82, 196, 26, 0.1)',
  nodeHighlightFill: 'rgba(255, 77, 79, 0.2)',
  nodeInListDash: [4, 4],
  nodeHighlightDash: [6, 2],

  // 标签样式
  labelBackgroundDefault: '#52c41a',
  labelBackgroundSelected: '#1890ff',
  labelBackgroundHighlight: '#ff4d4f', // 红色标签表示活动选中
  labelBackgroundNormalSelected: '#52c41a', // 绿色标签表示普通选中
  labelTextColor: 'white',
  labelFont: 'bold 12px Arial',
  labelSmallFont: 'bold 10px Arial',

  // 手柄样式
  handleFillColor: 'white',
  handleStrokeColor: '#1890ff',
  handleRadius: 6,
  handleLineWidth: 2,

  // 小节点样式
  smallNodeThreshold: 10000,
  smallNodeColor: '#73c0de',
  smallNodeWidth: 2,
  smallNodeDash: [3, 2],

  // 只读模式样式
  readOnlyColor: '#ff7875',
  readOnlyBackgroundColor: 'rgba(255, 120, 117, 0.9)',
  readOnlyTextColor: 'white',

  // 动画和过渡
  transitionDuration: '0.2s',
  scaleSelected: 1.02,
  scaleDefault: 1,
};

// 工具函数：获取节点样式 - 更新版本
export const getNodeStyle = (
  isCanvasSelected: boolean,
  isHovered: boolean,
  isInList: boolean,
  isActiveSelected: boolean, // 从列表中选中的活动状态
  area: number,
) => {
  const isSmallNode = area < styleConfig.smallNodeThreshold;

  if (isActiveSelected) {
    // 活动选中状态（红色）- 最高优先级
    return {
      strokeStyle: styleConfig.nodeHighlightColor,
      lineWidth: 4,
      lineDash: styleConfig.nodeHighlightDash,
      fillStyle: styleConfig.nodeHighlightFill,
    };
  }

  if (isCanvasSelected) {
    // 画布选中状态（红色）
    return {
      strokeStyle: styleConfig.selectedLineColor,
      lineWidth: styleConfig.selectedLineWidth,
      lineDash: styleConfig.selectedLineDash,
      fillStyle: styleConfig.selectedFillColor,
    };
  }

  if (isInList) {
    // 在列表中但非活动状态（绿色）
    return {
      strokeStyle: styleConfig.normalSelectedLineColor,
      lineWidth: styleConfig.normalSelectedLineWidth,
      lineDash: styleConfig.normalSelectedLineDash,
      fillStyle: styleConfig.normalSelectedFillColor,
    };
  }

  if (isHovered) {
    // 悬停状态
    return {
      strokeStyle: styleConfig.hoverLineColor,
      lineWidth: styleConfig.hoverLineWidth,
      lineDash: styleConfig.defaultLineDash,
      fillStyle: styleConfig.hoverFillColor,
    };
  }

  // 默认样式
  return {
    strokeStyle: isSmallNode ? styleConfig.smallNodeColor : styleConfig.defaultLineColor,
    lineWidth: isSmallNode ? styleConfig.smallNodeWidth : styleConfig.defaultLineWidth,
    lineDash: isSmallNode ? styleConfig.smallNodeDash : styleConfig.defaultLineDash,
    fillStyle: null,
  };
};

// 工具函数：获取圈选矩形样式
export const getMarqueeStyle = (isSelected: boolean) => {
  if (isSelected) {
    return {
      strokeStyle: styleConfig.marqueeSelectedColor,
      lineWidth: 3,
      lineDash: styleConfig.marqueeSelectedDash,
      fillStyle: styleConfig.marqueeSelectedFill,
      labelColor: styleConfig.labelBackgroundSelected,
    };
  }

  return {
    strokeStyle: styleConfig.marqueeDefaultColor,
    lineWidth: 2,
    lineDash: styleConfig.marqueeDefaultDash,
    fillStyle: styleConfig.marqueeDefaultFill,
    labelColor: styleConfig.labelBackgroundDefault,
  };
};

// 导出单独的变量以保持向后兼容
export const {
  defaultLineColor,
  selectedLineColor,
  defaultLineWidth,
  selectedLineWidth,
  selectedFillColor,
  hoverFillColor,
  defaultLineDash,
} = styleConfig;
