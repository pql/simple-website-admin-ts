import { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

export const DeviceConfiguration: AppRouteModule = {
  path: '/command-control',
  name: 'CommandControl',
  redirect: '/command-control',
  component: LAYOUT,
  meta: {
    icon: 'icon-f-Command',
    title: t('Unified.texts.CommandControl'),
    orderNo: 25,
  },
  children: [
    {
      path: '/control-panel-design',
      name: 'ControlPanelDesign',
      component: () =>
        import('@/wave/device-configuration/command-control/control-panel/control-panel.vue'),
      meta: {
        title: t('Unified.texts.ControlPanelDesign'),
        policy: 'Unified.ControlPanel',
      },
    },
    // {
    //   path: '/command-control',
    //   name: 'ControlPanel',
    //   component: () => import('@/wave/device-configuration/ops-panel/ops-panel.vue'),
    //   meta: {
    //     title: t('Unified.texts.ControlPanel'),
    //     policy: 'Unified.OpsPanel',
    //   },
    // },
    {
      path: '/command-control',
      name: 'ControlPanel',
      component: () => import('@/wave/device-configuration/ops-panel-v2/ops-panel.vue'),
      meta: {
        title: t('Unified.texts.ControlPanel'),
        policy: 'Unified.OpsPanel',
      },
    },
    {
      path: '/camera-viewer',
      name: 'CameraViewer',
      component: () => import('@/wave/device-configuration/camera-viewer/camera-viewer.vue'),
      meta: {
        title: t('Unified.texts.CameraViewer'),
        policy: 'Unified.CameraViewer',
      },
    },
  ],
};

export default DeviceConfiguration;
