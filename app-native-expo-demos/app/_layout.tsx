import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import { useFonts } from 'expo-font';
import { Stack, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import TemplateLayoutDevelop from './components/provider/TemplateLayoutDevelop';
import { getDesignToken } from './design/default';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname(); // 获取当前路径
  const themeName = 'dark';

  const newThemeDiy = {
    system: {
      radiusImageS: 4,
    },
    components: {
      button: {
        radiusComp1: 20,
      },
    },
  };

  const defaultTheme = deepmerge(getDesignToken(themeName), newThemeDiy);

  // 判断是否是 tab 路由
  const isTabRoute = pathname === '/' || pathname === '/basic';
  const paddingVertical = isTabRoute ? 0 : 60;

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const styles = StyleSheet.create({
    background: {
      flex: 1,
      ...StyleSheet.absoluteFillObject,
    },
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover', // 可以选择 'cover', 'contain', 'stretch', 'repeat', 'center'
    },
    box: {
      width: '25%',
      height: '20%',
    },
    boxEven: {
      backgroundColor: 'orangered',
    },
    boxOdd: {
      backgroundColor: 'gold',
    },
  });

  // console.log('DefaultTheme', DefaultTheme);

  const defaultThemeDiy = {
    dark: false,
    colors: {
      primary: 'rgb(0, 122, 255)',
      background: 'rgba(0, 0, 0, 0.3)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(216, 216, 216)',
      notification: 'rgb(255, 59, 48)',
    },
    fonts: {
      regular: {
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: '400',
      },
      medium: {
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: '500',
      },
      bold: {
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: '600',
      },
      heavy: {
        fontFamily:
          'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontWeight: '700',
      },
    },
  };

  return (
    <TemplateLayoutDevelop>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : defaultThemeDiy}>
        <View style={styles.background}>
          <Image
            source={{ uri: 'https://hojo-website-daily.oss-cn-shanghai.aliyuncs.com/hojo-design/system/car_bg.png' }}
            style={styles.backgroundImage}
          />
        </View>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: 'transparent', paddingHorizontal: 0, paddingVertical: paddingVertical },
            header(props) {
              return <></>;
            },
          }}>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
              presentation: 'transparentModal',
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </TemplateLayoutDevelop>
  );
}
