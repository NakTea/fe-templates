export interface IImageMarkerProps {
  imageUrl: string;
  xmlData?: any;
  canvasMode: string;
  onSelect?: (node: any | null) => void;
  initialMarqueeRects?: IMarqueeRectData[];
  onMarqueeListChange?: (rects: IMarqueeRectData[]) => void;
  readOnly?: boolean;
  // 新增节点选择相关
  initialSelectedNodes?: ISelectedNodeData[];
  onSelectedNodesChange?: (nodes: ISelectedNodeData[]) => void;
  onNodeOutput?: (node: ISelectedNodeData) => void;
}

export interface IElementVisualizerProps {
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
  // 新增节点选择相关
  selectedNodes?: ISelectedNodeData[];
  onSelectedNodesChange?: (nodes: ISelectedNodeData[]) => void;
  onNodeOutput?: (node: ISelectedNodeData) => void;
}
export interface IElementNode {
  key: string;
  name: string;
  bounds: number[] | null;
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
  properties: Record<string, string>;
  children?: IElementNode[];
}

export interface IMarqueeRectData {
  id: string;
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  selected: boolean;
  label?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
  metadata?: Record<string, any>;
}

export interface IMarqueeRect {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  selected: boolean;
}

export interface IContextMenu {
  visible: boolean;
  x: number;
  y: number;
  rectId: string | null;
}

// 扩展现有类型定义
export interface ISelectedNodeData {
  id: string; // 使用节点的 key 作为 id
  key: string;
  name: string;
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  selected: boolean;
  properties: Record<string, string>;
  selectedAt?: string; // 选择时间
  metadata?: {
    area: number;
    aspectRatio: string;
    [key: string]: any;
  };
}
