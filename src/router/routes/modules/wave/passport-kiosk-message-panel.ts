import { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

export const DeviceMessagePanel: AppRouteModule = {
  path: '/passport-kiosk-message-panel',
  name: 'PassportKioskMessagePanel',
  redirect: '/passport-kiosk-message-panel/passportKioskMessagePanel',
  component: LAYOUT,
  meta: {
    hideChildrenInMenu: true,
    icon: 'icon-f-OpsPanel',
    title: t('Unified.texts.PassportKioskMessagePanel'),
    policy: 'Unified.PassportKioskMessagePanel',
    orderNo: 10,
  },
  children: [
    {
      path: '/passport-kiosk-message-panel/passportKioskMessagePanel',
      name: 'PassportKioskMessagePanel',
      component: () =>
        import(
          '@/wave/device-configuration/passport-kiosk-message-panel/passport-kiosk-message-panel.vue'
        ),
      meta: {
        title: t('Unified.texts.PassportKioskMessagePanel'),
      },
    },
  ],
};

export default DeviceMessagePanel;
