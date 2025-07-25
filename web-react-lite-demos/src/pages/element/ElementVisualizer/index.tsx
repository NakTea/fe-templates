import React, { useState, useRef, useEffect, useCallback } from 'react';
import styles from './index.module.less';

// 工具函数导入
import {
  getCanvasCoordinates,
  drawDashedRect,
  drawResizeHandles,
  drawRectLabel,
  drawReadOnlyLabel,
  drawNodeBorder,
} from './utils/canvasUtils';
import {
  generateRectId,
  isPointInRect,
  getResizeHandle,
  constrainRect,
  convertToInternalRects,
  convertToExternalRects,
  calculateResizedRect,
  batchUpdateRectSelection,
} from './utils/rectUtils';
import {
  isNodeInside,
  calculateNodeArea,
  findNodesByPosition,
  getBestMatchNode,
  collectNodes,
  convertNodeToSelectedData,
  batchUpdateNodeSelection,
  findSelectedNodeById,
  isNodeInSelectedList,
} from './utils/nodeUtils';
import { debounce } from './utils/debounce';
import { styleConfig, getNodeStyle, getMarqueeStyle } from './utils';

// 类型导入
import { IElementNode, IMarqueeRectData, IMarqueeRect, IContextMenu, ISelectedNodeData } from './types';

interface IElementVisualizer {
  imageUrl: string;
  xmlData: IElementNode;
  onSelect: (node: IElementNode) => void;
  marqueeMode?: boolean;
  maxRectCount?: number;
  initialMarqueeRects?: IMarqueeRectData[];
  onMarqueeOutput?: (rectData: IMarqueeRectData) => void;
  onMarqueeListChange?: (rects: IMarqueeRectData[]) => void;
  onMarqueeDelete?: (rectId: string) => void;
  readOnly?: boolean;
  selectedNodes?: ISelectedNodeData[];
  onSelectedNodesChange?: (nodes: ISelectedNodeData[]) => void;
  onNodeOutput?: (node: ISelectedNodeData) => void;
}

