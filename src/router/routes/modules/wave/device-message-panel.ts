import { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

export const DeviceMessagePanel: AppRouteModule = {
  path: '/device-configuration',
  name: 'MessagePanel',
  redirect: '/device-configuration/deviceMessagePanel',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    icon: 'icon-f-MessagePane',
    title: t('Unified.texts.DeviceMessagePanel'),
    policy: 'Unified.DeviceMessagePanel',
    orderNo: 10,
  },
  children: [
    {
      path: '/device-configuration/deviceMessagePanel',
      name: 'MessagePanel',
      component: () =>
        import('@/wave/device-configuration/deviceMessagePanel/deviceMessagePanel.vue'),
      meta: {
        title: t('Unified.texts.DeviceMessagePanel'),
      },
    },
  ],
};

export default DeviceMessagePanel;
