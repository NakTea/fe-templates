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
  dashArray: number[] = [5, 5],
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
  color: string = '#1890ff',
) => {
  const handles = [
    { x: x, y: y }, // 左上
    { x: x + width, y: y }, // 右上
    { x: x, y: y + height }, // 左下
    { x: x + width, y: y + height }, // 右下
  ];

  handles.forEach((handle) => {
    ctx.beginPath();
    ctx.arc(handle.x, handle.y, 6, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
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
  backgroundColor: string = '#1890ff',
) => {
  const labelX = x + 5;
  const labelY = y + 20;

  // 绘制标签背景
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(labelX - 3, labelY - 15, 25, 18);

  // 绘制标签文字
  ctx.fillStyle = 'white';
  ctx.font = 'bold 12px Arial';
  ctx.fillText(label, labelX, labelY);
};
