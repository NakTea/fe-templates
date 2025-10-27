import { ScrollView, Text, View } from 'react-native';
import { useFlexUIConfig } from '../../components/provider/useFlexUIConfig';

import Button from '../../components/basic/Button';
import { WeatherThunder } from '../../components/basic/Icon';

// 大中小三个尺寸的按钮示例
const ButtonExamples = () => {
  const { theme } = useFlexUIConfig();
  const { components } = theme;
  const { button } = components;

  return (
    <ScrollView>
      <View style={{ padding: 20, gap: 16, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        {/* 大按钮 */}
        <Button
          size="large"
          title="大按钮"
          icon={<WeatherThunder size={20} />}
          onPress={() => console.log('large button pressed')}
        />

        {/* 中按钮 */}
        <Button
          size="medium"
          title="中按钮"
          icon={<WeatherThunder size={18} />}
          onPress={() => console.log('medium button pressed')}
        />

        {/* 小按钮 */}
        <Button
          size="small"
          title="小按钮"
          icon={<WeatherThunder size={16} />}
          onPress={() => console.log('small button pressed')}
        />

        {/* 主要按钮 - 图标在右侧 */}
        <Button
          type="primary"
          size="medium"
          title="主要按钮"
          icon={<WeatherThunder size={18} />}
          iconPosition="right"
          onPress={() => console.log('primary button pressed')}
        />

        {/* 普通按钮 */}
        <Button
          type="secondary"
          size="medium"
          title="普通按钮"
          icon={<WeatherThunder size={18} />}
          onPress={() => console.log('secondary button pressed')}
        />

        {/* 纯文字按钮 */}
        <Button type="text" size="medium" title="纯文字按钮" onPress={() => console.log('text button pressed')} />

        {/* 纯文字按钮 + 图标 */}
        <Button
          type="text"
          size="small"
          title="文字按钮"
          icon={<WeatherThunder size={16} />}
          onPress={() => console.log('text button with icon pressed')}
        />

        {/* 禁用状态 */}
        <Button
          disabled
          title="禁用按钮"
          icon={<WeatherThunder size={18} />}
          onPress={() => console.log('disabled button pressed')}
        />

        {/* 加载状态 */}
        <Button loading title="加载中" onPress={() => console.log('loading button pressed')} />

        {/* 自定义内容 */}
        <Button onPress={() => console.log('custom content pressed')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <WeatherThunder size={18} />
            <Text style={{ marginLeft: 8, color: '#fff' }}>自定义内容</Text>
          </View>
        </Button>

        <View style={{ padding: 20 }}>
          {/* 中按钮组 - 间距24px */}
          <View
            style={{
              flexDirection: 'row',
              gap: button.spaceElementsXl, // 24px
              marginTop: button.spaceElementsXs, // 8px
              marginBottom: button.spaceElementsXs, // 8px
            }}>
            <Button size="medium" title="按钮1" />
            <Button size="medium" title="按钮2" />
          </View>

          {/* 小按钮组 - 间距12px */}
          <View
            style={{
              flexDirection: 'row',
              gap: button.spaceElementsS, // 12px
              marginTop: button.spaceElementsXs, // 8px
              marginBottom: button.spaceElementsXs, // 8px
            }}>
            <Button size="small" title="小按钮1" />
            <Button size="small" title="小按钮2" />
            <Button size="small" title="小按钮3" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ButtonExamples;
