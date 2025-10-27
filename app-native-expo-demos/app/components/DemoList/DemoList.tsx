import { ScrollView, StyleSheet, Text, View } from 'react-native';

// basic
import BasicButton from '../../basic/Button/index';
import BasicCardContainer from '../../basic/CardContainer/index';
import BasicIcon from '../../basic/Icon/index';
import BasicMarkdownRender from '../../basic/MarkdownRender/index';
import BasicRichTextRenderer from '../../basic/RichTextRender/index';
import BasicStepper from '../../basic/Stepper/index';
import BasicStepperHorizontal from '../../basic/StepperHorizontal/index';
import BasicTable from '../../basic/Table/index';
import BasicTips from '../../basic/Tips/index';
import BasicVerticalDataCompare from '../../basic/VerticalDataCompare/index';

// demos
import DemoAudioPlayer from '../DemoAudioPlayer/index';
import DemoBlurView from '../DemoBlurView/index';
import DemoLottieLogo from '../DemoLottieLogo/index';
import DemoReanimated from '../DemoReanimated/index';
import DemoVideoPlayer from '../DemoVideoPlayer/index';

// 正确的导入方式 - 每个组件使用不同的名称
import KnowledgeBarChartComparison from '../KnowledgeBarChartComparison/index';
import KnowledgeColumnText from '../KnowledgeColumnText/index';
import KnowledgeDataGrid from '../KnowledgeDataGrid/index';
import KnowledgeDoubleColumnText from '../KnowledgeDoubleColumnText/index';
import KnowledgeFeatureList from '../KnowledgeFeatureList/index';
import KnowledgeGridList from '../KnowledgeGridList/index';
import KnowledgeGuide from '../KnowledgeGuide/index';
import KnowledgeHorizontalOverview from '../KnowledgeHorizontalOverview/index';
import KnowledgeHorizontalSetupStepper from '../KnowledgeHorizontalSetupStepper/index';
import KnowledgeImageTextCard from '../KnowledgeImageTextCard/index';
import KnowledgeImageTextTable from '../KnowledgeImageTextTable/index';
import KnowledgeSettingsGroupList from '../KnowledgeSettingsGroupList/index';
import KnowledgeSolutionStepCard from '../KnowledgeSolutionStepCard/index';
import KnowledgeStatsList from '../KnowledgeStatsList/index';
import KnowledgeTabView from '../KnowledgeTabView/index';
import KnowledgeVerticalStepGuide from '../KnowledgeVerticalStepGuide/index';
import MovieActorWorks from '../MovieActorWorks/index';
import MovieMediaRecommendations from '../MovieMediaRecommendations/index';
import MusicFeaturedAlbums from '../MusicFeaturedAlbums/index';
import MusicSimilarStyles from '../MusicSimilarStyles/index';
// import MusicSongList from '../MusicSongList/index';
import PodcastColumnList from '../PodcastColumnList/index';
import PodcastEpisodeInfo from '../PodcastEpisodeInfo/index';
import PodcastInterviewCard from '../PodcastInterviewCard/index';
import PodcastProgramList from '../PodcastProgramList/index';
import WeatherDailyRainChance from '../WeatherDailyRainChance/index';
import WeatherInfoMultiDay from '../WeatherInfoMultiDay/index';

const DemoList = () => {
  const demoComponents = [
    { name: 'BasicButton', component: BasicButton },
    { name: 'BasicCardContainer', component: BasicCardContainer },
    { name: 'BasicIcon', component: BasicIcon },
    { name: 'BasicMarkdownRender', component: BasicMarkdownRender },
    { name: 'BasicRichTextRenderer', component: BasicRichTextRenderer },
    { name: 'BasicStepper', component: BasicStepper },
    { name: 'BasicStepperHorizontal', component: BasicStepperHorizontal },
    { name: 'BasicTable', component: BasicTable },
    { name: 'BasicTips', component: BasicTips },
    { name: 'BasicVerticalDataCompare', component: BasicVerticalDataCompare },

    { name: 'DemoAudioPlayer', component: DemoAudioPlayer },
    { name: 'DemoReanimated', component: DemoReanimated },
    { name: 'DemoVideoPlayer', component: DemoVideoPlayer },
    { name: 'DemoLottieLogo', component: DemoLottieLogo },
    { name: 'DemoBlurView', component: DemoBlurView },

    { name: 'WeatherDailyRainChance', component: WeatherDailyRainChance },
    { name: 'WeatherInfoMultiDay', component: WeatherInfoMultiDay },
    { name: 'PodcastColumnList', component: PodcastColumnList },
    { name: 'PodcastProgramList', component: PodcastProgramList },
    { name: 'PodcastInterviewCard', component: PodcastInterviewCard },
    { name: 'PodcastEpisodeInfo', component: PodcastEpisodeInfo },
    // { name: 'MusicSongList', component: MusicSongList },
    { name: 'MusicFeaturedAlbums', component: MusicFeaturedAlbums },
    { name: 'MusicSimilarStyles', component: MusicSimilarStyles },
    { name: 'MovieActorWorks', component: MovieActorWorks },
    { name: 'MovieMediaRecommendations', component: MovieMediaRecommendations },
    { name: 'KnowledgeSettingsGroupList', component: KnowledgeSettingsGroupList },
    { name: 'KnowledgeHorizontalOverview', component: KnowledgeHorizontalOverview },
    { name: 'KnowledgeImageTextTable', component: KnowledgeImageTextTable },
    { name: 'KnowledgeColumnText', component: KnowledgeColumnText },
    { name: 'KnowledgeVerticalStepGuide', component: KnowledgeVerticalStepGuide },
    { name: 'KnowledgeHorizontalSetupStepper', component: KnowledgeHorizontalSetupStepper },
    { name: 'KnowledgeStatsList', component: KnowledgeStatsList },
    { name: 'KnowledgeBarChartComparison', component: KnowledgeBarChartComparison },
    { name: 'KnowledgeImageTextCard', component: KnowledgeImageTextCard },
    { name: 'KnowledgeGuide', component: KnowledgeGuide },
    { name: 'KnowledgeTabView', component: KnowledgeTabView },
    { name: 'KnowledgeFeatureList', component: KnowledgeFeatureList },
    { name: 'KnowledgeGridList', component: KnowledgeGridList },
    { name: 'KnowledgeDoubleColumnText', component: KnowledgeDoubleColumnText },
    { name: 'KnowledgeSolutionStepCard', component: KnowledgeSolutionStepCard },
    { name: 'KnowledgeDataGrid', component: KnowledgeDataGrid },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>组件演示列表</Text>
      {demoComponents.map((demo, index) => {
        const Component = demo.component;
        return (
          <View key={index} style={styles.demoSection}>
            <Text style={styles.sectionTitle}>{demo.name}</Text>
            <View style={styles.componentWrapper}>
              <Component />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  demoSection: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    color: '#495057',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  componentWrapper: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default DemoList;
