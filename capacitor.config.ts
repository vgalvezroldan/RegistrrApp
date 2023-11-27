import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'evaluacion2',
  webDir: 'www',
  plugins: {
    Camera: {
      // Configuraciones específicas del plugin si son necesarias
    },
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
