import { ScrollView, StyleSheet, Text, View } from 'react-native';

import IconUri, {
  ChartWindIndicator,
  DownloadLineIcon,
  IconFilmFillIcon,
  IconHumidityFill,
  IconInformationSMethod,
  IconInformationSTips,
  IconTshirtFill,
  IconUserFill,
  IconUvFill,
  IconWarningSDanger,
  IconWarningSNotice,
  IconWarningSWarning,
  IconWindFill,
  ImdbLogo2016,
  Media163,
  MediaBilibili,
  MediaDouban,
  MediaDoubanOval,
  MediaIqiyi,
  MediaKugou,
  MediaKuwo,
  MediaMetacritic,
  MediaMigu,
  MediaQqvideo,
  MediaQtfm,
  MediaXimalaya,
  MediaYouku,
  SourceAppleFill,
  SourceMusicFill,
  SourceSpotifyFill,
  SourceYoutubeFill,
  StepAnalysis,
  StepCalibration,
  StepCategorization,
  StepConfirmation,
  StepFiltering,
  StepIntegration,
  SystemAlertBellFill,
  SystemFavoriteLine,
  SystemLocalFill,
  SystemMoreLine,
  SystemPauseFill,
  SystemPlayCircle,
  SystemPlayFill,
  SystemStarFill,
  SystemWatchFill,
  WeatherCloudy,
  WeatherExtremeHeavyfogRed,
  WeatherExtremeLightingRed,
  WeatherExtremeTyphoonRed,
  WeatherRain,
  WeatherThunder,
} from '../../components/basic/Icon';

export default function IconPreviewScreen() {
  return (
    <>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconUri:</Text>
            <IconUri
              size={24}
              url="https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-static/demo/svg/attention.svg"
            />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>ChartWindIndicator:</Text>
            <ChartWindIndicator size={60} />
            <ChartWindIndicator size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>DownloadLineIcon:</Text>
            <DownloadLineIcon size={24} />
            <DownloadLineIcon size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconFilmFillIcon:</Text>
            <IconFilmFillIcon size={24} />
            <IconFilmFillIcon size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconHumidityFill:</Text>
            <IconHumidityFill size={24} />
            <IconHumidityFill size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconInformationSMethod:</Text>
            <IconInformationSMethod size={24} />
            <IconInformationSMethod size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconInformationSTips:</Text>
            <IconInformationSTips size={24} />
            <IconInformationSTips size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconTshirtFill:</Text>
            <IconTshirtFill size={24} />
            <IconTshirtFill size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconUserFill:</Text>
            <IconUserFill size={24} />
            <IconUserFill size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconUvFill:</Text>
            <IconUvFill size={24} />
            <IconUvFill size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconWarningSDanger:</Text>
            <IconWarningSDanger size={24} />
            <IconWarningSDanger size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconWarningSNotice:</Text>
            <IconWarningSNotice size={24} />
            <IconWarningSNotice size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconWarningSWarning:</Text>
            <IconWarningSWarning size={24} />
            <IconWarningSWarning size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>IconWindFill:</Text>
            <IconWindFill size={24} />
            <IconWindFill size={24} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>ImdbLogo2016:</Text>
            <ImdbLogo2016 size={60} />
            <ImdbLogo2016 size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>Media163:</Text>
            <Media163 size={60} />
            <Media163 size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaBilibili:</Text>
            <MediaBilibili size={60} />
            <MediaBilibili size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaDouban:</Text>
            <MediaDouban size={60} />
            <MediaDouban size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaDoubanOval:</Text>
            <MediaDoubanOval size={60} />
            <MediaDoubanOval size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaIqiyi:</Text>
            <MediaIqiyi size={60} />
            <MediaIqiyi size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaKugou:</Text>
            <MediaKugou size={60} />
            <MediaKugou size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaKuwo:</Text>
            <MediaKuwo size={60} />
            <MediaKuwo size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaMetacritic:</Text>
            <MediaMetacritic size={60} />
            <MediaMetacritic size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaMigu:</Text>
            <MediaMigu size={60} />
            <MediaMigu size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaQqvideo:</Text>
            <MediaQqvideo size={60} />
            <MediaQqvideo size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaQtfm:</Text>
            <MediaQtfm size={60} />
            <MediaQtfm size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaXimalaya:</Text>
            <MediaXimalaya size={60} />
            <MediaXimalaya size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>MediaYouku:</Text>
            <MediaYouku size={60} />
            <MediaYouku size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SourceAppleFill:</Text>
            <SourceAppleFill size={60} />
            <SourceAppleFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SourceMusicFill:</Text>
            <SourceMusicFill size={60} />
            <SourceMusicFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SourceSpotifyFill:</Text>
            <SourceSpotifyFill size={60} />
            <SourceSpotifyFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SourceYoutubeFill:</Text>
            <SourceYoutubeFill size={60} />
            <SourceYoutubeFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>StepAnalysis:</Text>
            <StepAnalysis size={60} />
            <StepAnalysis size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>StepCalibration:</Text>
            <StepCalibration size={60} />
            <StepCalibration size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>StepCategorization:</Text>
            <StepCategorization size={60} />
            <StepCategorization size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>StepConfirmation:</Text>
            <StepConfirmation size={60} />
            <StepConfirmation size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>StepFiltering:</Text>
            <StepFiltering size={60} />
            <StepFiltering size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>StepIntegration:</Text>
            <StepIntegration size={60} />
            <StepIntegration size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemAlertBellFill:</Text>
            <SystemAlertBellFill size={60} />
            <SystemAlertBellFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemFavoriteLine:</Text>
            <SystemFavoriteLine size={60} />
            <SystemFavoriteLine size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemLocalFill:</Text>
            <SystemLocalFill size={60} />
            <SystemLocalFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemMoreLine:</Text>
            <SystemMoreLine size={60} />
            <SystemMoreLine size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemPauseFill:</Text>
            <SystemPauseFill size={60} />
            <SystemPauseFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemPlayCircle:</Text>
            <SystemPlayCircle size={60} />
            <SystemPlayCircle size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemPlayFill:</Text>
            <SystemPlayFill size={60} />
            <SystemPlayFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemStarFill:</Text>
            <SystemStarFill size={60} />
            <SystemStarFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>SystemWatchFill:</Text>
            <SystemWatchFill size={60} />
            <SystemWatchFill size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>WeatherCloudy:</Text>
            <WeatherCloudy size={60} />
            <WeatherCloudy size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>WeatherExtremeHeavyfogRed:</Text>
            <WeatherExtremeHeavyfogRed size={60} />
            <WeatherExtremeHeavyfogRed size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>WeatherExtremeLightingRed:</Text>
            <WeatherExtremeLightingRed size={60} />
            <WeatherExtremeLightingRed size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>WeatherExtremeTyphoonRed:</Text>
            <WeatherExtremeTyphoonRed size={60} />
            <WeatherExtremeTyphoonRed size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>WeatherRain:</Text>
            <WeatherRain size={60} />
            <WeatherRain size={60} color="#e0e" />
          </View>
          <View style={styles.iconItem}>
            <Text style={styles.iconLabel}>WeatherThunder:</Text>
            <WeatherThunder size={60} />
            <WeatherThunder size={60} color="#e0e" />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  container: {
    padding: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  iconItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: 'white',
  },
});
