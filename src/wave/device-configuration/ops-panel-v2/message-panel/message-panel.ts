import AppComponentBase from '@/shared/component-base/app-component-base';
import { defineComponent } from 'vue';
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';
import DeviceMassagePanelView from '@/wave/device-configuration/deviceMessagePanel/device-massage-panel-view/device-massage-panel-view.vue';
import CreateOrEditDeviceMessagePanel from '@/wave/device-configuration/deviceMessagePanel/add-or-edit-device-message-panel/add-or-edit-device-message-panel.vue';
import {
  DeviceMessagePanelService,
  DeviceMessagePanelManagerService,
  Volo_Saas_Host_Dtos_SaasTenantDto,
} from '@/apis';
import { EyeFilled, DeleteFilled, FireFilled } from '@ant-design/icons-vue';
import mittEvent from '@/utils/eventBus';

export default defineComponent({
  name: 'CommandControlMessagePanel',
  components: { Vue3SeamlessScroll, EyeFilled, DeleteFilled, FireFilled },
  mixins: [AppComponentBase],

  data() {
    return {
      dataList: [] as Volo_Saas_Host_Dtos_SaasTenantDto[],
      loading: false,
      seamlessScroll: true, //开启滚动
      isUnfold: true,
      scollKey: 8798798,
    };
  },
  computed: {
    classOption() {
      return {
        step: 0.5, //数值越大速度滚动越快。
        isWatch: true,
        limitMoveNum: this.dataList.length, //开启无缝滚动的数据量。
        hoverStop: true, //是否启用鼠标 hover 控制。
        direction: 1, //方向: 0 往下 1 往上 2 向左 3 向右。
        openWatch: true,
        singleHeight: 0,
        singleWidth: 0,
        waitTime: 1000, //单步停止等待时间(默认值 1000ms)。
      };
    },
  },

  mounted() {
    this.seamlessScroll = true;
    this.getPageDtaList();
  },
  beforeUnmount() {},
  updated() {
    this.$nextTick(() => {
      // this.scollKey = Math.random() * (10 - 1) + 1;
    });
  },
  methods: {
    handleScroll(e) {
      // 处理鼠标滚轮事件，改变滚动位置
      const seamlessScroll = this.$refs.seamlessScroll as any;
      seamlessScroll.yPos = seamlessScroll.yPos - e.deltaY;
      // 边界判断
      if (seamlessScroll.yPos > 0) {
        seamlessScroll.yPos = 0;
      } else if (Math.abs(seamlessScroll.yPos) > seamlessScroll.realBoxHeight / 2) {
        seamlessScroll.yPos = 0;
      }
    },
    //获取面板数据
    getPageDtaList() {
      this.loading = true;
      const requestBody = {
        filter: {},
        maxResultCount: 20,
        skipCount: 0,
        sorting: 'submissionDateTime Desc',
      };
      DeviceMessagePanelService.postApiAppDeviceMessagePanelPaged({ requestBody })
        .then((res) => {
          this.dataList = res.items as Volo_Saas_Host_Dtos_SaasTenantDto[];
          this.loading = false;
        })
        .finally(() => {
          this.loading = false;
        });
    },

    /**
     * 确认警报
     * @param id
     */
    alertConfirm(id) {
      this.seamlessScroll = false;
      this.modalHelper
        .create(CreateOrEditDeviceMessagePanel, { pageDataList: [id] })
        .subscribe((res) => {
          if (res) {
            this.getPageDtaList();
            // if (this.$route.query.messagePanelId && id == this.$route.query.messagePanelId) {
            //   router.push({ path: '/main/ops-panel' });
            // }
          }
          this.seamlessScroll = true;
        });
    },
    /**
     * 删除警报
     * @param id
     */
    alertDelete(id) {
      this.confirm({
        iconType: 'warning',
        title: () => this.l('Unified.texts.ConfirmOperation'),
        content: this.l('Unified.texts.ConfirmDeleteXItemsWarningMessage'),
        onOk: () => {
          this.loading = true;
          DeviceMessagePanelManagerService.deleteApiAppDeviceMessagePanelManager({ id })
            .then((res) => {
              if (res) {
                this.getPageDtaList();
              }
            })
            .finally(() => {
              this.loading = false;
            });
        },
      });
    },
    /**
     * 警报查看
     */
    lookDeviceDateil(id) {
      this.seamlessScroll = false;

      this.modalHelper.create(DeviceMassagePanelView, { pageDataList: [id] }).subscribe(() => {
        this.seamlessScroll = true;
      });
    },
    /**
     * 警报查看
     */
    alertLookOver(id) {
      mittEvent.emit('deviceTabs:Refresh', { id });
      // DeviceMessagePanelService.getAlertDeviceConfig(id).then((res) => {
      //   //数据赋值

      //   this.loading = false;
      // });
    },
  },
});
