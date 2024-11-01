import { defineComponent } from 'vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import {
  DeviceMessagePanelService,
  FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelsInput as GetDeviceMessagePanelsInput,
} from '@/apis';
import EditDeviceMessagePanel from '@/wave/device-configuration/deviceMessagePanel/add-or-edit-device-message-panel/add-or-edit-device-message-panel.vue';
import Icon from '@/components/Icon/Icon.vue';
import mittEvent from '@/utils/eventBus';

export default defineComponent({
  name: 'AlertList',
  components: { Icon },
  mixins: [AppComponentBase],
  data() {
    return {
      /* floor列表 */
      resultData: [] as any[],
      /* 当前选中的 floor Item */
      floorlItem: {} as any,
      /* 当前选中的 floor id */
      floorValue: null,
      loading: false,
      /* 显示模型 */
      floorShow: false,
      deviceDetail: {} as any,
      /* alert列表 */
      alertData: [] as any[],
      isUnfold: true as Boolean,
      isFullscreen: false,
    };
  },
  created() {
    this.getAlert();
  },
  mounted() {
    mittEvent.on('opsPane:RefreshMessagePanel', this.RefreshFunction);
    mittEvent.on('opsPane:FullScreen', this.ToggleFullScreen);
  },
  methods: {
    RefreshFunction() {
      this.getAlert();
    },
    /* 获取getAlert*/
    getAlert() {
      const requestBody = {
        filter: {
          IsAlert: true,
          IsAlertConfirm: false,
        },
        maxResultCount: 10,
        skipCount: 0,
        sorting: 'creationTime Desc',
      } as GetDeviceMessagePanelsInput;
      DeviceMessagePanelService.postApiAppDeviceMessagePanelPaged({ requestBody }).then(
        (result) => {
          if (result.items) this.alertData = result.items;
        },
      );
    },
    alertDetails(item) {
      let selectItems = [] as any[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(EditDeviceMessagePanel, { pageDataList: selectItems })
        .subscribe((res) => {
          if (res) {
            this.getAlert();
            // (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /* 打开/收起面板 */
    unfoldClick(isUnfold) {
      this.isUnfold = isUnfold;
    },
    ToggleFullScreen(isFullscreen) {
      this.isFullscreen = isFullscreen;
    },
  },
});
