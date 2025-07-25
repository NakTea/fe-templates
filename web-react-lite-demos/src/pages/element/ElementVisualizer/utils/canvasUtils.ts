import { styleConfig } from './index';

// Canvas相关工具函数
export const getCanvasCoordinates = (
  e: React.MouseEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement,
): { x: number; y: number } => {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
};

// 绘制虚线矩形
export const drawDashedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  dashArray: number[] = styleConfig.defaultLineDash,
) => {
  ctx.setLineDash(dashArray);
  ctx.strokeRect(x, y, width, height);
  ctx.setLineDash([]); // 重置虚线样式
};

// 绘制矩形手柄
export const drawResizeHandles = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  color: string = styleConfig.handleStrokeColor,
) => {
  const handles = [
    { x: x, y: y }, // 左上
    { x: x + width, y: y }, // 右上
    { x: x, y: y + height }, // 左下
    { x: x + width, y: y + height }, // 右下
  ];

  handles.forEach((handle) => {
    ctx.beginPath();
    ctx.arc(handle.x, handle.y, styleConfig.handleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = styleConfig.handleFillColor;
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = styleConfig.handleLineWidth;
    ctx.setLineDash([]);
    ctx.stroke();
  });
};

// 绘制矩形标签
export const drawRectLabel = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  label: string,
  backgroundColor: string = styleConfig.labelBackgroundDefault,
) => {
  const labelX = x + 5;
  const labelY = y + 20;

  // 绘制标签背景
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(labelX - 3, labelY - 15, 25, 18);

  // 绘制标签文字
  ctx.fillStyle = styleConfig.labelTextColor;
  ctx.font = styleConfig.labelFont;
  ctx.fillText(label, labelX, labelY);
};

// 绘制只读标识
export const drawReadOnlyLabel = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number) => {
  const readOnlyX = x + width - 30;
  const readOnlyY = y + 20;

  ctx.fillStyle = styleConfig.readOnlyColor;
  ctx.fillRect(readOnlyX - 3, readOnlyY - 15, 28, 18);

  ctx.fillStyle = styleConfig.readOnlyTextColor;
  ctx.font = styleConfig.labelSmallFont;
  ctx.fillText('只读', readOnlyX, readOnlyY);
};

// 绘制节点边框
export const drawNodeBorder = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  style: {
    strokeStyle: string;
    lineWidth: number;
    lineDash: number[];
    fillStyle?: string | null;
  },
) => {
  // 绘制填充
  if (style.fillStyle) {
    ctx.fillStyle = style.fillStyle;
    ctx.fillRect(x, y, width, height);
  }

  // 绘制边框
  ctx.strokeStyle = style.strokeStyle;
  ctx.lineWidth = style.lineWidth;
  ctx.setLineDash(style.lineDash);
  ctx.strokeRect(x, y, width, height);
  ctx.setLineDash([]);
};
