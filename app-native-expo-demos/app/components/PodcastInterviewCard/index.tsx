import React from 'react';
import PodcastInterviewCard from './PodcastInterviewCard';

const App = () => {
  const interviewData = {
    title: '本期《增长黑客笔记》嘉宾访谈',
    users: [
      {
        name: '李智',
        role: '主播：',
        avatar: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/profiles/person_cover_04.png',
      },
      {
        name: '王浩',
        role: '嘉宾：',
        avatar: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/profiles/person_cover_02.jpg',
      },
    ],
    desc: '创业最关键的不是你拥有什么资源，而是你如何利用现有资源去撬动一个更大的可能性。增长的本质就是不断寻找这种杠杆。',
    buttons: [
      {
        title: '开始收听',
        action: 'podcastPlay',
        type: 'primary',
        size: 'medium',
      },
    ],
  };

  return <PodcastInterviewCard data={interviewData} opts={{ width: '100%' }} />;
};

export default App;
