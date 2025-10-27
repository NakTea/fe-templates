import KnowledgeGridList from './KnowledgeGridList';

const App = () => {
  const interviewData = {
    title: '车辆安全气囊说明',
    items: [
      {
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_500,h_200',
        description: '01.正面安全气囊展开正面安全气囊展开正面安全气囊展开正面安全气囊展开',
      },
      {
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_500,h_200',
        description: '02.远端侧气囊',
      },
      {
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_500,h_200',
        description: '03.座椅侧气囊',
      },
      {
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_500,h_200',
        description: '04.远端侧气囊展开',
      },
      {
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_500,h_200',
        description: '05.座椅侧气囊展开',
      },
      {
        image:
          'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/demo.jpg?x-oss-process=image/resize,m_fill,w_500,h_200',
        description: '06.帘式气囊',
      },
    ],
  };

  return <KnowledgeGridList data={interviewData} opts={{ width: '100%', maxHeight: 500 }} />;

  // return (
  //   <ScrollView style={{ padding: 20, gap: 20 }}>
  //     <Text>宽度299 (一列)</Text>
  //     <KnowledgeGridList data={interviewData} opts={{ width: 299 }} />

  //     <Text>宽度300 (一列)</Text>
  //     <KnowledgeGridList data={interviewData} opts={{ width: 300 }} />

  //     <Text>宽度301 (两列)</Text>
  //     <KnowledgeGridList data={interviewData} opts={{ width: 301 }} />
  //   </ScrollView>
  // );
};

export default App;
