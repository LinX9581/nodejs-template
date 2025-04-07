/**
 * 全局變數和工具函數
 * 盡量減少使用 global，只保留必要的工具和配置
 */
import config from './config/index'

// 核心配置掛載到全局
global.config = config

// 導出核心工具，允許顯式導入
export {
    config,
}