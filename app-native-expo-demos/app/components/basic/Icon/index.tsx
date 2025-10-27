import { SvgUri } from 'react-native-svg';

import ChartWindIndicator from './ChartWindIndicator';
import DownloadLineIcon from './DownloadLineIcon';
import IconFilmFillIcon from './IconFilmFillIcon';
import IconHumidityFill from './IconHumidityFill';
import IconInformationSMethod from './IconInformationSMethod';
import IconInformationSTips from './IconInformationSTips';
import IconTshirtFill from './IconTshirtFill';
import IconUserFill from './IconUserFill';
import IconUvFill from './IconUvFill';
import IconWarningSDanger from './IconWarningSDanger';
import IconWarningSNotice from './IconWarningSNotice';
import IconWarningSWarning from './IconWarningSWarning';
import IconWindFill from './IconWindFill';
import ImdbLogo2016 from './ImdbLogo2016';
import Media163 from './Media163';
import MediaBilibili from './MediaBilibili';
import MediaDouban from './MediaDouban';
import MediaDoubanOval from './MediaDoubanOval';
import MediaIqiyi from './MediaIqiyi';
import MediaKugou from './MediaKugou';
import MediaKuwo from './MediaKuwo';
import MediaMetacritic from './MediaMetacritic';
import MediaMigu from './MediaMigu';
import MediaQqvideo from './MediaQqvideo';
import MediaQtfm from './MediaQtfm';
import MediaXimalaya from './MediaXimalaya';
import MediaYouku from './MediaYouku';
import SourceAppleFill from './SourceAppleFill';
import SourceMusicFill from './SourceMusicFill';
import SourceSpotifyFill from './SourceSpotifyFill';
import SourceYoutubeFill from './SourceYoutubeFill';
import StepAnalysis from './StepAnalysis';
import StepCalibration from './StepCalibration';
import StepCategorization from './StepCategorization';
import StepConfirmation from './StepConfirmation';
import StepFiltering from './StepFiltering';
import StepIntegration from './StepIntegration';
import SystemAlertBellFill from './SystemAlertBellFill';
import SystemFavoriteLine from './SystemFavoriteLine';
import SystemLocalFill from './SystemLocalFill';
import SystemMoreLine from './SystemMoreLine';
import SystemPauseFill from './SystemPauseFill';
import SystemPlayCircle from './SystemPlayCircle';
import SystemPlayFill from './SystemPlayFill';
import SystemStarFill from './SystemStarFill';
import SystemWatchFill from './SystemWatchFill';
import WeatherCloudy from './WeatherCloudy';
import WeatherExtremeHeavyfogRed from './WeatherExtremeHeavyfogRed';
import WeatherExtremeLightingRed from './WeatherExtremeLightingRed';
import WeatherExtremeTyphoonRed from './WeatherExtremeTyphoonRed';
import WeatherRain from './WeatherRain';
import WeatherThunder from './WeatherThunder';

export interface IIconProps {
  name?: string;
  size?: number;
  color?: string;
  url?: string;
  width?: string;
  height?: string;
}

const IconUri = ({ url = '', size = 16, width, height, color, name, ...rest }: IIconProps) => {
  if (url) {
    return <SvgUri width={width || size} height={height || size} uri={url} fill={color} />;
  }
};

export default IconUri;

