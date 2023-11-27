import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'evaluacion2',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      // Configuraciones específicas del plugin si son necesarias
    },
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
