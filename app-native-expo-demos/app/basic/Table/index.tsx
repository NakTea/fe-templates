import React from 'react';
import { ScrollView } from 'react-native';
import Table from '../../components/basic/Table';

const App = () => {
  const data2 = {
    data: {
      title: '车辆部件状态检查表',
      columns: [
        {
          title: '部件名称',
          dataIndex: 'name',
          width: '20%',
        },
        {
          title: '检查状态',
          dataIndex: 'status',
          width: '20%',
        },
        {
          title: '部件图示',
          dataIndex: 'image',
          type: 'image',
          width: '20%',
          imageStyle: { width: 60, height: 35 },
        },
        {
          width: '60%',
          title: '注意事项',
          dataIndex: 'description',
        },
      ],
      dataSource: [
        {
          name: '制动系统',
          status: '✔',
          image: 'https://picsum.photos/240/136',
          description: '制动系统工作正常',
        },
        {
          name: '发动机',
          status: '⚠',
          image: 'https://picsum.photos/240/136',
          description: '需要定期检查机油',
        },
        {
          name: '轮胎',
          status: '×',
          image: 'https://picsum.photos/240/136',
          description:
            '胎压过低，请及时充气胎压过低，请及时充气胎压过低，请及时充气胎压过低，请及时充气胎压过低，请及时充气',
        },
      ],
    },
  };

  const columns = [
    {
      title: '图标',
      dataIndex: 'icon',
      width: 80,
      type: 'image',
      imageStyle: { width: 40, height: 40 },
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      type: 'text',
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 60,
      type: 'icon',
      iconName: 'tips',
      iconSize: 20,
      // iconColor: '#1890ff',
    },
    {
      title: '说明',
      with: 60,
      dataIndex: 'description',
      type: 'text',
    },
  ];

  const dataSource = [
    {
      icon: 'https://picsum.photos/240/136',
      status: '点亮',
      action: 'cardInfo',
      description: '满足 ACC条件时显示',
    },
    {
      icon: 'https://picsum.photos/240/136',
      status: '点亮',
      action: 'wechat',
      description: '正在使用中',
    },
  ];

  return (
    <ScrollView style={{ padding: 16 }}>
      <Table
        columns={data2.data.columns}
        dataSource={data2.data.dataSource}
        showHorizontalLines={true}
        showVerticalLines={true}
        containerBorder={true}
        // borderColor="#E5E5E5"
        borderWidth={1}
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