// 导出所有图标组件开始
export { default as ChartWindIndicator } from './ChartWindIndicator';
export { default as DownloadLineIcon } from './DownloadLineIcon';
export { default as IconFilmFillIcon } from './IconFilmFillIcon';
export { default as IconHumidityFill } from './IconHumidityFill';
export { default as IconInformationSMethod } from './IconInformationSMethod';
export { default as IconInformationSTips } from './IconInformationSTips';
export { default as IconTshirtFill } from './IconTshirtFill';
export { default as IconUserFill } from './IconUserFill';
export { default as IconUvFill } from './IconUvFill';
export { default as IconWarningSDanger } from './IconWarningSDanger';
export { default as IconWarningSNotice } from './IconWarningSNotice';
export { default as IconWarningSWarning } from './IconWarningSWarning';
export { default as IconWindFill } from './IconWindFill';
export { default as ImdbLogo2016 } from './ImdbLogo2016';
export { default as Media163 } from './Media163';
export { default as MediaBilibili } from './MediaBilibili';
export { default as MediaDouban } from './MediaDouban';
export { default as MediaDoubanOval } from './MediaDoubanOval';
export { default as MediaIqiyi } from './MediaIqiyi';
export { default as MediaKugou } from './MediaKugou';
export { default as MediaKuwo } from './MediaKuwo';
export { default as MediaMetacritic } from './MediaMetacritic';
export { default as MediaMigu } from './MediaMigu';
export { default as MediaQqvideo } from './MediaQqvideo';
export { default as MediaQtfm } from './MediaQtfm';
export { default as MediaXimalaya } from './MediaXimalaya';
export { default as MediaYouku } from './MediaYouku';
export { default as SourceAppleFill } from './SourceAppleFill';
export { default as SourceMusicFill } from './SourceMusicFill';
export { default as SourceSpotifyFill } from './SourceSpotifyFill';
export { default as SourceYoutubeFill } from './SourceYoutubeFill';
export { default as StepAnalysis } from './StepAnalysis';
export { default as StepCalibration } from './StepCalibration';
export { default as StepCategorization } from './StepCategorization';
export { default as StepConfirmation } from './StepConfirmation';
export { default as StepFiltering } from './StepFiltering';
export { default as StepIntegration } from './StepIntegration';
export { default as SystemAlertBellFill } from './SystemAlertBellFill';
export { default as SystemFavoriteLine } from './SystemFavoriteLine';
export { default as SystemLocalFill } from './SystemLocalFill';
export { default as SystemMoreLine } from './SystemMoreLine';
export { default as SystemPauseFill } from './SystemPauseFill';
export { default as SystemPlayCircle } from './SystemPlayCircle';
export { default as SystemPlayFill } from './SystemPlayFill';
export { default as SystemStarFill } from './SystemStarFill';
export { default as SystemWatchFill } from './SystemWatchFill';
export { default as WeatherCloudy } from './WeatherCloudy';
export { default as WeatherExtremeHeavyfogRed } from './WeatherExtremeHeavyfogRed';
export { default as WeatherExtremeLightingRed } from './WeatherExtremeLightingRed';
export { default as WeatherExtremeTyphoonRed } from './WeatherExtremeTyphoonRed';
export { default as WeatherRain } from './WeatherRain';
export { default as WeatherThunder } from './WeatherThunder';
// 导出所有图标组件完毕

