import { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

export const DeviceConfiguration: AppRouteModule = {
  path: '/device-configuration',
  name: 'DeviceConfiguration',
  redirect: '/device-configuration',
  component: LAYOUT,
  meta: {
    icon: 'icon-f-Device',
    title: t('Unified.texts.SiteConfiguration'),
    orderNo: 25,
  },
  children: [
    {
      path: '/device-configuration/design',
      name: 'SiteConfigurationDesign',
      meta: {
        title: t('Unified.texts.Design'),
        policy: '',
      },
      children: [
        {
          path: '/device-configuration/design/graphicPanelType',
          name: 'SiteConfigurationDesignGraphicPanelType',
          component: () =>
            import('@/wave/device-configuration/graphicPanelType/graphicPanelType.vue'),
          meta: {
            title: t('Unified.texts.Menu:GraphicPanelType'),
            policy: 'Unified.GraphicPanelType',
          },
        },
        {
          path: '/device-configuration/design/graphicPanel',
          name: 'SiteConfigurationDesignGraphicPanel',
          component: () => import('@/wave/device-configuration/graphicPanel/graphicPanel.vue'),
          meta: {
            title: t('Unified.texts.Menu:GraphicPanel'),
            policy: 'Unified.GraphicPanel',
          },
        },
        {
          path: '/device-configuration/design/building-floor-model',
          name: 'SiteConfigurationDesignBuildingFloorModel',
          component: () =>
            import('@/wave/device-configuration/building-floor-model/building-floor-model.vue'),
          meta: {
            title: t('Unified.texts.BuildingFloorModel'),
            policy: 'Unified.BuildingFloorModel',
          },
        },
        {
          path: '/device-configuration/design/site-lcon-setting',
          name: 'SiteConfigurationDesignSiteIconSetting',
          component: () =>
            import('@/wave/device-configuration/site-lcon-setting/site-lcon-setting.vue'),
          meta: {
            title: t('Unified.texts.SiteIcons'),
            policy: 'Unified.SiteIconSetting',
          },
        },
        {
          path: '/device-configuration/design/map-tile-model',
          name: 'SiteConfigurationDesignMapTileModel',
          component: () => import('@/wave/device-configuration/map-tile-model/map-tile-model.vue'),
          meta: {
            title: t('Unified.texts.MapTileModel'),
            policy: 'Unified.MapTileModel',
          },
        },
      ],
    },
    {
      path: '/device-configuration/property',
      name: 'SiteConfigurationProperty',
      meta: {
        title: t('Unified.texts.Property'),
        policy: '',
      },
      children: [
        {
          path: '/device-configuration/property/site',
          name: 'SiteConfigurationPropertySite',
          component: () => import('@/wave/device-configuration/sites/siteList.vue'),
          meta: {
            title: t('Unified.texts.Site'),
            policy: 'Unified.Site',
          },
        },
        {
          path: '/device-configuration/property/building',
          name: 'SiteConfigurationPropertyBuilding',
          component: () => import('@/wave/device-configuration/buildings/buildingList.vue'),
          meta: {
            title: t('Unified.texts.Building'),
            policy: 'Unified.Building',
          },
        },
        {
          path: '/device-configuration/property/building-floor',
          name: 'SiteConfigurationPropertyBuildingFloor',
          component: () =>
            import('@/wave/device-configuration/building-floor/building-floorList.vue'),
          meta: {
            title: t('Unified.texts.Floor'),
            policy: 'Unified.BuildingFloor',
          },
        },
      ],
    },
    {
      path: '/device-configuration/interface',
      name: 'SiteConfigurationInterface',
      meta: {
        title: t('Unified.texts.Interface'),
        policy: '',
      },
      children: [
        {
          path: '/device-configuration/interface/brand',
          name: 'SiteConfigurationInterfaceBrand',
          component: () =>
            import('@/wave/device-configuration/interface-brand/interface-brand.vue'),
          meta: {
            title: t('Unified.texts.Brand'),
            policy: 'Unified.InterfaceBrand',
          },
        },
        {
          path: '/device-configuration/interface/service',
          name: 'SiteConfigurationInterfaceService',
          component: () =>
            import('@/wave/device-configuration/interface-service/interface-service.vue'),
          meta: {
            title: t('Unified.texts.Service'),
            policy: 'Unified.InterfaceService',
          },
        },
      ],
    },
    {
      path: '/device-configuration/device',
      name: 'SiteConfigurationDevice',
      meta: {
        title: t('Unified.texts.Device'),
        policy: '',
      },
      children: [
        {
          path: '/device-configuration/device/brand',
          name: 'SiteConfigurationDeviceBrand',
          component: () => import('@/wave/device-configuration/device-brand/device-brand.vue'),
          meta: {
            title: t('Unified.texts.Brand'),
            policy: 'Unified.Brand',
          },
        },
        {
          path: '/device-configuration/device/type',
          name: 'SiteConfigurationDeviceType',
          component: () => import('@/wave/device-configuration/device-type/device-type.vue'),
          meta: {
            title: t('Unified.texts.Type'),
            policy: 'Unified.DeviceType',
          },
        },
        {
          path: '/device-configuration/device/category',
          name: 'SiteConfigurationDeviceCategory',
          component: () =>
            import('@/wave/device-configuration/device-category/device-category.vue'),
          meta: {
            title: t('Unified.texts.Category'),
            policy: 'Unified.DeviceCategory',
          },
        },
        {
          path: '/device-configuration/device/status',
          name: 'SiteConfigurationDeviceStatus',
          component: () => import('@/wave/device-configuration/deviceStatus/deviceStatus.vue'),
          meta: {
            title: t('Unified.texts.Status'),
            policy: 'Unified.DeviceStatus',
          },
        },
        {
          path: '/device-configuration/device/typeFunction',
          name: 'SiteConfigurationDeviceTypeFunction',
          component: () =>
            import('@/wave/device-configuration/deviceTypeFunction/deviceTypeFunction.vue'),
          meta: {
            title: t('Unified.texts.Function'),
            policy: 'Unified.DeviceTypeFunction',
          },
        },
        {
          path: '/device-configuration/device/credential-profile',
          name: 'SiteConfigurationDeviceCredentialProfile',
          component: () =>
            import(
              '@/wave/device-configuration/device-credential-profile/device-credential-profile.vue'
            ),
          meta: {
            title: t('Unified.texts.Credential'),
            policy: 'Unified.DeviceCredentialProfile',
          },
        },
        {
          path: '/device-configuration/device/configuration',
          name: 'SiteConfigurationDeviceConfiguration',
          component: () => import('@/wave/device-configuration/device/device.vue'),
          meta: {
            title: t('Unified.texts.Configuration'),
            policy: 'Unified.Device',
          },
        },
        {
          path: '/device-configuration/device/zone',
          name: 'SiteConfigurationDeviceZone',
          component: () => import('@/wave/device-configuration/device-zone/device-zone.vue'),
          meta: {
            title: t('Unified.texts.Zone'),
            policy: 'Unified.Zone',
          },
        },
        {
          path: '/device-configuration/device/commandgroup',
          name: 'SiteConfigurationDeviceCommandgroup',
          component: () => import('@/wave/device-configuration/device-group/device-group.vue'),
          meta: {
            title: t('Unified.texts.Broadcast'),
            policy: 'Unified.CommandGroup',
          },
        },
      ],
    },
  ],
};

export default DeviceConfiguration;
