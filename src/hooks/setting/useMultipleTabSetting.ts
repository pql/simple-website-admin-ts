import type { MultiTabsSetting } from '#/config';

import { computed } from 'vue';

import { AppStore } from '@/store/modules/app';

export function useMultipleTabSetting() {
  const appStore = AppStore.useStore();

  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show);

  const getShowQuick = computed(() => appStore.getMultiTabsSetting.showQuick);

  const getShowRedo = computed(() => appStore.getMultiTabsSetting.showRedo);

  const getShowFold = computed(() => appStore.getMultiTabsSetting.showFold);

  const getAutoCollapse = computed(() => appStore.getMultiTabsSetting.autoCollapse);

  function setMultipleTabSetting(multiTabsSetting: Partial<MultiTabsSetting>) {
    appStore.setProjectConfig({ multiTabsSetting });
  }
  return {
    setMultipleTabSetting,
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
    getAutoCollapse,
  };
}