export const IconFont = ({ name, ...rest }: IIconProps) => {
  switch (name) {
    case 'chartWindIndicator':
      return <ChartWindIndicator key="chartWindIndicator" {...rest} />;
    case 'downloadLineIcon':
      return <DownloadLineIcon key="downloadLineIcon" {...rest} />;
    case 'iconFilmFillIcon':
      return <IconFilmFillIcon key="iconFilmFillIcon" {...rest} />;
    case 'iconHumidityFill':
      return <IconHumidityFill key="iconHumidityFill" {...rest} />;
    case 'iconInformationSMethod':
      return <IconInformationSMethod key="iconInformationSMethod" {...rest} />;
    case 'iconInformationSTips':
      return <IconInformationSTips key="iconInformationSTips" {...rest} />;
    case 'iconTshirtFill':
      return <IconTshirtFill key="iconTshirtFill" {...rest} />;
    case 'iconUserFill':
      return <IconUserFill key="iconUserFill" {...rest} />;
    case 'iconUvFill':
      return <IconUvFill key="iconUvFill" {...rest} />;
    case 'iconWarningSDanger':
      return <IconWarningSDanger key="iconWarningSDanger" {...rest} />;
    case 'iconWarningSNotice':
      return <IconWarningSNotice key="iconWarningSNotice" {...rest} />;
    case 'iconWarningSWarning':
      return <IconWarningSWarning key="iconWarningSWarning" {...rest} />;
    case 'iconWindFill':
      return <IconWindFill key="iconWindFill" {...rest} />;
    case 'imdbLogo2016':
      return <ImdbLogo2016 key="imdbLogo2016" {...rest} />;
    case 'media163':
      return <Media163 key="media163" {...rest} />;
    case 'mediaBilibili':
      return <MediaBilibili key="mediaBilibili" {...rest} />;
    case 'mediaDouban':
      return <MediaDouban key="mediaDouban" {...rest} />;
    case 'mediaDoubanOval':
      return <MediaDoubanOval key="mediaDoubanOval" {...rest} />;
    case 'mediaIqiyi':
      return <MediaIqiyi key="mediaIqiyi" {...rest} />;
    case 'mediaKugou':
      return <MediaKugou key="mediaKugou" {...rest} />;
    case 'mediaKuwo':
      return <MediaKuwo key="mediaKuwo" {...rest} />;
    case 'mediaMetacritic':
      return <MediaMetacritic key="mediaMetacritic" {...rest} />;
    case 'mediaMigu':
      return <MediaMigu key="mediaMigu" {...rest} />;
    case 'mediaQqvideo':
      return <MediaQqvideo key="mediaQqvideo" {...rest} />;
    case 'mediaQtfm':
      return <MediaQtfm key="mediaQtfm" {...rest} />;
    case 'mediaXimalaya':
      return <MediaXimalaya key="mediaXimalaya" {...rest} />;
    case 'mediaYouku':
      return <MediaYouku key="mediaYouku" {...rest} />;
    case 'sourceAppleFill':
      return <SourceAppleFill key="sourceAppleFill" {...rest} />;
    case 'sourceMusicFill':
      return <SourceMusicFill key="sourceMusicFill" {...rest} />;
    case 'sourceSpotifyFill':
      return <SourceSpotifyFill key="sourceSpotifyFill" {...rest} />;
    case 'sourceYoutubeFill':
      return <SourceYoutubeFill key="sourceYoutubeFill" {...rest} />;
    case 'stepAnalysis':
      return <StepAnalysis key="stepAnalysis" {...rest} />;
    case 'stepCalibration':
      return <StepCalibration key="stepCalibration" {...rest} />;
    case 'stepCategorization':
      return <StepCategorization key="stepCategorization" {...rest} />;
    case 'stepConfirmation':
      return <StepConfirmation key="stepConfirmation" {...rest} />;
    case 'stepFiltering':
      return <StepFiltering key="stepFiltering" {...rest} />;
    case 'stepIntegration':
      return <StepIntegration key="stepIntegration" {...rest} />;
    case 'systemAlertBellFill':
      return <SystemAlertBellFill key="systemAlertBellFill" {...rest} />;
    case 'systemFavoriteLine':
      return <SystemFavoriteLine key="systemFavoriteLine" {...rest} />;
    case 'systemLocalFill':
      return <SystemLocalFill key="systemLocalFill" {...rest} />;
    case 'systemMoreLine':
      return <SystemMoreLine key="systemMoreLine" {...rest} />;
    case 'systemPauseFill':
      return <SystemPauseFill key="systemPauseFill" {...rest} />;
    case 'systemPlayCircle':
      return <SystemPlayCircle key="systemPlayCircle" {...rest} />;
    case 'systemPlayFill':
      return <SystemPlayFill key="systemPlayFill" {...rest} />;
    case 'systemStarFill':
      return <SystemStarFill key="systemStarFill" {...rest} />;
    case 'systemWatchFill':
      return <SystemWatchFill key="systemWatchFill" {...rest} />;
    case 'weatherCloudy':
      return <WeatherCloudy key="weatherCloudy" {...rest} />;
    case 'weatherExtremeHeavyfogRed':
      return <WeatherExtremeHeavyfogRed key="weatherExtremeHeavyfogRed" {...rest} />;
    case 'weatherExtremeLightingRed':
      return <WeatherExtremeLightingRed key="weatherExtremeLightingRed" {...rest} />;
    case 'weatherExtremeTyphoonRed':
      return <WeatherExtremeTyphoonRed key="weatherExtremeTyphoonRed" {...rest} />;
    case 'weatherRain':
      return <WeatherRain key="weatherRain" {...rest} />;
    case 'weatherThunder':
      return <WeatherThunder key="weatherThunder" {...rest} />;
  }
  return null;
};