const ElementVisualizer: React.FC<IElementVisualizer> = ({
  imageUrl,
  xmlData,
  onSelect,
  marqueeMode = false,
  maxRectCount = 5,
  initialMarqueeRects = [],
  onMarqueeOutput,
  onMarqueeListChange,
  onMarqueeDelete,
  readOnly = false,
  selectedNodes = [],
  onSelectedNodesChange,
  onNodeOutput,
}) => {
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 原有状态
  const [selectedNode, setSelectedNode] = useState<IElementNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<IElementNode | null>(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // 圈选相关状态
  const [marqueeRects, setMarqueeRects] = useState<IMarqueeRect[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(null);
  const [selectedRectId, setSelectedRectId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);

  // 性能优化：临时状态，用于拖动和调整大小时的实时预览
  const [tempRect, setTempRect] = useState<IMarqueeRect | null>(null);

  // 新增：绘制时的预览矩形状态
  const [previewRect, setPreviewRect] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  // 新增：当前高亮的节点（用于反显）
  const [highlightedNodeKey, setHighlightedNodeKey] = useState<string | null>(null);

  // 右键菜单状态
  const [contextMenu, setContextMenu] = useState<IContextMenu>({
    visible: false,
    x: 0,
    y: 0,
    rectId: null,
  });

  // 缓存背景图片和节点
  const backgroundImageRef = useRef<HTMLImageElement | null>(null);
  const allNodes = useRef<IElementNode[]>([]);

  // 防止重复渲染的标志
  const isUpdatingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  // 使用 useMemo 缓存处理后的矩形数据
  const processedRects = React.useMemo(() => {
    if (tempRect) {
      return marqueeRects.map((rect) => (rect.id === tempRect.id ? tempRect : rect));
    }
    return marqueeRects;
  }, [marqueeRects, tempRect]);

  // 初始化矩形数据
  useEffect(() => {
    if (initialMarqueeRects.length > 0) {
      const internalRects = convertToInternalRects(initialMarqueeRects);
      const selectedRect = initialMarqueeRects.find((rect) => rect.selected);

      // 批量更新，避免多次状态变更
      setMarqueeRects(internalRects);
      if (selectedRect && selectedRect.id !== selectedRectId) {
        setSelectedRectId(selectedRect.id);
      }
    }
  }, [initialMarqueeRects]);

  // 监听内部矩形变化，同步到外部（防抖优化）
  const debouncedUpdateExternalRects = useCallback(
    debounce((rects: IMarqueeRect[]) => {
      if (marqueeMode && !isUpdatingRef.current) {
        const externalRects = convertToExternalRects(rects);
        onMarqueeListChange?.(externalRects);
      }
    }, 50),
    [marqueeMode, onMarqueeListChange],
  );

  useEffect(() => {
    debouncedUpdateExternalRects(marqueeRects);
  }, [marqueeRects, debouncedUpdateExternalRects]);

  // 优化的选择矩形函数
  const selectRectById = useCallback(
    (rectId: string | null) => {
      if (selectedRectId === rectId) return;

      isUpdatingRef.current = true;

      setMarqueeRects((prev) => batchUpdateRectSelection(prev, rectId));
      setSelectedRectId(rectId);

      if (rectId) {
        const selectedRect = marqueeRects.find((rect) => rect.id === rectId);
        if (selectedRect) {
          const rectData: IMarqueeRectData = {
            id: selectedRect.id,
            rect: {
              x: selectedRect.x,
              y: selectedRect.y,
              width: selectedRect.width,
              height: selectedRect.height,
            },
            selected: true,
            createdAt: new Date().toISOString(),
            metadata: {
              area: selectedRect.width * selectedRect.height,
              aspectRatio: (selectedRect.width / selectedRect.height).toFixed(2),
              readOnly: readOnly,
            },
          };
          onMarqueeOutput?.(rectData);
        }
      }

      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    },
    [selectedRectId, marqueeRects, onMarqueeOutput, readOnly],
  );

  // 删除功能
  const deleteSelectedRect = useCallback(() => {
    if (!selectedRectId || readOnly) return;

    setMarqueeRects((prev) => prev.filter((rect) => rect.id !== selectedRectId));
    onMarqueeDelete?.(selectedRectId);
    setSelectedRectId(null);
    setContextMenu({ visible: false, x: 0, y: 0, rectId: null });

    console.log(`Deleted rect: ${selectedRectId}`);
  }, [selectedRectId, onMarqueeDelete, readOnly]);

  const deleteRectById = useCallback(
    (rectId: string) => {
      if (readOnly) return;

      setMarqueeRects((prev) => prev.filter((rect) => rect.id !== rectId));
      onMarqueeDelete?.(rectId);

      if (selectedRectId === rectId) {
        setSelectedRectId(null);
      }

      setContextMenu({ visible: false, x: 0, y: 0, rectId: null });
      console.log(`Deleted rect: ${rectId}`);
    },
    [selectedRectId, onMarqueeDelete, readOnly],
  );

  // 键盘事件处理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!marqueeMode) return;

      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedRectId && !readOnly) {
        e.preventDefault();
        deleteSelectedRect();
      }

      if (e.key === 'Escape') {
        selectRectById(null);
        setContextMenu({ visible: false, x: 0, y: 0, rectId: null });
      }
    };

    if (marqueeMode) {
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [marqueeMode, selectedRectId, deleteSelectedRect, readOnly, selectRectById]);

  // 点击其他地方关闭右键菜单
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (contextMenu.visible) {
        setContextMenu({ visible: false, x: 0, y: 0, rectId: null });
      }
    };

    if (contextMenu.visible) {
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [contextMenu.visible]);

  // 初始化节点集合
  useEffect(() => {
    handleClearSelection();
    allNodes.current = collectNodes(xmlData);
  }, [xmlData]);

  // 图片加载
  useEffect(() => {
    if (!imageUrl || !backgroundCanvasRef.current || !overlayCanvasRef.current) return;

    const backgroundCanvas = backgroundCanvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
      backgroundImageRef.current = img;
      setIsImageLoaded(true);

      backgroundCanvas.width = img.width;
      backgroundCanvas.height = img.height;
      overlayCanvas.width = img.width;
      overlayCanvas.height = img.height;

      setTimeout(() => {
        const bgCtx = backgroundCanvas.getContext('2d');
        if (bgCtx) {
          bgCtx.drawImage(img, 0, 0);
        }
      }, 0);

      requestAnimationFrame(() => drawOverlay());
    };
  }, [imageUrl]);

  // 修改绘制覆盖层函数，正确显示节点状态
  const drawOverlay = useCallback(() => {
    if (!overlayCanvasRef.current || !isImageLoaded) return;

    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (marqueeMode) {
      // 圈选模式：绘制圈选矩形（保持不变）
      processedRects.forEach((rect, index) => {
        const style = getMarqueeStyle(rect.selected);

        // 绘制矩形填充
        ctx.fillStyle = style.fillStyle;
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        // 绘制虚线边框
        ctx.strokeStyle = style.strokeStyle;
        ctx.lineWidth = style.lineWidth;
        drawDashedRect(ctx, rect.x, rect.y, rect.width, rect.height, style.lineDash);

        // 只读模式下不显示调整大小的手柄
        if (rect.selected && !readOnly) {
          drawResizeHandles(ctx, rect.x, rect.y, rect.width, rect.height, style.strokeStyle);
        }

        // 绘制矩形序号标签
        const rectIndex = index + 1;
        drawRectLabel(ctx, rect.x, rect.y, `#${rectIndex}`, style.labelColor);

        // 只读模式标识
        if (readOnly && rect.selected) {
          drawReadOnlyLabel(ctx, rect.x, rect.y, rect.width);
        }
      });

      // 绘制预览矩形（正在绘制时）
      if (previewRect && isDrawing) {
        const { x, y, width, height } = previewRect;

        // 绘制预览填充
        ctx.fillStyle = 'rgba(0, 123, 255, 0.1)';
        ctx.fillRect(x, y, width, height);

        // 绘制预览边框
        ctx.strokeStyle = '#007bff';
        ctx.lineWidth = 2;
        drawDashedRect(ctx, x, y, width, height, [3, 3]);

        // 绘制预览标签
        const nextIndex = processedRects.length + 1;
        drawRectLabel(ctx, x, y, `#${nextIndex}`, '#007bff');

        // 显示尺寸信息
        const sizeText = `${Math.round(width)} × ${Math.round(height)}`;
        ctx.fillStyle = 'rgba(0, 123, 255, 0.8)';
        ctx.fillRect(x + width - 80, y + height - 20, 75, 16);
        ctx.fillStyle = 'white';
        ctx.font = '11px Arial';
        ctx.fillText(sizeText, x + width - 75, y + height - 8);
      }
    } else {
      // 节点选择模式：绘制节点边界
      allNodes.current?.forEach((node) => {
        if (!node?.rect) return;
        const { x, y, width, height } = node?.rect;

        const area = calculateNodeArea(node);
        const isInSelectedList = isNodeInSelectedList(selectedNodes, node.key);
        const isActiveSelected = highlightedNodeKey === node.key; // 从列表中选中的活动状态
        const isHovered = hoveredNode?.key === node.key;
        const isCanvasSelected = selectedNode?.key === node.key;

        // 获取对应的样式
        const style = getNodeStyle(isCanvasSelected, isHovered, isInSelectedList, isActiveSelected, area);

        // 绘制节点边框和填充
        drawNodeBorder(ctx, x, y, width, height, style);

        // 绘制节点标签
        if (isInSelectedList) {
          const nodeIndex = selectedNodes.findIndex((n) => n.key === node.key) + 1;
          let labelColor = styleConfig.labelBackgroundNormalSelected; // 默认绿色

          if (isActiveSelected) {
            labelColor = styleConfig.labelBackgroundHighlight; // 活动选中红色
          } else if (isCanvasSelected) {
            labelColor = styleConfig.labelBackgroundSelected; // 画布选中蓝色
          }

          drawRectLabel(ctx, x, y, `N${nodeIndex}`, labelColor);
        }
      });
    }
  }, [
    selectedNode,
    hoveredNode,
    isImageLoaded,
    marqueeMode,
    processedRects,
    readOnly,
    selectedNodes,
    highlightedNodeKey,
    previewRect,
    isDrawing,
  ]);

  // 监听外部选中节点变化，更新高亮
  useEffect(() => {
    const selectedNodeFromList = selectedNodes.find((node) => node.selected);
    const newHighlightKey = selectedNodeFromList ? selectedNodeFromList.key : null;

    if (highlightedNodeKey !== newHighlightKey) {
      setHighlightedNodeKey(newHighlightKey);

      // 如果有节点从列表被选中，清除画布上的当前选中状态
      if (newHighlightKey && selectedNode?.key !== newHighlightKey) {
        setSelectedNode(null);
      }
    }
  }, [selectedNodes, highlightedNodeKey, selectedNode]);

  // 优化的重绘逻辑
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const needsAnimation = marqueeMode || hoveredNode || selectedNode || isDragging || isResizing || isDrawing;

    if (needsAnimation) {
      const animate = () => {
        drawOverlay();
        if (needsAnimation) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      requestAnimationFrame(() => drawOverlay());
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [drawOverlay, marqueeMode, hoveredNode, selectedNode, isDragging, isResizing, isDrawing]);

  // 修改节点点击处理逻辑 - 实现状态切换
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!overlayCanvasRef.current) return;

    const coords = getCanvasCoordinates(e, overlayCanvasRef.current);

    if (marqueeMode) {
      // 圈选模式逻辑保持不变
      let clickedRect: IMarqueeRect | null = null;

      for (let i = marqueeRects.length - 1; i >= 0; i--) {
        if (isPointInRect(coords.x, coords.y, marqueeRects[i])) {
          clickedRect = marqueeRects[i];
          break;
        }
      }

      if (clickedRect) {
        selectRectById(clickedRect.id);
      } else {
        selectRectById(null);
      }
    } else {
      // 节点选择模式 - 支持状态切换
      const clickedNode = getBestMatchNode(allNodes.current, coords.x, coords.y);

      if (clickedNode) {
        // 检查是否按住 Ctrl/Cmd 键进行多选
        const isMultiSelect = e.ctrlKey || e.metaKey;

        // 检查节点是否已在列表中
        const isAlreadyInList = isNodeInSelectedList(selectedNodes, clickedNode.key);

        if (isAlreadyInList) {
          // 节点已在列表中 - 切换为活动选中状态

          // 1. 将之前的活动选中节点恢复为普通选中状态
          // 2. 将当前点击的节点设为活动选中状态
          const updatedNodes = selectedNodes.map((node) => ({
            ...node,
            selected: node.key === clickedNode.key, // 只有当前点击的节点为选中状态
          }));

          onSelectedNodesChange?.(updatedNodes);

          // 输出当前活动选中的节点
          const activeNode = updatedNodes.find((node) => node.selected);
          if (activeNode) {
            onNodeOutput?.(activeNode);
          }

          // 清除画布选中状态，设置高亮状态
          setSelectedNode(null);
          setHighlightedNodeKey(clickedNode.key);

          console.log('Switched to active selected:', clickedNode.key);
        } else {
          // 节点不在列表中 - 添加到列表
          if (!readOnly) {
            const nodeData = convertNodeToSelectedData(clickedNode);

            let updatedNodes: ISelectedNodeData[];

            if (isMultiSelect) {
              // 多选模式：添加到列表，不改变其他节点的选中状态
              updatedNodes = [...selectedNodes, { ...nodeData, selected: false }];
              // 设置画布选中状态
              setSelectedNode(clickedNode);
              setHighlightedNodeKey(null);
            } else {
              // 单选模式：清除其他节点的选中状态，添加当前节点为活动选中
              updatedNodes = [
                ...selectedNodes.map((node) => ({ ...node, selected: false })),
                { ...nodeData, selected: true },
              ];
              // 清除画布选中状态，设置高亮状态
              setSelectedNode(null);
              setHighlightedNodeKey(clickedNode.key);
            }

            onSelectedNodesChange?.(updatedNodes);
            onNodeOutput?.(nodeData);
            onSelect?.(clickedNode);

            console.log('Added node to list:', nodeData);
            console.log('Multi-select mode:', isMultiSelect);
          }
        }

        console.log('Clicked node:', clickedNode);
      } else {
        // 点击空白区域
        const isMultiSelect = e.ctrlKey || e.metaKey;

        if (!isMultiSelect) {
          // 非多选模式：清除所有选中状态
          setSelectedNode(null);
          setHighlightedNodeKey(null);
          if (selectedNodes.length > 0) {
            const updatedNodes = batchUpdateNodeSelection(selectedNodes, null);
            onSelectedNodesChange?.(updatedNodes);
          }
        }
        // 多选模式下点击空白区域不清除选择
      }
    }
  };

  // 右键菜单处理
  const handleCanvasContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!marqueeMode) return;

    e.preventDefault();
    const coords = getCanvasCoordinates(e, overlayCanvasRef.current!);

    let clickedRect: IMarqueeRect | null = null;
    for (let i = marqueeRects.length - 1; i >= 0; i--) {
      if (isPointInRect(coords.x, coords.y, marqueeRects[i])) {
        clickedRect = marqueeRects[i];
        break;
      }
    }

    if (clickedRect) {
      setContextMenu({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        rectId: clickedRect.id,
      });

      // 选中右键点击的矩形
      selectRectById(clickedRect.id);
    } else {
      setContextMenu({ visible: false, x: 0, y: 0, rectId: null });
    }
  };

  const handleCanvasHover = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!overlayCanvasRef.current || marqueeMode) return;

    const coords = getCanvasCoordinates(e, overlayCanvasRef.current);
    const hoverNode = getBestMatchNode(allNodes.current, coords.x, coords.y);

    if (hoverNode?.key !== hoveredNode?.key) {
      setHoveredNode(hoverNode || null);
    }
  };

  // 圈选模式鼠标按下
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!marqueeMode || !overlayCanvasRef.current || readOnly) return;

    const coords = getCanvasCoordinates(e, overlayCanvasRef.current);

    const selectedRect = marqueeRects.find((rect) => rect.selected);
    if (selectedRect) {
      const handle = getResizeHandle(coords.x, coords.y, selectedRect);
      if (handle) {
        setIsResizing(true);
        setResizeHandle(handle);
        setTempRect(selectedRect);
        return;
      }

      if (isPointInRect(coords.x, coords.y, selectedRect)) {
        setIsDragging(true);
        setDragOffset({
          x: coords.x - selectedRect.x,
          y: coords.y - selectedRect.y,
        });
        setTempRect(selectedRect);
        return;
      }
    }

    // 开始绘制新矩形
    if (marqueeRects.length < maxRectCount) {
      setIsDrawing(true);
      setStartPoint(coords);
      setPreviewRect({ x: coords.x, y: coords.y, width: 0, height: 0 });
    }
  };

  // 优化圈选模式鼠标移动 - 添加实时预览
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!marqueeMode || !overlayCanvasRef.current) return;

    const coords = getCanvasCoordinates(e, overlayCanvasRef.current);

    if (readOnly) return;

    if (isDragging && selectedRectId && tempRect) {
      // 拖动矩形 - 只更新临时状态
      let newX = coords.x - dragOffset.x;
      let newY = coords.y - dragOffset.y;

      newX = Math.max(0, Math.min(newX, imageSize.width - tempRect.width));
      newY = Math.max(0, Math.min(newY, imageSize.height - tempRect.height));

      setTempRect((prev) => (prev ? { ...prev, x: newX, y: newY } : null));
    } else if (isResizing && selectedRectId && resizeHandle && tempRect) {
      // 调整矩形大小 - 只更新临时状态
      const updates = calculateResizedRect(tempRect, resizeHandle, coords.x, coords.y);
      const newRect = constrainRect({ ...tempRect, ...updates }, imageSize.width, imageSize.height);
      setTempRect(newRect);
    } else if (isDrawing && startPoint) {
      // 绘制新矩形的实时预览
      const x = Math.min(startPoint.x, coords.x);
      const y = Math.min(startPoint.y, coords.y);
      const width = Math.abs(coords.x - startPoint.x);
      const height = Math.abs(coords.y - startPoint.y);

      // 更新预览矩形状态
      setPreviewRect({ x, y, width, height });
    }
  };

  // 圈选模式鼠标抬起
  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!marqueeMode || !overlayCanvasRef.current) return;

    if (readOnly) {
      setIsDrawing(false);
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
      setStartPoint(null);
      setTempRect(null);
      setPreviewRect(null);
      return;
    }

    if (isDragging && selectedRectId && tempRect) {
      // 拖动结束 - 更新实际状态
      setMarqueeRects((prev) => prev.map((rect) => (rect.id === selectedRectId ? tempRect : rect)));
      setTempRect(null);
    } else if (isResizing && selectedRectId && tempRect) {
      // 调整大小结束 - 更新实际状态
      setMarqueeRects((prev) => prev.map((rect) => (rect.id === selectedRectId ? tempRect : rect)));
      setTempRect(null);
    } else if (isDrawing && startPoint && previewRect) {
      // 绘制新矩形完成
      const { x, y, width, height } = previewRect;

      // 只有当矩形足够大时才创建
      if (width > 10 && height > 10) {
        const newRect: IMarqueeRect = {
          id: generateRectId(),
          x,
          y,
          width,
          height,
          selected: true,
        };

        setMarqueeRects((prev) => batchUpdateRectSelection([...prev, newRect], newRect.id));
        setSelectedRectId(newRect.id);

        const rectData: IMarqueeRectData = {
          id: newRect.id,
          rect: { x, y, width, height },
          selected: true,
          createdAt: new Date().toISOString(),
          label: `矩形 #${marqueeRects.length + 1}`,
          metadata: {
            area: width * height,
            aspectRatio: (width / height).toFixed(2),
            centerX: x + width / 2,
            centerY: y + height / 2,
            readOnly: false,
          },
        };
        onMarqueeOutput?.(rectData);

        console.log('Created new rectangle:', rectData);
      }
    }

    // 重置所有操作状态
    setIsDrawing(false);
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
    setStartPoint(null);
    setPreviewRect(null);
  };

  // 鼠标离开画布时清除预览
  const handleMouseLeave = () => {
    if (!marqueeMode) {
      setHoveredNode(null);
    } else {
      // 清除绘制预览
      if (isDrawing) {
        setPreviewRect(null);
      }
    }
  };

  // 清除选中状态
  const handleClearSelection = () => {
    onSelect?.(null);
    setSelectedNode(null);
    setHoveredNode(null);
    if (marqueeMode) {
      selectRectById(null);
    }
  };

  // 动态计算鼠标样式
  const getCursorStyle = () => {
    if (!marqueeMode) return 'pointer';
    if (readOnly) return 'default';
    if (isDrawing || isDragging || isResizing) return 'crosshair';
    return 'default';
  };

  return (
    <div className={styles.canvasContainer} ref={containerRef}>
      <canvas
        ref={backgroundCanvasRef}
        className={styles.backgroundCanvas}
        width={imageSize.width}
        height={imageSize.height}
      />
      <canvas
        ref={overlayCanvasRef}
        className={styles.overlayCanvas}
        width={imageSize.width}
        height={imageSize.height}
        onClick={handleCanvasClick}
        onContextMenu={marqueeMode ? handleCanvasContextMenu : undefined}
        onMouseMove={marqueeMode ? handleMouseMove : handleCanvasHover}
        onMouseDown={marqueeMode ? handleMouseDown : undefined}
        onMouseUp={marqueeMode ? handleMouseUp : undefined}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: getCursorStyle(),
        }}
      />

      {/* 右键菜单 */}
      {contextMenu.visible && marqueeMode && (
        <div
          style={{
            position: 'fixed',
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            minWidth: '120px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {!readOnly && (
            <div
              style={{
                padding: '8px 16px',
                cursor: 'pointer',
                borderBottom: '1px solid #f0f0f0',
                fontSize: '14px',
              }}
              onClick={() => {
                if (contextMenu.rectId) {
                  deleteRectById(contextMenu.rectId);
                }
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}
            >
              🗑️ 删除矩形
            </div>
          )}

          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666',
            }}
            onClick={() => {
              if (contextMenu.rectId) {
                selectRectById(contextMenu.rectId);
              }
              setContextMenu({ visible: false, x: 0, y: 0, rectId: null });
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            ℹ️ 查看信息
          </div>

          <div
            style={{
              padding: '8px 16px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
            onClick={() => {
              setContextMenu({ visible: false, x: 0, y: 0, rectId: null });
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#f5f5f5';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            ❌ 取消
          </div>

          {readOnly && (
            <div
              style={{
                padding: '8px 16px',
                fontSize: '12px',
                color: '#999',
                backgroundColor: '#f9f9f9',
                borderTop: '1px solid #f0f0f0',
              }}
            >
              📖 只读模式：无法编辑
            </div>
          )}
        </div>
      )}

      {/* 模式指示器 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          backgroundColor: marqueeMode ? styleConfig.marqueeSelectedColor : styleConfig.nodeInListColor,
          color: styleConfig.labelTextColor,
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold',
          zIndex: 100,
          pointerEvents: 'none',
          opacity: 0.9,
        }}
      >
        {marqueeMode ? '📐 圈选模式' : '🎯 节点选择'}
      </div>

      {/* 只读模式水印 */}
      {readOnly && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: styleConfig.readOnlyBackgroundColor,
            color: styleConfig.readOnlyTextColor,
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          📖 只读模式
        </div>
      )}

      {/* 绘制提示信息 */}
      {marqueeMode && isDrawing && previewRect && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 123, 255, 0.9)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          📐 正在绘制矩形: {Math.round(previewRect.width)} × {Math.round(previewRect.height)} px
        </div>
      )}

      {/* 矩形数量限制提示 */}
      {marqueeMode && marqueeRects.length >= maxRectCount && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            left: '10px',
            backgroundColor: 'rgba(255, 193, 7, 0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          ⚠️ 已达到最大矩形数量 ({maxRectCount})
        </div>
      )}

      {/* 节点选择统计信息 */}
      {!marqueeMode && selectedNodes.length > 0 && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '10px',
            backgroundColor: 'rgba(82, 196, 26, 0.9)',
            color: 'white',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          🎯 已选择 {selectedNodes.length} 个节点
        </div>
      )}

      {/* 操作提示 */}
      {marqueeMode && !readOnly && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '11px',
            lineHeight: '1.4',
            zIndex: 100,
            pointerEvents: 'none',
            maxWidth: '200px',
          }}
        >
          <div>
            <strong>操作提示:</strong>
          </div>
          <div>• 拖拽创建矩形</div>
          <div>• 点击选择矩形</div>
          <div>• 拖拽移动矩形</div>
          <div>• 拖拽角点调整大小</div>
          <div>• 右键删除矩形</div>
          <div>• ESC 取消选择</div>
        </div>
      )}

      {/* 节点选择模式操作提示 */}
      {!marqueeMode && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '10px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '11px',
            lineHeight: '1.4',
            zIndex: 100,
            pointerEvents: 'none',
            maxWidth: '200px',
          }}
        >
          <div>
            <strong>操作提示:</strong>
          </div>
          <div>• 点击节点选择</div>
          <div>• 节点自动加入列表</div>
          <div>• 点击列表项反选</div>
          <div>• 选中状态互斥显示</div>
        </div>
      )}
    </div>
  );
};

export default ElementVisualizer;
