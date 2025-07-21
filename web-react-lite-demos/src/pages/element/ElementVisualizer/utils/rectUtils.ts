import { IMarqueeRect, IMarqueeRectData } from '../types';

// 生成唯一矩形ID
export const generateRectId = (): string => `rect_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// 检查点是否在矩形内部
export const isPointInRect = (x: number, y: number, rect: IMarqueeRect): boolean => {
  return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
};

// 获取调整大小的手柄
export const getResizeHandle = (x: number, y: number, rect: IMarqueeRect): string | null => {
  const handleSize = 8;
  const handles: Record<string, { x: number; y: number }> = {
    nw: { x: rect.x, y: rect.y },
    ne: { x: rect.x + rect.width, y: rect.y },
    sw: { x: rect.x, y: rect.y + rect.height },
    se: { x: rect.x + rect.width, y: rect.y + rect.height },
  };

  for (let position in handles) {
    const handle = handles[position];
    if (Math.abs(x - handle.x) <= handleSize && Math.abs(y - handle.y) <= handleSize) {
      return position;
    }
  }
  return null;
};

// 边界检查和限制
export const constrainRect = (
  rect: IMarqueeRect,
  imageWidth: number,
  imageHeight: number,
  minSize: number = 10,
): IMarqueeRect => {
  const newRect = { ...rect };

  // 位置边界检查
  newRect.x = Math.max(0, newRect.x);
  newRect.y = Math.max(0, newRect.y);

  // 尺寸边界检查
  newRect.width = Math.max(minSize, Math.min(newRect.width, imageWidth - newRect.x));
  newRect.height = Math.max(minSize, Math.min(newRect.height, imageHeight - newRect.y));

  return newRect;
};

// 数据转换函数
export const convertToInternalRects = (rects: IMarqueeRectData[]): IMarqueeRect[] => {
  return rects.map((rectData) => ({
    id: rectData.id,
    x: rectData.rect.x,
    y: rectData.rect.y,
    width: rectData.rect.width,
    height: rectData.rect.height,
    selected: rectData.selected,
  }));
};

export const convertToExternalRects = (rects: IMarqueeRect[]): IMarqueeRectData[] => {
  return rects.map((rect) => ({
    id: rect.id,
    rect: {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
    },
    selected: rect.selected,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
};

// 计算矩形调整后的新位置
export const calculateResizedRect = (
  originalRect: IMarqueeRect,
  handle: string,
  newX: number,
  newY: number,
): Partial<IMarqueeRect> => {
  const updates: Partial<IMarqueeRect> = {};

  switch (handle) {
    case 'nw':
      updates.width = originalRect.x + originalRect.width - newX;
      updates.height = originalRect.y + originalRect.height - newY;
      updates.x = newX;
      updates.y = newY;
      break;
    case 'ne':
      updates.width = newX - originalRect.x;
      updates.height = originalRect.y + originalRect.height - newY;
      updates.y = newY;
      break;
    case 'sw':
      updates.width = originalRect.x + originalRect.width - newX;
      updates.height = newY - originalRect.y;
      updates.x = newX;
      break;
    case 'se':
      updates.width = newX - originalRect.x;
      updates.height = newY - originalRect.y;
      break;
  }

  return updates;
};

// 批量更新矩形选中状态，避免多次渲染
export const batchUpdateRectSelection = (rects: IMarqueeRect[], selectedId: string | null): IMarqueeRect[] => {
  return rects.map((rect) => ({
    ...rect,
    selected: rect.id === selectedId,
  }));
};

// 根据ID查找矩形
export const findRectById = (rects: IMarqueeRect[], id: string): IMarqueeRect | null => {
  return rects.find((rect) => rect.id === id) || null;
};
