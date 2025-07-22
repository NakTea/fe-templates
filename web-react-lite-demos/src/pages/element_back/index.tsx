import React, { Fragment, useState, useCallback, useRef } from 'react';
import ElementVisualizer from './ElementVisualizer';
import mockData from './hierarchy.json';
import { IMarqueeRectData, ISelectedNodeData } from './ElementVisualizer/types';

// 定义模式枚举
enum CanvasMode {
  SELECT = 'select',
  DRAW = 'draw',
}

interface IImageMarkerProps {
  imageUrl: string;
  xmlData?: any;
  canvasMode: CanvasMode;
  onSelect?: (node: any | null) => void;
  initialMarqueeRects?: IMarqueeRectData[];
  onMarqueeListChange?: (rects: IMarqueeRectData[]) => void;
  readOnly?: boolean;
  initialSelectedNodes?: ISelectedNodeData[];
  onSelectedNodesChange?: (nodes: ISelectedNodeData[]) => void;
  onNodeOutput?: (node: ISelectedNodeData) => void;
}

const ImageMarker: React.FC<IImageMarkerProps> = ({
  imageUrl = 'http://localhost:7060/screenshot-2.png',
  xmlData = mockData,
  canvasMode,
  onSelect,
  initialMarqueeRects = [],
  onMarqueeListChange,
  readOnly = false,
  initialSelectedNodes = [],
  onSelectedNodesChange,
  onNodeOutput,
}) => {
  const [annotationData, setAnnotationData] = useState();
  const [marqueeMode, setMarqueeMode] = useState(false);
  const [maxRectCount, setMaxRectCount] = useState(5);
  const [marqueeRects, setMarqueeRects] = useState<IMarqueeRectData[]>(initialMarqueeRects);
  const [selectedNodes, setSelectedNodes] = useState<ISelectedNodeData[]>(initialSelectedNodes);

  // 防止重复更新的标志
  const isUpdatingRef = useRef(false);
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleAnnotationChange = (data) => {
    setAnnotationData(data);
    console.log('data', data);
  };

  // 圈选矩形输出回调
  const handleMarqueeOutput = (rectData: IMarqueeRectData) => {
    console.log('Selected marquee rect:', rectData);
  };

  // 圈选矩形列表变化回调
  const handleMarqueeListChange = useCallback(
    (rects: IMarqueeRectData[]) => {
      if (isUpdatingRef.current) return;

      isUpdatingRef.current = true;
      setMarqueeRects(rects);
      onMarqueeListChange?.(rects);

      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    },
    [onMarqueeListChange],
  );

  // 选中节点列表变化回调
  const handleSelectedNodesChange = useCallback(
    (nodes: ISelectedNodeData[]) => {
      if (isUpdatingRef.current) return;

      isUpdatingRef.current = true;
      setSelectedNodes(nodes);
      onSelectedNodesChange?.(nodes);

      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 100);
    },
    [onSelectedNodesChange],
  );

  // 节点输出回调
  const handleNodeOutput = useCallback(
    (node: ISelectedNodeData) => {
      console.log('Selected node:', node);
      onNodeOutput?.(node);
    },
    [onNodeOutput],
  );

  // 圈选矩形删除回调
  const handleMarqueeDelete = (rectId: string) => {
    console.log('Deleted marquee rect:', rectId);
  };

  // 列表项点击处理（圈选矩形）
  const handleMarqueeListItemClick = useCallback(
    (rectData: IMarqueeRectData) => {
      if (isUpdatingRef.current) return;

      isUpdatingRef.current = true;

      const updatedRects = marqueeRects.map((rect) => ({
        ...rect,
        selected: rect.id === rectData.id,
      }));

      setMarqueeRects(updatedRects);
      handleMarqueeListChange(updatedRects);
      handleMarqueeOutput(rectData);

      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    },
    [marqueeRects, handleMarqueeListChange, handleMarqueeOutput],
  );

  // 列表项点击处理（选中节点）
  const handleNodeListItemClick = useCallback(
    (nodeData: ISelectedNodeData) => {
      if (isUpdatingRef.current) return;

      isUpdatingRef.current = true;

      const updatedNodes = selectedNodes.map((node) => ({
        ...node,
        selected: node.id === nodeData.id,
      }));

      setSelectedNodes(updatedNodes);
      handleSelectedNodesChange(updatedNodes);
      handleNodeOutput(nodeData);

      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 50);
    },
    [selectedNodes, handleSelectedNodesChange, handleNodeOutput],
  );

  // 删除选中的节点
  const handleDeleteSelectedNode = useCallback(
    (nodeId: string) => {
      const updatedNodes = selectedNodes.filter((node) => node.id !== nodeId);
      setSelectedNodes(updatedNodes);
      handleSelectedNodesChange(updatedNodes);
    },
    [selectedNodes, handleSelectedNodesChange],
  );

  // 清理函数
  React.useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Fragment>
      <div style={{ display: 'flex', height: '100vh' }}>
        {/* 主画布区域 */}
        <div style={{ flex: 1 }}>
          <ElementVisualizer
            imageUrl={imageUrl}
            xmlData={xmlData}
            onSelect={onSelect}
            marqueeMode={marqueeMode}
            maxRectCount={maxRectCount}
            initialMarqueeRects={marqueeRects}
            onMarqueeOutput={handleMarqueeOutput}
            onMarqueeListChange={handleMarqueeListChange}
            onMarqueeDelete={handleMarqueeDelete}
            readOnly={readOnly}
            selectedNodes={selectedNodes}
            onSelectedNodesChange={handleSelectedNodesChange}
            onNodeOutput={handleNodeOutput}
          />
        </div>

        {/* 右侧信息面板 - 常驻显示 */}
        <div
          style={{
            width: '320px',
            borderLeft: '1px solid #e8e8e8',
            padding: '16px',
            backgroundColor: '#fafafa',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* 模式切换按钮 */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => setMarqueeMode(!marqueeMode)}
              disabled={readOnly && !marqueeMode}
              style={{
                width: '100%',
                padding: '8px 16px',
                backgroundColor: readOnly && !marqueeMode ? '#d9d9d9' : marqueeMode ? '#ff4d4f' : '#1890ff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: readOnly && !marqueeMode ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
            >
              {marqueeMode ? '🎯 切换到节点选择模式' : '📐 切换到圈选模式'}
            </button>
          </div>

          {/* 圈选模式面板 */}
          {marqueeMode ? (
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>📐 圈选矩形 ({marqueeRects.length})</h3>
                {readOnly && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#999',
                      backgroundColor: '#f0f0f0',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    只读
                  </span>
                )}
              </div>

              {marqueeRects.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#999',
                    padding: '40px 0',
                    fontSize: '14px',
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📐</div>
                  <div>暂无圈选矩形</div>
                  <div style={{ fontSize: '12px', marginTop: '8px' }}>
                    {readOnly ? '只读模式下无法创建矩形' : '在画布上拖拽创建矩形'}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {marqueeRects.map((rectData, index) => (
                    <div
                      key={`${rectData.id}-${rectData.selected}`}
                      style={{
                        border: rectData.selected ? '2px solid #1890ff' : '1px solid #d9d9d9',
                        borderRadius: '6px',
                        padding: '12px',
                        backgroundColor: rectData.selected ? '#f6ffed' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        opacity: readOnly ? 0.8 : 1,
                        transform: rectData.selected ? 'scale(1.02)' : 'scale(1)',
                      }}
                      onClick={() => handleMarqueeListItemClick(rectData)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: rectData.selected ? '#1890ff' : '#333',
                          }}
                        >
                          📐 矩形 #{index + 1}
                        </div>
                        <div
                          style={{
                            fontSize: '12px',
                            color: rectData.selected ? '#1890ff' : '#999',
                            fontWeight: rectData.selected ? 'bold' : 'normal',
                          }}
                        >
                          {rectData.selected ? '✓ 已选中' : ''}
                        </div>
                      </div>

                      <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                        <div>
                          <strong>坐标:</strong> ({rectData.rect.x}, {rectData.rect.y})
                        </div>
                        <div>
                          <strong>尺寸:</strong> {rectData.rect.width} × {rectData.rect.height}
                        </div>
                        <div>
                          <strong>面积:</strong> {rectData.rect.width * rectData.rect.height} px²
                        </div>

                        {rectData.metadata && Object.keys(rectData.metadata).length > 0 && (
                          <div style={{ marginTop: '6px' }}>
                            <strong>附加信息:</strong>
                            {Object.entries(rectData.metadata).map(([key, value]) => (
                              <div key={key} style={{ marginLeft: '8px', fontSize: '11px' }}>
                                • {key}: {String(value)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 圈选模式控制按钮 */}
              {marqueeRects.length > 0 && !readOnly && (
                <div style={{ marginTop: '16px' }}>
                  <button
                    onClick={() => {
                      setMarqueeRects([]);
                      handleMarqueeListChange([]);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      backgroundColor: '#ff7875',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                  >
                    🗑️ 清空所有矩形
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* 节点选择模式面板 */
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '16px',
                }}
              >
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>
                  🎯 选中节点 ({selectedNodes.length})
                </h3>
              </div>

              {selectedNodes.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    color: '#999',
                    padding: '40px 0',
                    fontSize: '14px',
                  }}
                >
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
                  <div>暂无选中节点</div>
                  <div style={{ fontSize: '12px', marginTop: '8px' }}>点击画布上的元素来选择节点</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedNodes.map((nodeData, index) => (
                    <div
                      key={`${nodeData.id}-${nodeData.selected}`}
                      style={{
                        border: nodeData.selected ? '2px solid #52c41a' : '1px solid #d9d9d9',
                        borderRadius: '6px',
                        padding: '12px',
                        backgroundColor: nodeData.selected ? '#f6ffed' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        transform: nodeData.selected ? 'scale(1.02)' : 'scale(1)',
                      }}
                      onClick={() => handleNodeListItemClick(nodeData)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '8px',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '14px',
                            fontWeight: 'bold',
                            color: nodeData.selected ? '#52c41a' : '#333',
                          }}
                        >
                          🎯 {nodeData.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div
                            style={{
                              fontSize: '12px',
                              color: nodeData.selected ? '#52c41a' : '#999',
                              fontWeight: nodeData.selected ? 'bold' : 'normal',
                            }}
                          >
                            {nodeData.selected ? '✓' : ''}
                          </div>
                          {!readOnly && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSelectedNode(nodeData.id);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#ff4d4f',
                                cursor: 'pointer',
                                fontSize: '14px',
                                padding: '2px',
                                borderRadius: '2px',
                              }}
                              title="删除节点"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      </div>

                      <div style={{ fontSize: '12px', color: '#666', lineHeight: '1.4' }}>
                        <div>
                          <strong>ID:</strong> {nodeData.key}
                        </div>
                        <div>
                          <strong>坐标:</strong> ({nodeData.rect.x}, {nodeData.rect.y})
                        </div>
                        <div>
                          <strong>尺寸:</strong> {nodeData.rect.width} × {nodeData.rect.height}
                        </div>
                        <div>
                          <strong>面积:</strong> {nodeData.metadata?.area} px²
                        </div>

                        {nodeData.selectedAt && (
                          <div>
                            <strong>选择时间:</strong> {new Date(nodeData.selectedAt).toLocaleTimeString()}
                          </div>
                        )}

                        {nodeData.properties && Object.keys(nodeData.properties).length > 0 && (
                          <div style={{ marginTop: '6px' }}>
                            <strong>属性:</strong>
                            <div style={{ maxHeight: '100px', overflow: 'auto', marginTop: '4px' }}>
                              {Object.entries(nodeData.properties)
                                .slice(0, 3)
                                .map(([key, value]) => (
                                  <div key={key} style={{ marginLeft: '8px', fontSize: '11px' }}>
                                    • {key}: {String(value).substring(0, 20)}
                                    {String(value).length > 20 ? '...' : ''}
                                  </div>
                                ))}
                              {Object.keys(nodeData.properties).length > 3 && (
                                <div style={{ marginLeft: '8px', fontSize: '11px', color: '#999' }}>
                                  ... 还有 {Object.keys(nodeData.properties).length - 3} 个属性
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 节点选择模式控制按钮 */}
              {selectedNodes.length > 0 && !readOnly && (
                <div style={{ marginTop: '16px' }}>
                  <button
                    onClick={() => {
                      setSelectedNodes([]);
                      handleSelectedNodesChange([]);
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      backgroundColor: '#ff7875',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s',
                    }}
                  >
                    🗑️ 清空所有节点
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 只读模式提示 */}
          {readOnly && (
            <div
              style={{
                marginTop: '16px',
                padding: '12px',
                backgroundColor: '#fff7e6',
                border: '1px solid #ffd591',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#d48806',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>📖 只读模式说明：</div>
              <div>• 可以选中和查看信息</div>
              <div>• 不能编辑或删除</div>
              {marqueeMode ? <div>• 不能移动或调整矩形</div> : <div>• 不能添加新的节点到列表</div>}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ImageMarker;
