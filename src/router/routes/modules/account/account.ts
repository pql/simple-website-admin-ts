import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const account: AppRouteModule = {
  path: '/admin/account',
  name: 'AccountManagement',
  component: LAYOUT,
  meta: {
    redirect: '/admin/account/accountManagement',
    hideMenu: true,
    icon: 'ant-design:user-outlined',
    title: t('AbpAccount.texts.MyAccount'),
    policy: '',
  },
  children: [
    {
      path: '/admin/account/account',
      name: 'Account',
      component: () => import('@/app/admin/account/account.vue'),
      meta: {
        hideChildrenInMenu: true,
        title: t('AbpAccount.texts.MyAccount'),
        policy: '',
      },
    },
    {
      path: '/admin/personal-data',
      name: 'Personal-data',
      redirect: '/admin/personal-data/personalData',
      meta: {
        // icon: 'ant-design:mail-outlined',
        title: t('AbpGdpr.texts.Menu:PersonalData'),
        hideChildrenInMenu: true,
        hideMenu: true,
      },
      children: [
        {
          path: '/admin/personal-data/personalData',
          name: 'PersonalData',
          component: () => import('@/app/admin/personalData/personalData.vue'),
          meta: {
            title: t('AbpGdpr.texts.Menu:PersonalData'),
          },
        },
      ],
    },
    {
      path: '/admin/account-security-log',
      name: 'Account-security-log',
      redirect: '/admin/account-security-log/accountSecurityLog',
      meta: {
        // icon: 'ant-design:mail-outlined',
        title: t('AbpIdentity.texts.Menu:SecurityLogs'),
        hideChildrenInMenu: true,
        hideMenu: true,
      },
      children: [
        {
          path: '/admin/account-security-log/accountSecurityLog',
          name: 'AccountSecurityLog',
          component: () => import('@/app/admin/accountSecurityLog/accountSecurityLog.vue'),
          meta: {
            title: t('AbpIdentity.texts.Menu:SecurityLogs'),
          },
        },
      ],
    },
  ],
};

export default account;
