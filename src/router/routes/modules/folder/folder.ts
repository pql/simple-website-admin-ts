import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const saas: AppRouteModule = {
  path: '/folder',
  name: 'Folder',
  component: LAYOUT,
  redirect: '/folder/file-management',
  meta: {
    hideChildrenInMenu: true,
    icon: 'icon-f-Files',
    title: t('FileManagement.texts.Menu:FileManagement'),
    policy: 'FileManagement',
    orderNo: 5,
  },
  children: [
    {
      path: 'file-management',
      name: 'Files',
      component: () => import('@/app/admin/files/files.vue'),
      // component: () => import('@/app/admin/versions/versions.vue'),
      meta: {
        title: t('FileManagement.texts.Menu:FileManagement'),
        policy: 'FileManagement',
      },
    },
  ],
};

export default saas;
