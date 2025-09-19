import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourname.candlesticks101',
  appName: 'CandleSticks101',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#111827",
      showSpinner: false
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: "#111827"
    },
    Camera: {
      permissions: ['camera', 'photos']
    },
    Permissions: {
      camera: 'camera'
    }
  }
};

export default config;