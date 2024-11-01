import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

/**
 * 导出 l 属性（vue-i18n $t属性 更名而来），方便依赖注入
 * @description 本地化
 * @param key 本地化键
 * @param args 本地化参数
 * @returns String
 */

export const l = t;
