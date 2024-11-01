import { defineStore, Pinia } from 'pinia';
import { store } from '@/store';
import { createLocalStorage } from '@/utils/cache';
import { COMPONENT_MODAL_SETTING_KEY } from '@/enums/cacheEnum';

const ls = createLocalStorage();

export const defaultComponentModalSettings: ComponentModalSettingState = {
  showCancelButton: false,
  showNextStepButton: false,
};

const lsComponentModalSetting =
  ls.get(COMPONENT_MODAL_SETTING_KEY) || defaultComponentModalSettings;

interface ComponentModalSettingState {
  // 是否显示"取消"按钮
  showCancelButton: boolean;
  // 是否显示"下一步"按钮
  showNextStepButton: boolean;
}

export class ComponentModalSettingStore {
  public static useStore(pinia?: Pinia) {
    const storeDefinition = defineStore({
      id: 'component-modal-setting',
      state: (): ComponentModalSettingState => ({
        ...lsComponentModalSetting,
      }),
      getters: {
        getShowCancelButton(state) {
          return state.showCancelButton;
        },
        getShowNextStepButton(state) {
          return state.showNextStepButton;
        },
      },
      actions: {
        setCancelButton(showCancelButton: boolean) {
          this.showCancelButton = showCancelButton;
          lsComponentModalSetting.showCancelButton = showCancelButton;
          ls.set(COMPONENT_MODAL_SETTING_KEY, lsComponentModalSetting);
        },
        setShowNextStepButton(showNextStepButton: boolean) {
          this.showNextStepButton = showNextStepButton;
          lsComponentModalSetting.showNextStepButton = showNextStepButton;
          ls.set(COMPONENT_MODAL_SETTING_KEY, lsComponentModalSetting);
        },
        setButtonsDisplayState(settings: ComponentModalSettingState) {
          const { showCancelButton, showNextStepButton } = settings;
          this.showCancelButton = showCancelButton;
          this.showNextStepButton = showNextStepButton;
          ls.set(COMPONENT_MODAL_SETTING_KEY, settings);
        },
      },
    });
    return storeDefinition(pinia);
  }

  // Need to be used outside the setup
  public static useStoreWithOut() {
    return this.useStore(store);
  }
}
