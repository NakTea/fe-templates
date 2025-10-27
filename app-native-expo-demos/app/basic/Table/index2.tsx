import React from 'react';
import { ScrollView } from 'react-native';
import Table, { ITableDataItem, processMergedData } from '../../components/basic/Table';

const App = () => {
  const data2 = {
    data: {
      title: '车辆部件状态检查表',
      columns: [
        {
          title: '第1列',
          dataIndex: 'col1',
          width: 120,
        },
        {
          title: '第2列',
          dataIndex: 'col2',
          width: 100,
        },
        {
          title: '第3列',
          dataIndex: 'col3',
          width: 100,
        },
        {
          title: '第4列',
          children: [
            {
              title: '第4-1列',
              dataIndex: 'col4',
              width: 120,
            },
            {
              title: '第4-2列',
              dataIndex: 'col5',
              width: 120,
            },
          ],
        },
      ],
      dataSource: [
        {
          id: '1',
          col1: '表格内容1',
          col2: '表格内容\n表格内容1',
          col3: '表格内容\n表格内容1',
          col4: '表格内容1',
          col5: '-',
        },
        {
          id: '2',
          col1: '表格内容2',
          col2: '表格内容\n表格内容2',
          col3: '表格内容\n表格内容2',
          col4: '表格内容2',
          col5: '表格内容2',
        },
        {
          id: '3',
          col1: '333-1',
          col2: '表格内容3-2',
          col3: '表格内容3-3',
          col4: '表格内容3-4',
          col5: '表格内容3-5',
        },
      ],
    },
  };

  // 合并处理函数
  const handleMergeCell = (dataSource: ITableDataItem[]): ITableDataItem[] => {
    return processMergedData(dataSource, [
      // {
      //   dataIndex: 'col1', // 第一列
      //   startRow: 0, // 从第1行开始（索引0）
      //   endRow: 1, // 到第3行结束（索引2）
      // },
      // 可以添加更多合并规则
      {
        dataIndex: 'col2',
        startRow: 0,
        endRow: 1,
      },
    ]);
  };

  return (
    <ScrollView style={{ padding: 16, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
      <Table
        columns={data2.data.columns}
        dataSource={data2.data.dataSource}
        showHorizontalLines={true}
        showVerticalLines={true}
        containerBorder={true}
        borderColor="#E5E5E5"
        borderWidth={1}
        onMergeCell={handleMergeCell}
        // headerStyle={{
        //   backgroundColor: '#F5F5F5',
        // }}
        // headerTextStyle={{
        //   fontWeight: 'bold',
        // }}
        // cellStyle={{
        //   padding: 12,
        // }}
      />
    </ScrollView>
  );
};

export default App;
