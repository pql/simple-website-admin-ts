import { defineComponent } from 'vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import CardHoldersInfor from '@/wave/device-configuration/ops-panel/device-tabs/card-holders-infor/card-holders-infor.vue';
import EditDeviceMessagePanel from '@/wave/device-configuration/deviceMessagePanel/add-or-edit-device-message-panel/add-or-edit-device-message-panel.vue';

import {
  ControlPanelService,
  FireBytes_Unified_Wave_ControlPanels_Dto_ExecuteDeviceTypeFunctionRequest as ExecuteDeviceTypeFunctionRequest,
  DeviceService,
  DeviceMessagePanelService,
  FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_GetDeviceMessagePanelsInput as GetDeviceMessagePanelsInput,
} from '@/apis';
import mittEvent from '@/utils/eventBus';
import { CtrlViewCamera } from '@/wave/component';

import Icon from '@/components/Icon/Icon.vue';
import { useTimezone } from '@/timezones/useTimezone';
import { APP_DARK_MODE_KEY } from '@/enums/cacheEnum';

const { fromUTCDateToLocalDateTime: formateDateToDatetime } = useTimezone();
export default defineComponent({
  name: 'DeviceTabs',
  components: { Icon },
  mixins: [AppComponentBase],
  data() {
    return {
      selectedRowKeys: [],
      activeKey: 'Information',
      /* alert列表 */
      alertData: [] as any[],
      /* transaction列表 */
      transactData: [] as any[],
      /* 当前选中的 设备 information */
      deviceDetail: {} as any,
      /* function 列表 */
      funList: [] as any[],
      loading: false,
      transactColumns: [
        {
          title: this.l('Action'),
          dataIndex: 'action',
          key: 'action',
          width: '90px',
        },
        {
          title: this.l('Date Time'),
          dataIndex: 'submissionDateTime',
          key: 'submissionDateTime',
        },
        {
          title: this.l('Name'),
          dataIndex: 'cardHolderName',
          key: 'cardHolderName',
        },
        {
          title: this.l('Event'),
          dataIndex: 'deviceFunction',
          key: 'deviceFunction',
          width: '90px',
        },
      ],
      alertColumns: [
        {
          title: this.l('Action'),
          dataIndex: 'action',
          key: 'action',
          width: '110px',
        },
        {
          title: this.l('Date Time'),
          dataIndex: 'submissionDateTime',
          key: 'submissionDateTime',
        },
        {
          title: this.l('Event'),
          dataIndex: 'deviceFunction',
          key: 'deviceFunction',
        },
        // {
        //   title: this.l('Is Alert Confirm'),
        //   dataIndex: 'isAlertConfirm',
        //   key: 'isAlertConfirm',
        // }
      ],
      /* 设备信息 */
      markerObj: {} as any,
      isUnfold: true as Boolean,
    };
  },

  computed: {
    theme() {
      const theme = localStorage.getItem(APP_DARK_MODE_KEY) || 'dark';
      return !!(theme == 'dark');
    },
  },
  created() {},
  mounted() {
    this.RefreshFunction();
    mittEvent.on('opsPane:RefreshMessagePanel', this.RefreshFunction);
    mittEvent.on('deviceTabs:Refresh', this.MessagePanel);
  },
  methods: {
    MessagePanel(val) {
      this.panelDeviceClick(val);
    },
    RefreshFunction() {
      if (!this.markerObj['id']) return;
      const pam: any = this.markerObj;
      // 刷新
      this.getTransaction(pam.id);
      this.getAlert(pam.id);
      this.getFunctionList(pam.id);
      this.getDevice(pam.id);
    },
    tabsChange() {
      this.getTabDetail();
    },
    /* 模型设备点击 */
    panelDeviceClick(marker) {
      this.markerObj = marker;
      this.getTabDetail();
      this.unfoldClick(true);
    },
    getTabDetail() {
      if (!this.markerObj['id']) return;
      const pam: any = this.markerObj;
      switch (this.activeKey) {
        case 'Information':
          this.getDevice(pam.id);
          break;
        case 'Transaction':
          this.getTransaction(pam.id);
          break;
        case 'Alert':
          this.getAlert(pam.id);
          break;
        case 'Function':
          this.getFunctionList(pam.id);
          break;
        default:
          break;
      }
    },
    /* 获取设备详情 */
    getDevice(id) {
      // this.loading = true;
      DeviceService.getApiAppDeviceForDetails({
        id: id,
      }).then((result) => {
        this.deviceDetail = result.device;
        // this.loading = false;
      });
    },
    /* 获取Transaction */
    getTransaction(deviceId) {
      // this.loading = true;
      const requestBody = {
        filter: {
          deviceId: deviceId,
          IsAlert: false,
        },
        maxResultCount: 10,
        skipCount: 0,
        sorting: 'creationTime Desc',
      } as GetDeviceMessagePanelsInput;
      DeviceMessagePanelService.postApiAppDeviceMessagePanelPaged({ requestBody }).then(
        (result) => {
          if (result.items) this.transactData = result.items;
          // this.loading = false;
        },
      );
    },
    /* 获取Alert */
    getAlert(deviceId) {
      // this.loading = true;

      const requestBody = {
        filter: {
          deviceId: deviceId,
          IsAlert: true,
        },
        maxResultCount: 10,
        skipCount: 0,
        sorting: 'creationTime Desc',
      } as GetDeviceMessagePanelsInput;
      DeviceMessagePanelService.postApiAppDeviceMessagePanelPaged({ requestBody }).then(
        (result) => {
          if (result.items) this.alertData = result.items;
          // this.loading = false;
        },
      );
    },

    /* 获取设备事件按钮 */
    getFunctionList(id) {
      // this.loading = true;
      this.funList = [] as any[];
      ControlPanelService.getApiAppControlPanelDeviceTypeFunctionByDeviceId({
        deviceId: id,
      }).then((result) => {
        this.funList = result;
        // this.loading = false;
      });
    },
    /* alert 添加  查看 */
    alertDetails(item) {
      let selectItems = [] as any[];
      if (!!item && item.id) {
        selectItems = [item.id];
      }
      this.modalHelper
        .create(EditDeviceMessagePanel, { pageDataList: selectItems })
        .subscribe((res) => {
          if (res) {
            // (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },
    /*  transaction详情 */
    transactionDetails(val) {
      this.modalHelper
        .create(
          CardHoldersInfor,
          {
            pageDataList: [
              {
                creatorId: val.creatorId,
                cardholderId: val.cardHolderId,
              },
            ],
          },
          { width: 900 },
        )
        .subscribe((res) => {
          if (res) {
            // (this.$refs.table as any).reloadGoFirstPage();
          }
        });
    },

    /* 设备操作按钮 */
    funcItemClick(item) {
      item.disabled = true;
      switch (item.buttonAction) {
        case 'SendCommand':
        case 'Send Command':
          this.executeDeviceTypeFunction(item);
          break;
        case 'CameraView':
        case 'Camera View':
          this.cameraView(item);
          break;
        case 'StatusView':
        case 'Status View':
          // this.statusView();
          break;
        case 'PeopleNearbyView':
        case 'People Nearby View':
          // this.peopleNearbyView();
          break;
        default:
          break;
      }
    },
    /* 发送操作指令 */
    executeDeviceTypeFunction(item) {
      const requestBody = {
        deviceTypeFunctionId: item.deviceTypeFunctionId,
        deviceId: this.markerObj.id,
      } as ExecuteDeviceTypeFunctionRequest;
      ControlPanelService.postApiAppControlPanelExecuteDeviceTypeFunction({
        requestBody,
      })
        .then(() => {
          this.notify.success({ message: this.l('SavedSuccessfully') });
        })
        .catch((err) => {
          this.notify.error({ message: this.l(err.body.error.code) });
        })
        .finally(() => {
          item.disabled = false;
        });
    },
    /* 查看摄像头Live */
    cameraView(item) {
      const pam = {
        deviceId: this.markerObj.id,
        deviceName: this.markerObj.title,
      };
      this.modalHelper.create(CtrlViewCamera, pam, { width: 900 }).subscribe((res) => {
        if (!res) return;
      });
      item.disabled = false;
      // this.success();
    },
    formateDatetime(dateTimeString) {
      // 判断字符串是否包含多余的引号
      const hasExtraQuotes = /^"(\\".*\\"|.*)"$/.test(dateTimeString);
      if (hasExtraQuotes) {
        // 去掉前后双引号和转义的双引号
        dateTimeString = dateTimeString.replace(/^"|"$/g, '').replace(/\\"/g, '"');
      }
      return formateDateToDatetime(dateTimeString);
    },
    /* 打开/收起面板 */
    unfoldClick(isUnfold) {
      this.isUnfold = isUnfold;
    },
  },
});
