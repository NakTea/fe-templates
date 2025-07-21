import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import styles from './index.module.less';

// 工具函数导入
import { getCanvasCoordinates, drawDashedRect, drawResizeHandles, drawRectLabel } from './utils/canvasUtils';
import {
  generateRectId,
  isPointInRect,
  getResizeHandle,
  constrainRect,
  convertToInternalRects,
  convertToExternalRects,
  calculateResizedRect,
  batchUpdateRectSelection,
  findRectById,
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
  // 当前高亮的节点（用于反显）
  const [highlightedNodeKey, setHighlightedNodeKey] = useState<string | null>(null);

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

  // 使用 useMemo 缓存处理后的矩形数据，避免不必要的重新计算
  const processedRects = useMemo(() => {
    if (tempRect) {
      return marqueeRects.map((rect) => (rect.id === tempRect.id ? tempRect : rect));
    }
    return marqueeRects;
  }, [marqueeRects, tempRect]);

  // 初始化矩形数据 - 优化版本
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
    }, 50), // 减少防抖时间，提高响应性
    [marqueeMode, onMarqueeListChange],
  );

  useEffect(() => {
    debouncedUpdateExternalRects(marqueeRects);
  }, [marqueeRects, debouncedUpdateExternalRects]);

  // 优化的选择矩形函数
  const selectRectById = useCallback(
    (rectId: string | null) => {
      if (selectedRectId === rectId) return; // 避免重复选择

      isUpdatingRef.current = true;

      // 批量更新选中状态
      setMarqueeRects((prev) => batchUpdateRectSelection(prev, rectId));
      setSelectedRectId(rectId);

      // 输出选中的矩形信息
      if (rectId) {
        const selectedRect = findRectById(marqueeRects, rectId);
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

      // 延迟重置更新标志
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

      // 立即绘制一次，避免延迟
      requestAnimationFrame(() => drawOverlay());
    };
  }, [imageUrl]);

  // 绘制覆盖层函数，添加节点高亮逻辑
  const drawOverlay = useCallback(() => {
    if (!overlayCanvasRef.current || !isImageLoaded) return;

    const canvas = overlayCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (marqueeMode) {
      // 圈选模式绘制逻辑保持不变
      const rectsToRender = tempRect
        ? marqueeRects.map((rect) => (rect.id === tempRect.id ? tempRect : rect))
        : marqueeRects;

      rectsToRender.forEach((rect, index) => {
        ctx.fillStyle = rect.selected ? 'rgba(24, 144, 255, 0.1)' : 'rgba(0, 123, 255, 0.05)';
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);

        ctx.strokeStyle = rect.selected ? '#ff7875' : '#1890ff';
        ctx.lineWidth = rect.selected ? 3 : 2;

        const dashArray = rect.selected ? [8, 4] : [5, 5];
        drawDashedRect(ctx, rect.x, rect.y, rect.width, rect.height, dashArray);

        if (rect.selected && !readOnly) {
          drawResizeHandles(ctx, rect.x, rect.y, rect.width, rect.height, '#ff7875');
        }

        const rectIndex = index + 1;
        const labelColor = rect.selected ? '#ff7875' : '#1890ff';
        drawRectLabel(ctx, rect.x, rect.y, `#${rectIndex}`, labelColor);

        if (readOnly && rect.selected) {
          const readOnlyX = rect.x + rect.width - 30;
          const readOnlyY = rect.y + 20;

          ctx.fillStyle = '#ff7875';
          ctx.fillRect(readOnlyX - 3, readOnlyY - 15, 28, 18);

          ctx.fillStyle = 'white';
          ctx.font = 'bold 10px Arial';
          ctx.fillText('只读', readOnlyX, readOnlyY);
        }
      });
    } else {
      // 节点选择模式：绘制节点边界
      allNodes.current?.forEach((node) => {
        if (!node?.rect) return;
        const { x, y, width, height } = node?.rect;

        const area = calculateNodeArea(node);
        const isSmallNode = area < 10000;
        const isInSelectedList = isNodeInSelectedList(selectedNodes, node.key);
        const isHighlighted = highlightedNodeKey === node.key;

        // 基础样式
        ctx.strokeStyle = isSmallNode ? '#52c41a' : '#1890ff';
        ctx.lineWidth = isSmallNode ? 2 : 1;
        ctx.setLineDash(isSmallNode ? [3, 2] : [5, 3]);

        // 悬停效果
        if (hoveredNode?.key === node.key) {
          ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
          ctx.fillRect(x, y, width, height);
        }

        // 当前选中节点
        if (selectedNode?.key === node.key) {
          ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
          ctx.fillRect(x, y, width, height);
          ctx.strokeStyle = '#ff4d4f';
          ctx.lineWidth = 3;
        }

        // 在选择列表中的节点
        if (isInSelectedList) {
          ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
          ctx.fillRect(x, y, width, height);
          // ctx.strokeStyle = '#52c41a';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
        }

        // 从列表中选中的节点（高亮显示）
        if (isHighlighted) {
          ctx.fillStyle = 'rgba(255, 2555, 0, 0.2)';
          ctx.fillRect(x, y, width, height);
          ctx.strokeStyle = '#ff4d4f';
          ctx.lineWidth = 4;
          ctx.setLineDash([6, 2]);
        }

        ctx.strokeRect(x, y, width, height);
        ctx.setLineDash([]);

        // 绘制节点标签（仅对选择列表中的节点）
        if (isInSelectedList) {
          const nodeIndex = selectedNodes.findIndex((n) => n.key === node.key) + 1;
          const labelColor = isHighlighted ? '#52c41a' : '#73c0de';
          drawRectLabel(ctx, x, y, `N${nodeIndex}`, labelColor);
        }
      });
    }
  }, [
    selectedNode,
    hoveredNode,
    isImageLoaded,
    marqueeMode,
    marqueeRects,
    tempRect,
    readOnly,
    selectedNodes,
    highlightedNodeKey,
  ]);

  // 优化的重绘逻辑
  useEffect(() => {
    // 取消之前的动画帧
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const needsAnimation = marqueeMode || hoveredNode || selectedNode || isDragging || isResizing;

    if (needsAnimation) {
      const animate = () => {
        drawOverlay();
        if (needsAnimation) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // 静态渲染
      requestAnimationFrame(() => drawOverlay());
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [drawOverlay, marqueeMode, hoveredNode, selectedNode, isDragging, isResizing]);

  // 鼠标事件处理 - 优化版本
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
      // 节点选择模式
      const clickedNode = getBestMatchNode(allNodes.current, coords.x, coords.y);

      if (clickedNode) {
        setSelectedNode(clickedNode);
        onSelect?.(clickedNode);

        // 如果节点不在选择列表中且不是只读模式，添加到列表
        if (!readOnly && !isNodeInSelectedList(selectedNodes, clickedNode.key)) {
          const nodeData = convertNodeToSelectedData(clickedNode);
          const updatedNodes = batchUpdateNodeSelection([...selectedNodes, nodeData], nodeData.id);
          onSelectedNodesChange?.(updatedNodes);
          onNodeOutput?.(nodeData);
        } else {
          // 如果节点已在列表中，选中它
          const existingNode = findSelectedNodeById(selectedNodes, clickedNode.key);
          if (existingNode) {
            const updatedNodes = batchUpdateNodeSelection(selectedNodes, existingNode.id);
            onSelectedNodesChange?.(updatedNodes);
            onNodeOutput?.(existingNode);
          }
        }

        console.log('Selected node:', clickedNode);
      } else {
        setSelectedNode(null);
        // 取消所有节点选中
        if (selectedNodes.length > 0) {
          const updatedNodes = batchUpdateNodeSelection(selectedNodes, null);
          onSelectedNodesChange?.(updatedNodes);
        }
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

    if (marqueeRects.length < maxRectCount) {
      setIsDrawing(true);
      setStartPoint(coords);
    }
  };

  // 圈选模式鼠标移动
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!marqueeMode || !overlayCanvasRef.current) return;

    const coords = getCanvasCoordinates(e, overlayCanvasRef.current);

    if (readOnly) return;

    if (isDragging && selectedRectId && tempRect) {
      let newX = coords.x - dragOffset.x;
      let newY = coords.y - dragOffset.y;

      newX = Math.max(0, Math.min(newX, imageSize.width - tempRect.width));
      newY = Math.max(0, Math.min(newY, imageSize.height - tempRect.height));

      setTempRect((prev) => (prev ? { ...prev, x: newX, y: newY } : null));
    } else if (isResizing && selectedRectId && resizeHandle && tempRect) {
      const updates = calculateResizedRect(tempRect, resizeHandle, coords.x, coords.y);
      const newRect = constrainRect({ ...tempRect, ...updates }, imageSize.width, imageSize.height);
      setTempRect(newRect);
    } else if (isDrawing && startPoint) {
      // 直接触发重绘，不需要额外的 drawOverlay 调用
      // 因为 useEffect 中的动画循环会自动处理
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
      return;
    }

    if (isDragging && selectedRectId && tempRect) {
      setMarqueeRects((prev) => prev.map((rect) => (rect.id === selectedRectId ? tempRect : rect)));
      setTempRect(null);
    } else if (isResizing && selectedRectId && tempRect) {
      setMarqueeRects((prev) => prev.map((rect) => (rect.id === selectedRectId ? tempRect : rect)));
      setTempRect(null);
    } else if (isDrawing && startPoint) {
      const coords = getCanvasCoordinates(e, overlayCanvasRef.current);

      const x = Math.min(startPoint.x, coords.x);
      const y = Math.min(startPoint.y, coords.y);
      const width = Math.abs(coords.x - startPoint.x);
      const height = Math.abs(coords.y - startPoint.y);

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
      }
    }

    setIsDrawing(false);
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
    setStartPoint(null);
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

  useEffect(() => {
    const selectedNode = selectedNodes.find((node) => node.selected);
    setHighlightedNodeKey(selectedNode ? selectedNode.key : null);
  }, [selectedNodes]);

  // 暴露选择矩形的方法给外部调用
  useEffect(() => {
    // 如果组件需要支持外部调用选择矩形的功能
    // 可以通过 ref 或者其他方式暴露 selectRectById 方法
  }, [selectRectById]);

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
        onMouseLeave={() => {
          if (!marqueeMode) {
            setHoveredNode(null);
          }
        }}
        style={{
          cursor: getCursorStyle(),
        }}
      />

      {/* 现有的右键菜单和只读模式水印保持不变 */}
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

      {readOnly && marqueeMode && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(255, 120, 117, 0.9)',
            color: 'white',
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

      {/* 新增：节点选择模式提示 */}
      {!marqueeMode && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            backgroundColor: 'rgba(82, 196, 26, 0.9)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 100,
            pointerEvents: 'none',
          }}
        >
          🎯 节点选择模式
        </div>
      )}
    </div>
  );
};

export default ElementVisualizer;
