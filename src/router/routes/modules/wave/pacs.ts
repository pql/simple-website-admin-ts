import { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

export const Pacs: AppRouteModule = {
  path: '/pacs',
  name: 'Pacs',
  redirect: '/pacs',
  component: LAYOUT,
  meta: {
    icon: 'icon-f-KeyOutlined',
    title: t('Unified.texts.Pacs'),
    orderNo: 30,
  },
  children: [
    {
      path: '/pacs/configuration',
      name: 'PacsConfigure',
      meta: {
        title: t('Unified.texts.Configuration'),
        policy: '',
      },
      children: [
        {
          path: '/pacs/configuration/card-format',
          name: 'CardFormat',
          component: () => import('@/wave/pacs/card-formats/card-format.vue'),
          meta: {
            title: t('Unified.texts.CardFormat'),
            policy: 'Unified.PacsCardFormat',
          },
        },
        {
          path: '/pacs/configuration/card-holder-type',
          name: 'PacsCardHolderType',
          component: () => import('@/wave/pacs/card-holder-types/card-holder-type.vue'),
          meta: {
            title: t('Unified.texts.CardHolderType'),
            policy: 'Unified.PacsCardHolderType',
          },
        },
        {
          path: '/pacs/configuration/card-holder-status',
          name: 'PacsCardHolderStatus',
          component: () => import('@/wave/pacs/card-holder-status/card-holder-status.vue'),
          meta: {
            title: t('Unified.texts.CardHolderStatus'),
            policy: 'Unified.PacsCardHolderStatus',
          },
        },
        {
          path: '/pacs/configuration/contact-type',
          name: 'PacsContactType',
          component: () => import('@/wave/pacs/contact-types/contact-type.vue'),
          meta: {
            title: t('Unified.texts.ContactType'),
            policy: 'Unified.PacsContactType',
          },
        },
        {
          path: '/pacs/configuration/position',
          name: 'PacsPosition',
          component: () => import('@/wave/pacs/positions/position.vue'),
          meta: {
            title: t('Unified.texts.Position'),
            policy: 'Unified.PacsPosition',
          },
        },
        {
          path: '/pacs/configuration/department',
          name: 'PacsDepartment',
          component: () => import('@/wave/pacs/departments/department.vue'),
          meta: {
            title: t('Unified.texts.Department'),
            policy: 'Unified.PacsDepartment',
          },
        },
        {
          path: '/pacs/configuration/company',
          name: 'PacsCompany',
          component: () => import('@/wave/pacs/companys/company.vue'),
          meta: {
            title: t('Unified.texts.Company'),
            policy: 'Unified.PacsCompany',
          },
        },
        {
          path: '/pacs/configuration/public-holiday',
          name: 'PublicHoliday',
          component: () => import('@/wave/pacs/public-holiday/public-holiday.vue'),
          meta: {
            title: t('Unified.texts.PublicHoliday'),
            policy: 'Unified.PacsPublicHoliday',
          },
        },
        {
          path: '/pacs/configuration/card-holder-config-custom',
          name: 'CardHolderConfigCustom',
          component: () =>
            import('@/wave/pacs/card-holder-config-custom/card-holder-config-custom.vue'),
          meta: {
            title: t('Unified.texts.ConfigurationCustomFields'),
            policy: 'Unified.PacsCardHolderConfigCustom',
          },
        },
        {
          path: '/pacs/configuration/card-label',
          name: 'CardLabel',
          component: () => import('@/wave/pacs/card-label/card-label.vue'),
          meta: {
            title: t('Unified.texts.CardLabel'),
            policy: 'Unified.CardLabel',
          },
        },
      ],
    },
    {
      path: '/pacs/credential-management',
      name: 'PacsCredentialManagement',
      meta: {
        title: t('Unified.texts.CredentialManagement'),
      },
      children: [
        {
          path: '/pacs/credential-management/cards',
          name: 'PacsCards',
          component: () => import('@/wave/pacs/cards/cards.vue'),
          meta: {
            title: t('Unified.texts.Cards'),
            policy: 'Unified.PacsCard',
          },
        },
        {
          path: '/pacs/credential-management/pacsCardHolder',
          name: 'PacsCardHolder',
          component: () => import('@/wave/pacs/card-holders/card-holder.vue'),
          meta: {
            title: t('Unified.texts.CardHolder'),
            policy: 'Unified.PacsCardHolder',
          },
        },
      ],
    },
    {
      path: '/pacs/access-permissions',
      name: 'PacsAccessPermissions',
      meta: {
        title: t('Unified.texts.AccessPermissions'),
        policy: '',
      },
      children: [
        {
          path: '/pacs/access-permissions/device-access-group',
          name: 'DeviceAccessGroup',
          component: () => import('@/wave/pacs/device-access-group/device-access-group.vue'),
          meta: {
            title: t('Unified.texts.DeviceAccessGroup'),
            policy: 'Unified.PacsDeviceAccessGroup',
          },
        },
        {
          path: '/pacs/access-permissions/device-access-schedule-group',
          name: 'DeviceAccessScheduleGroup',
          component: () =>
            import('@/wave/pacs/device-access-schedule-group/device-access-schedule-group.vue'),
          meta: {
            title: t('Unified.texts.AccessScheduleGroup'),
            policy: 'Unified.PacsDeviceAccessScheduleGroup',
          },
        },
      ],
    },
    {
      path: '/pacs/actionPlanGroup',
      name: 'PacActionPlanGroup',
      component: () => import('@/wave/pacs/device-mode-schedules/device-mode-schedule.vue'),
      meta: {
        title: t('Unified.texts.ActionPlanGroup'),
        policy: 'Unified.PacsDeviceModeSchedulesGroup',
      },
    },
  ],
};

export default Pacs;
