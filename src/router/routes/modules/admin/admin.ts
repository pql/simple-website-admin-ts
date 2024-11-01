import { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

export const admin: AppRouteModule = {
  path: '/admin',
  name: 'Admin',
  component: LAYOUT,
  meta: {
    icon: 'icon-f-person',
    title: t('AbpUiNavigation.texts.Menu:Administration'),
    orderNo: 1,
  },
  children: [
    {
      path: '/admin/identity',
      name: 'Identity',
      meta: {
        // icon: 'ant-design:idcard-outlined',
        title: t('AbpIdentity.texts.Menu:IdentityManagement'),
        policy: 'AbpIdentity',
      },
      children: [
        {
          path: '/admin/identity/organization-units',
          name: 'OrganizationUnits',
          component: () => import('@/app/admin/organization-units/organization-units.vue'),
          meta: {
            title: t('AbpIdentity.texts.OrganizationUnits'),
            policy: 'AbpIdentity.OrganizationUnits',
          },
        },
        {
          path: '/admin/identity/roles',
          name: 'Roles',
          component: () => import('@/app/admin/roles/roles.vue'),
          meta: {
            title: t('AbpIdentity.texts.Roles'),
            policy: 'AbpIdentity.Roles',
          },
        },
        {
          path: '/admin/identity/users',
          name: 'Users',
          component: () => import('@/app/admin/users/users.vue'),
          meta: {
            title: t('AbpIdentity.texts.Users'),
            policy: 'AbpIdentity.Users',
          },
        },
        {
          path: '/admin/identity/claimTypes',
          name: 'ClaimTypes',
          component: () => import('@/app/admin/claimTypes/claimTypes.vue'),
          meta: {
            title: t('AbpIdentity.texts.ClaimTypes'),
            policy: 'AbpIdentity.ClaimTypes',
          },
        },
        {
          path: '/admin/identity/securityLog',
          name: 'SecurityLog',
          component: () => import('@/app/admin/securityLog/securityLog.vue'),
          meta: {
            title: t('AbpIdentity.texts.Menu:SecurityLogs'),
            policy: 'AbpIdentity.SecurityLogs',
          },
        },
      ],
    },
    {
      path: '/saas',
      name: 'Saas',
      component: LAYOUT,
      redirect: '/openiddict/applications',
      meta: {
        hideChildrenInMenu: false,
        // icon: 'ant-design:user-outlined',
        title: t('Saas.texts.Menu:Saas'),
        policy: 'Saas',
      },
      children: [
        {
          path: 'tenants',
          name: 'Tenants',
          component: () => import('@/app/admin/tenants/tenants.vue'),
          meta: {
            title: t('Saas.texts.Tenants'),
            policy: 'Saas.Tenants',
          },
        },
        {
          path: 'versions',
          name: 'Versions',
          component: () => import('@/app/admin/versions/versions.vue'),
          meta: {
            title: t('Saas.texts.Editions'),
            policy: 'Saas.Editions',
          },
        },
      ],
    },
    {
      path: '/admin/openiddict',
      name: 'OpenIdDict',
      meta: {
        // icon: 'ion:id-card-outline',
        title: t('AbpOpenIddict.texts.Menu:OpenIddict'),
        policy: 'OpenIddictPro',
      },
      children: [
        {
          path: '/admin/openiddict/applications',
          name: 'OpenIdDictApplications',
          component: () => import('@/app/admin/openiddict/applications/applications.vue'),
          meta: {
            title: t('AbpOpenIddict.texts.Applications'),
            policy: 'OpenIddictPro.Application',
          },
        },
        {
          path: '/admin/openiddict/scopes',
          name: 'OpenIdDictScopes',
          component: () => import('@/app/admin/openiddict/scopes/scopes.vue'),
          meta: {
            title: t('AbpOpenIddict.texts.Scopes'),
            policy: 'OpenIddictPro.Scope',
          },
        },
      ],
    },
    // {
    //   path: '/admin/language-management',
    //   name: 'LanguageManagement',
    //   meta: {
    //     icon: 'ion:ios-world-outline',
    //     title: t('LanguageManagement.texts.LanguageManagement'),
    //     policy: 'LanguageManagement',
    //   },
    //   children: [
    //     {
    //       path: '/admin/language-management/languages',
    //       name: 'Languages',
    //       component: () => import('@/app/admin/languages/languages.vue'),
    //       meta: {
    //         title: t('LanguageManagement.texts.Languages'),
    //         policy: 'LanguageManagement.Languages',
    //       },
    //     },
    //     {
    //       path: '/admin/language-management/texts',
    //       name: 'LanguageTexts',
    //       component: () => import('@/app/admin/languageTexts/languageTexts.vue'),
    //       meta: {
    //         title: t('LanguageManagement.texts.LanguageTexts'),
    //         policy: 'LanguageManagement.LanguageTexts',
    //       },
    //     },
    //   ],
    // },
    // {
    //   path: '/admin/text-template-management',
    //   name: 'TextTemplateManagement',
    //   redirect: '/admin/text-template-management/templates',
    //   meta: {
    //     icon: 'ant-design:mail-outlined',
    //     title: t('TextTemplateManagement.texts.Menu:TextTemplates'),
    //     hideChildrenInMenu: true,
    //     policy: 'TextTemplateManagement',
    //   },
    //   children: [
    //     {
    //       path: '/admin/text-template-management/templates',
    //       name: 'TextTemplates',
    //       component: () => import('@/app/admin/textTemplates/textTemplates.vue'),
    //       meta: {
    //         title: t('TextTemplateManagement.texts.Menu:TextTemplates'),
    //         policy: 'TextTemplateManagement',
    //       },
    //     },
    //   ],
    // },
    {
      path: '/admin/audit-logs',
      name: 'AuditLogs',
      redirect: '/admin/audit-logs/logs',
      meta: {
        // icon: 'ant-design:file-text-outlined',
        title: t('AbpAuditLogging.texts.Menu:AuditLogging'),
        hideChildrenInMenu: true,
        policy: 'AuditLogging',
      },
      children: [
        {
          path: '/admin/audit-logs/logs',
          name: 'Logs',
          component: () => import('@/app/admin/audit-logs/audit-logs.vue'),
          meta: {
            title: t('AbpAuditLogging.texts.Menu:AuditLogging'),
            policy: 'AuditLogging',
          },
        },
      ],
    },
    {
      path: '/admin/setting-management',
      name: 'SettingManagement',
      redirect: '/admin/setting-management/settings',
      meta: {
        // icon: 'ion:settings-outline',
        title: t('AbpSettingManagement.texts.Settings'),
        hideChildrenInMenu: true,
        policy: 'SettingManagement',
      },
      children: [
        {
          path: '/admin/setting-management/settings',
          name: 'Settings',
          component: () => import('@/app/admin/settings/settings.vue'),
          meta: {
            title: t('AbpSettingManagement.texts.Settings'),
            policy: 'SettingManagement',
          },
        },
      ],
    },
  ],
};

export default admin;
