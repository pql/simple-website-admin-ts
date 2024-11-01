import { ContentEnum, RouterTransitionEnum } from '@/enums/appEnum';
import {
  MenuModeEnum,
  MenuTypeEnum,
  TopMenuAlignEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from '@/enums/menuEnum';

import { useI18n } from '@/hooks/web/useI18n';

const { t } = useI18n();

export enum HandlerEnum {
  CHANGE_LAYOUT,
  CHANGE_THEME_COLOR,
  CHANGE_THEME,
  // menu
  MENU_HAS_DRAG,
  MENU_ACCORDION,
  MENU_TRIGGER,
  MENU_TOP_ALIGN,
  MENU_COLLAPSED,
  MENU_COLLAPSED_SHOW_TITLE,
  MENU_WIDTH,
  MENU_SHOW_SIDEBAR,
  MENU_THEME,
  MENU_SPLIT,
  MENU_FIXED,
  MENU_CLOSE_MIX_SIDEBAR_ON_CHANGE,
  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,

  // header
  HEADER_SHOW,
  HEADER_THEME,
  HEADER_FIXED,

  HEADER_SEARCH,

  TABS_SHOW_QUICK,
  TABS_SHOW_REDO,
  TABS_SHOW,
  TABS_SHOW_FOLD,
  TABS_AUTO_COLLAPSE,

  LOCK_TIME,
  FULL_CONTENT,
  CONTENT_MODE,
  SHOW_BREADCRUMB,
  SHOW_BREADCRUMB_ICON,
  GRAY_MODE,
  COLOR_WEAK,
  SHOW_LOGO,
  SHOW_FOOTER,

  ROUTER_TRANSITION,
  OPEN_PROGRESS,
  OPEN_PAGE_LOADING,
  OPEN_ROUTE_TRANSITION,
}

export const contentModeOptions = [
  {
    value: ContentEnum.FULL,
    label: t('Unified.texts.layout:setting:contentModeFull'),
  },
  {
    value: ContentEnum.FIXED,
    label: t('Unified.texts.layout:setting:contentModeFixed'),
  },
];

export const topMenuAlignOptions = [
  {
    value: TopMenuAlignEnum.CENTER,
    label: t('Unified.texts.layout:setting:topMenuAlignRight'),
  },
  {
    value: TopMenuAlignEnum.START,
    label: t('Unified.texts.layout:setting:topMenuAlignLeft'),
  },
  {
    value: TopMenuAlignEnum.END,
    label: t('Unified.texts.layout:setting:topMenuAlignCenter'),
  },
];

export const getMenuTriggerOptions = (hideTop: boolean) => {
  return [
    {
      value: TriggerEnum.NONE,
      label: t('Unified.texts.layout:setting:menuTriggerNone'),
    },
    {
      value: TriggerEnum.FOOTER,
      label: t('Unified.texts.layout:setting:menuTriggerBottom'),
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: t('Unified.texts.layout:setting:menuTriggerTop'),
          },
        ]),
  ];
};

export const routerTransitionOptions = [
  RouterTransitionEnum.ZOOM_FADE,
  RouterTransitionEnum.FADE,
  RouterTransitionEnum.ZOOM_OUT,
  RouterTransitionEnum.FADE_SIDE,
  RouterTransitionEnum.FADE_BOTTOM,
  RouterTransitionEnum.FADE_SCALE,
].map((item) => {
  return {
    label: item,
    value: item,
  };
});

export const menuTypeListEnum = [
  {
    title: t('Unified.texts.layout:setting:menuTypeSidebar'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.SIDEBAR,
  },
  {
    title: t('Unified.texts.layout:setting:menuTypeMix'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX,
  },

  {
    title: t('Unified.texts.layout:setting:menuTypeTopMenu'),
    mode: MenuModeEnum.HORIZONTAL,
    type: MenuTypeEnum.TOP_MENU,
  },
  {
    title: t('Unified.texts.layout:setting:menuTypeMixSidebar'),
    mode: MenuModeEnum.INLINE,
    type: MenuTypeEnum.MIX_SIDEBAR,
  },
];

export const mixSidebarTriggerOptions = [
  {
    value: MixSidebarTriggerEnum.HOVER,
    label: t('Unified.texts.layout:setting:triggerHover'),
  },
  {
    value: MixSidebarTriggerEnum.CLICK,
    label: t('Unified.texts.layout:setting:triggerClick'),
  },
];
