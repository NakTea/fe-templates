import React from 'react';
import { Image, ImageStyle, ScrollView, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import { useFlexUIConfig } from '../provider/useFlexUIConfig';
import { getParseWidth } from '../utils';
import { IconFont } from './Icon';

// 定义列类型
type ColumnType = 'text' | 'image' | 'icon';

// 扩展列定义接口，支持复杂表头
interface ITableColumn {
  title: string;
  dataIndex?: string; // 对于分组列可能没有dataIndex
  width?: number | string;
  type?: ColumnType;
  imageStyle?: ImageStyle;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  children?: ITableColumn[]; // 子列，用于复杂表头
  colSpan?: number; // 列跨度
  rowSpan?: number; // 行跨度
}

interface ITableProps {
  dataSource: { [key: string]: any }[];
  columns: ITableColumn[];
  tableKey?: string;
  showHorizontalLines?: boolean;
  showVerticalLines?: boolean;
  containerBorder?: boolean;
  headerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  cellStyle?: ViewStyle;
  cellTextStyle?: TextStyle;
  borderColor?: string;
  borderWidth?: number;
  textAlign?: 'flex-start' | 'flex-end' | 'center';
  containerWidth?: number;
}

const Table: React.FC<ITableProps> = ({
  dataSource,
  columns,
  tableKey,
  showHorizontalLines = true,
  showVerticalLines = true,
  containerBorder = true,
  headerStyle = {},
  headerTextStyle = {},
  cellStyle = {},
  cellTextStyle = {},
  borderColor,
  borderWidth = 1,
  containerWidth = 300,
}) => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { table } = components;
  const {
    tableRadius,
    tableBorderColor,
    tableBgColor,
    headerBgColor,
    hedaderFont,
    cellPaddingHorizontal,
    cellPaddingVertical,
    cellFont,
    cellImgRadius,
    textAlign = 'flex-start',
  } = table;

  const styles = StyleSheet.create({
    container: {
      borderWidth: containerBorder ? borderWidth : 0,
      borderColor: tableBorderColor,
      backgroundColor: tableBgColor,
      borderRadius: tableRadius,
      overflow: 'hidden',
      flex: 1,
    },
    row: {
      flexDirection: 'row',
    },
    headerRow: {
      backgroundColor: headerBgColor,
      position: 'sticky',
      top: 0,
      zIndex: 1,
    },
    headerCell: {
      ...headerStyle,
    },
    // 简单表头单元格
    simpleHeaderCell: {
      paddingHorizontal: cellPaddingHorizontal,
      paddingVertical: cellPaddingVertical,
      justifyContent: 'center',
      alignItems: textAlign,
    },
    // 复杂表头容器
    complexHeaderCell: {
      flexDirection: 'column',
    },
    // 复杂表头父级标题
    complexHeaderTitle: {
      paddingHorizontal: cellPaddingHorizontal,
      paddingTop: cellPaddingVertical,
      paddingBottom: cellPaddingVertical / 2,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: borderWidth,
      borderBottomColor: borderColor || tableBorderColor,
    },
    // 复杂表头子级容器
    complexHeaderChildren: {
      flexDirection: 'row',
      flex: 1,
    },
    // 复杂表头子级单元格
    complexHeaderChildCell: {
      flex: 1,
      paddingHorizontal: cellPaddingHorizontal / 2,
      paddingTop: cellPaddingVertical / 2,
      paddingBottom: cellPaddingVertical,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      ...hedaderFont,
      ...headerTextStyle,
    },
    cell: {
      paddingHorizontal: cellPaddingHorizontal,
      paddingVertical: cellPaddingVertical,
      justifyContent: 'center',
      alignItems: textAlign,
      ...cellStyle,
    },
    cellText: {
      ...cellFont,
      ...cellTextStyle,
    },
    cellImage: {
      width: '100%',
      maxWidth: '100%',
      height: 48,
      maxHeight: '100%',
      borderRadius: cellImgRadius,
    },
    verticalDivider: {
      width: borderWidth,
      backgroundColor: borderColor || tableBorderColor,
    },
  });

  // 获取所有叶子节点列（实际数据列）
  const getLeafColumns = (cols: ITableColumn[]): ITableColumn[] => {
    const leafColumns: ITableColumn[] = [];

    const traverse = (columns: ITableColumn[]) => {
      columns.forEach(col => {
        if (col.children && col.children.length > 0) {
          traverse(col.children);
        } else {
          leafColumns.push(col);
        }
      });
    };

    traverse(cols);
    return leafColumns;
  };

  // 递归渲染表头单元格
  const renderHeaderCell = (column: ITableColumn, width: number): React.ReactNode => {
    // 如果没有子列，渲染简单表头
    if (!column.children || column.children.length === 0) {
      return (
        <View style={[styles.headerCell, styles.simpleHeaderCell, { width }]}>
          <Text style={[styles.headerText, headerTextStyle]}>{column.title}</Text>
        </View>
      );
    }

    // 有子列，渲染复杂表头
    return (
      <View style={[styles.headerCell, styles.complexHeaderCell, { width }]}>
        {/* 父级标题 */}
        <View style={styles.complexHeaderTitle}>
          <Text style={[styles.headerText, headerTextStyle]}>{column.title}</Text>
        </View>

        {/* 子级标题行 */}
        <View style={styles.complexHeaderChildren}>
          {column.children.map((child, childIndex) => (
            <React.Fragment key={`child-${childIndex}`}>
              {/* 递归渲染子级 */}
              <View style={styles.complexHeaderChildCell}>{renderChildHeaderContent(child)}</View>

              {/* 子级之间的垂直分割线 */}
              {showVerticalLines && childIndex !== column.children!.length - 1 && (
                <View style={styles.verticalDivider} />
              )}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  };

  // 渲染子级表头内容（支持进一步嵌套）
  const renderChildHeaderContent = (child: ITableColumn): React.ReactNode => {
    // 如果子级还有children，继续递归
    if (child.children && child.children.length > 0) {
      return (
        <View style={{ flex: 1 }}>
          {/* 子级标题 */}
          <View style={[styles.complexHeaderTitle, { borderBottomWidth: borderWidth / 2 }]}>
            <Text style={[styles.headerText, headerTextStyle, { fontSize: (headerTextStyle.fontSize || 14) * 0.9 }]}>
              {child.title}
            </Text>
          </View>

          {/* 子级的子级 */}
          <View style={styles.complexHeaderChildren}>
            {child.children.map((grandChild, grandChildIndex) => (
              <React.Fragment key={`grandchild-${grandChildIndex}`}>
                <View style={[styles.complexHeaderChildCell, { paddingVertical: cellPaddingVertical / 3 }]}>
                  <Text
                    style={[styles.headerText, headerTextStyle, { fontSize: (headerTextStyle.fontSize || 14) * 0.8 }]}>
                    {grandChild.title}
                  </Text>
                </View>
                {showVerticalLines && grandChildIndex !== child.children!.length - 1 && (
                  <View style={[styles.verticalDivider, { height: '50%' }]} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      );
    }

    // 普通子级
    return <Text style={[styles.headerText, headerTextStyle]}>{child.title}</Text>;
  };

  // 计算列宽度
  const getColumnWidth = (column: ITableColumn): number => {
    if (column.children && column.children.length > 0) {
      // 如果有子列，宽度是所有子列宽度之和
      return column.children.reduce((total, child) => {
        return total + getColumnWidth(child);
      }, 0);
    }
    return getParseWidth(column.width, containerWidth, 100);
  };

  // 渲染单元格内容
  const renderCellContent = (column: ITableColumn, value: any) => {
    switch (column.type) {
      case 'image':
        return <Image source={{ uri: value }} style={[styles.cellImage, column.imageStyle]} resizeMode="contain" />;
      case 'icon':
        return <IconFont name={value || column.iconName} size={column.iconSize || 24} color={column.iconColor} />;
      case 'text':
      default:
        return <Text style={[styles.cellText, cellTextStyle]}>{value || ''}</Text>;
    }
  };

  // 计算最后一列的宽度
  const getLastWidh = (val: number) => {
    let allWidth = 0;
    const leafColumns = getLeafColumns(columns);
    leafColumns?.forEach(item => {
      allWidth += getParseWidth(item.width, containerWidth, 100);
    });
    if (allWidth > containerWidth) {
      return val;
    } else {
      return val + (containerWidth - allWidth);
    }
  };

  const leafColumns = getLeafColumns(columns);

  return (
    <ScrollView horizontal nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {/* 表头 - 单行，内部嵌套children */}
        <View
          style={[
            styles.row,
            styles.headerRow,
            showHorizontalLines
              ? { borderBottomWidth: borderWidth, borderColor: borderColor || tableBorderColor }
              : { borderBottomWidth: 0 },
          ]}>
          {columns?.map((column, columnIndex) => {
            const width =
              columnIndex === columns.length - 1 ? getLastWidh(getColumnWidth(column)) : getColumnWidth(column);

            return (
              <React.Fragment key={`header-${columnIndex}`}>
                {renderHeaderCell(column, width)}
                {/* 列之间的垂直分割线 */}
                {showVerticalLines && columnIndex !== columns.length - 1 && <View style={styles.verticalDivider} />}
              </React.Fragment>
            );
          })}
        </View>

        <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false}>
          {/* 表格内容 */}
          {dataSource?.map((record, rowIndex) => (
            <View
              key={`${rowIndex}-${tableKey ? record?.[tableKey] : ''}`}
              style={[
                styles.row,
                showHorizontalLines &&
                  rowIndex !== dataSource?.length - 1 && {
                    borderBottomWidth: borderWidth,
                    borderColor: borderColor || tableBorderColor,
                  },
              ]}>
              {leafColumns?.map((column, columnIndex) => (
                <React.Fragment key={`${rowIndex}-${columnIndex}`}>
                  <View
                    style={[
                      styles.cell,
                      {
                        width:
                          columnIndex === leafColumns.length - 1
                            ? getLastWidh(getParseWidth(column.width, containerWidth))
                            : getParseWidth(column.width, containerWidth),
                      },
                    ]}>
                    {renderCellContent(column, record[column.dataIndex || ''])}
                  </View>
                  {/* 垂直分割线 */}
                  {showVerticalLines && columnIndex !== leafColumns.length - 1 && (
                    <View style={styles.verticalDivider} />
                  )}
                </React.Fragment>
              ))}
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Table;
