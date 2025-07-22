import { IElementNode, ISelectedNodeData } from '../types';

// 检查节点是否包含指定位置
export const isNodeInside = (node: IElementNode, x: number, y: number): boolean => {
  if (!node?.rect) return false;
  const lx = node.rect.x;
  const ly = node.rect.y;
  const rx = node.rect.width + lx;
  const ry = node.rect.height + ly;
  return lx < x && x < rx && ly < y && y < ry;
};

// 计算节点面积
export const calculateNodeArea = (node: IElementNode): number => {
  if (!node.rect) return 0;
  return node.rect.width * node.rect.height;
};

// 根据位置查找节点
export const findNodesByPosition = (
  nodes: IElementNode[],
  pos: { x: number; y: number },
  skipTypes: string[] = ['Layout', 'Sprite'],
): IElementNode[] => {
  const activeNodes = nodes.filter((node) => {
    if (!isNodeInside(node, pos.x, pos.y)) {
      return false;
    }
    if (skipTypes.includes(node.name)) {
      return false;
    }
    return true;
  });

  activeNodes.sort((node1, node2) => {
    return calculateNodeArea(node1) - calculateNodeArea(node2);
  });

  return activeNodes;
};

// 获取最佳匹配节点
export const getBestMatchNode = (nodes: IElementNode[], x: number, y: number): IElementNode | null => {
  const matchingNodes = findNodesByPosition(nodes, { x, y });
  return matchingNodes.length > 0 ? matchingNodes[0] : null;
};

// 递归收集所有节点
export const collectNodes = (node: IElementNode, result: IElementNode[] = []): IElementNode[] => {
  result.push(node);
  if (node?.children) {
    node.children.forEach((child) => collectNodes(child, result));
  }
  return result;
};

// 将节点转换为选择数据
export const convertNodeToSelectedData = (node: IElementNode): ISelectedNodeData => {
  return {
    id: node.key,
    key: node.key,
    name: node.name,
    rect: node.rect || { x: 0, y: 0, width: 0, height: 0 },
    selected: false,
    properties: node.properties,
    selectedAt: new Date().toISOString(),
    metadata: {
      area: node.rect ? node.rect.width * node.rect.height : 0,
      aspectRatio: node.rect ? (node.rect.width / node.rect.height).toFixed(2) : '0',
    },
  };
};

// 批量更新选中状态
export const batchUpdateNodeSelection = (
  nodes: ISelectedNodeData[],
  selectedId: string | null,
): ISelectedNodeData[] => {
  return nodes.map((node) => ({
    ...node,
    selected: node.id === selectedId,
  }));
};

// 根据ID查找节点
export const findSelectedNodeById = (nodes: ISelectedNodeData[], id: string): ISelectedNodeData | null => {
  return nodes.find((node) => node.id === id) || null;
};

// 检查节点是否已经在选择列表中
export const isNodeInSelectedList = (nodes: ISelectedNodeData[], nodeKey: string): boolean => {
  return nodes.some((node) => node.id === nodeKey);
};
