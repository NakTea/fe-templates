import React from 'react';
import { StyleSheet, Text } from 'react-native';
import CardContainer from '../basic/CardContainer';
import Table from '../basic/Table';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';

type TData = {
  title?: string;
  tableKey?: string;
  columns?: {
    title: string;
    dataIndex: string;
    width?: number;
    type?: 'text' | 'image' | 'icon';
    imageStyle?: {
      width?: number;
      height?: number;
      borderRadius?: number;
    };
  }[];
  dataSource?: Record<string, any>[];
};

interface IProps {
  data?: TData;
  opts?: {
    width?: string | number;
    maxHeight?: string | number;
  };
}

const KnowledgeImageTextTable: React.FC<IProps> = ({ data, opts }) => {
  const { theme } = useFlexUIConfig();
  const { system, components } = theme || {};

  // 安全解构 - opts
  const { width = 440, maxHeight = 376 } = opts || {};

  // 安全解构 - data
  const { title, tableKey, columns, dataSource } = data || {};

  // Token解构
  const { cnHeadlineXsStrong, textTitle, spaceElementsM, radiusImageS } = system || {};

  const { cardContainer } = components || {};
  const { cardContainerLeftAndRightPadding = 24 } = cardContainer || {};

  // 计算表格宽度
  const tableWidth = typeof width === 'number' ? width - cardContainerLeftAndRightPadding * 2 : 300;

  // 处理表格列配置，为图片列添加默认样式
  const processedColumns = columns?.map(column => {
    if (column.type === 'image') {
      return {
        ...column,
        imageStyle: {
          width: 32,
          height: 32,
          borderRadius: radiusImageS,
          ...column.imageStyle,
        },
      };
    }
    return column;
  });

  const styles = StyleSheet.create({
    title: {
      ...cnHeadlineXsStrong,
      color: textTitle,
    },
  });

  return (
    <CardContainer
      width={width}
      maxHeight={maxHeight}
      style={{
        gap: spaceElementsM,
      }}>
      {title && <Text style={styles.title}>{title}</Text>}

      {processedColumns && dataSource && (
        <Table
          containerWidth={tableWidth - (processedColumns.length - 1)}
          tableKey={tableKey}
          columns={processedColumns}
          dataSource={dataSource}
          showHorizontalLines={true}
          showVerticalLines={true}
        />
      )}
    </CardContainer>
  );
};

export default KnowledgeImageTextTable;
