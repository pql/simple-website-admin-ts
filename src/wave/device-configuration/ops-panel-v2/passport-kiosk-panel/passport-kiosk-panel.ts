import { defineComponent } from 'vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import mittEvent from '@/utils/eventBus';
import PassportKioskMessageDetail from '@/wave/device-configuration/passport-kiosk-message-panel/passport-kiosk-message-detail/passport-kiosk-message-detail.vue';

import {
  PassportKioskMessagePanelService,
  FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto as PassportKioskMessagePanelListDto,
} from '@/apis';

export default defineComponent({
  components: {},
  mixins: [AppComponentBase],
  data() {
    return {
      visible: false,
      kioskData: [] as PassportKioskMessagePanelListDto[],
      listData: [],
      dataList: [] as any[],
      total: 0,
      pageCurrent: 1,
      pageSize: 10,
      loading: false,
    };
  },
  mounted() {
    mittEvent.on('opsPane:RefreshPassportKioskMessage', this.getPageDtaList);
  },
  methods: {
    //获取面板数据
    getPageDtaList(val) {
      if (!val || !val.messageId) return;
      PassportKioskMessagePanelService.getApiAppPassportKioskMessagePanelById({ id: val.messageId })
        .finally(() => {})
        .then((res: PassportKioskMessagePanelListDto) => {
          this.visible = true;
          this.kioskData.push(res);
          this.destroyMessage(5000);
        });
    },

    /**
     * 定时执行关闭卡片
     * @param time
     */
    destroyMessage(time) {
      if (this.kioskData && this.kioskData.length) {
        this.$nextTick(() => {
          const container = this.$refs.PassportKiosk as any;
          if (container.scrollHeight) {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: 'smooth',
            });
            // container.scrollTop = container.scrollHeight - 20;
          }
        });
        setTimeout(() => {
          this.kioskData.splice(0, 1);
        }, time);
      }
    },
    /**
     * 查看详情
     * @param item
     */
    viewDetail(item?) {
      const param = {
        pageDataList: [item?.id],
      };
      this.modalHelper
        .create(PassportKioskMessageDetail, { ...param }, { size: 'medium' })
        .subscribe(() => {});
    },
    /**
     * 关闭当前卡片
     * @param val
     */
    closeCard(val?) {
      if (this.kioskData.length) {
        const index = this.kioskData.findIndex((item) => item.id === val.id);
        this.kioskData.splice(index, 1);
      }
    },
  },
});
