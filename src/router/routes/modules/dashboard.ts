import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  
  redirect: '/dashboard/analysis',
  meta: {
    hideMenu: true,
    orderNo: 35,
    icon: 'ion:grid-outline',
    title: t('Unified.texts.Dashboard'),
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('@/views/dashboard/analysis/index.vue'),
      meta: {
        // affix: true,
        title: t('Unified.texts.DashboardAnalysis'),
        policy: '',
      },
    },
    // {
    //   path: 'test',
    //   name: 'Test',
    //   component: () => import('@/views/dashboard/analysis/test.vue'),
    //   meta: {
    //     title: t('Unified.texts.DashboardWorkbench'),
    //     policy: 'AbpIdentity',
    //   },
    // },
    // {
    //   path: 'workbench',
    //   name: 'Workbench',
    //   component: () => import('@/views/dashboard/workbench/index.vue'),
    //   meta: {
    //     title: t('Unified.texts.DashboardWorkbench'),
    //   },
    // },
  ],
};

export default dashboard;
