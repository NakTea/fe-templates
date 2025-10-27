import React from 'react';
import { View } from 'react-native';
import MarkdownRenderer from '../../components/basic/MarkdownRenderer';
const StepperDemo = () => {
  const copy = `
# h1 Heading 8-)
## h2 Heading 8-)
### h3 Heading 8-)

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |
`;

  return (
    <View style={{ padding: 16, gap: 8 }}>
      {/* 基础用法示例 */}
      <MarkdownRenderer content={'- 列表一**粗体**\n- 列表二\n- 列表三\n ### hello this is a test.**粗体**'} />

      <MarkdownRenderer
        content={
          '### 绘制表格 Tables\n\n| 项目   |  价格 | 数量 |\n| ------ | ----: | :--: |\n| 计算机 | $1600 |  5   |\n| 手机   |   $12 |  12  |\n| 管线   |    $1 | 234  |'
        }
      />

      <MarkdownRenderer content="### 绘制表格22 Tables\n\n| 项目   |  价格 | 数量 |\n| ------ | ----: | :--: |\n| 计算机 | $1600 |  5   |\n| 手机   |   $12 |  12  |\n| 管线   |    $1 | 234  |" />

      <MarkdownRenderer content={copy} />

      <MarkdownRenderer
        content={`---

~~删除线~~ <s>删除线（开启识别HTML标签时）</s>

_斜体字_ _斜体字_

**粗体** **粗体**

**_粗斜体_** **_粗斜体_**

上标：X<sub>2</sub>，下标：O<sup>2</sup>

**缩写(同HTML的abbr标签)**

> 即更长的单词或短语的缩写形式，前提是开启识别HTML标签时，已默认开启`}
      />
    </View>
  );
};

export default StepperDemo;
