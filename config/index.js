// global.js
import developmentConfig from './development';
import testConfig from './test';
import productionConfig from './production';

// 默认配置
const defaultConfig = {
  // 一些默认设置
};

// 获取环境变量
const environment = process.env.NODE_ENV || 'development';

// 根据环境变量选择配置
const envConfig = (() => {
  switch (environment) {
    case 'development':
      return developmentConfig;
    case 'test':
      return testConfig;
    case 'production':
      return productionConfig;
    default:
      return defaultConfig;
  }
})();

// 合并配置对象（默认配置和环境特定配置）
const globalConfig = {
  ...defaultConfig,
  ...envConfig,
};

export default globalConfig;