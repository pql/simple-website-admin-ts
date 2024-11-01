import { defineComponent } from 'vue';
// import { cameraDateTimeService } from '/@/ams/shared';
import * as _ from 'lodash-es';
import idHelper from '@/utils/helper/id-helper';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { CameraItemView, ICameraPlayOptions, ControlPanelTree } from '/@/wave/component';
import {
  DeviceService,
  FireBytes_Unified_Wave_Devices_Dtos_CameraViewerGetDeviceServiceConfigDto as CameraViewerGetDeviceConfig,
  FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingRequest as TreeNodeLoadingRequest,
} from '@/apis';
import draggable from 'vuedraggable';
import moment from 'moment';
import { DateTime } from 'luxon';
// 视图布局选项
const VIEW_LAYOUT_OPTIONS = ['2x2', '3x3', '4x4'];
const VIEW_STYLE_FLEX = {
  '2x2': '50%',
  '3x3': '33.33%',
  '4x4': '25%',
};
export default defineComponent({
  components: { CameraItemView, draggable, ControlPanelTree },
  mixins: [AppComponentBase],
  data() {
    return {
      /** 展示模式：live,playback */
      viewMode: 'live', // live,playback
      /** 回复范围 */
      dateRange: this.getDefaultDateRange(), //cameraDateTimeService.getDefaultDateRange(),
      /** 布局 */
      viewLayout: '2x2', // 2x2,3x3,4x4
      /** 布局选项 */
      viewLayoutOptions: VIEW_LAYOUT_OPTIONS,
      /** 播放选项列表 */
      cameraPlayOptionList: [] as any[],
      /** 当前开启的第几个视图索引，不超过最大视图数量 */
      currentCameraItemViewIndex: 0,
      /** 行高或列宽 */
      rowHeightOrColWidth: '50%',
      /** 拖拽 */
      drag: false,
      /** 右键点击的索引 */
      rightClickIndex: -1,
    };
  },
  computed: {
    is3x3() {
      return this.viewLayout === '3x3';
    },
    is4x4() {
      return this.viewLayout === '4x4';
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
    },
  },
  watch: {},
  mounted() {
    this.viewLayoutChanged(this.viewLayout);
  },
  methods: {
    /** 左侧选中节点发生改变 */
    onSelectNodeChange(treeNode: { dataRef: TreeNodeLoadingRequest }) {
      if (treeNode.dataRef.type !== 'device') {
        return;
      }
      this.onCameraSelected(treeNode.dataRef.nodeId);
    },
    /** 摄像头设备被选中 */
    onCameraSelected(deviceId: string) {
      // 根据布局生成对应的配置到 cameraPlayOptionList 对应的索引中
      // 并且需要计数进行顺序替换，队列的形式
      // 重置计数
      const count = this.getCameraItemViewCount() || 0;

      // 判断设备是否选中过，选中过直接跳过
      if (this.cameraPlayOptionList.find((o) => o.deviceId === deviceId)) {
        return;
      }

      // 获取当前应该更新的控件索引
      let index = this.cameraPlayOptionList.findIndex((o) => !o.deviceId);
      if (index === -1) {
        // 普通计数
        if (this.currentCameraItemViewIndex >= count) {
          this.currentCameraItemViewIndex = 0;
        }
        index = this.currentCameraItemViewIndex++;
      }

      // 视图索引常量
      const viewIndex = index;

      // 获取设备信息

      DeviceService.postApiAppDeviceCameraViewerGetDeviceServiceConfig({ input: deviceId }).then(
        (deviceConfig: CameraViewerGetDeviceConfig) => {
          // 找不到在线的 interface service
          if (!deviceConfig.serviceIp) {
            this.message.error('There is no online video server');
            return;
          }
          // 创建播放配置
          const playOptions = this.createCameraPlayOptions(deviceConfig);
          // 更新视图信息
          this.setCameraPlayOptions(viewIndex, {
            ...playOptions,
          });
        },
      );
    },
    /** 视图模式修改 */
    viewModeChanged(e: string) {
      const count = this.getCameraItemViewCount() || 0;
      for (let index = 0; index < count; index++) {
        // 替换现有播放配置
        const playOptions = this.getCameraPlayOptions(index);
        playOptions.mode = e as any;

        // 更新配置到视图中
        this.setCameraPlayOptions(index, {
          ...playOptions,
        });
      }
    },
    /** 视图布局修改 */
    viewLayoutChanged(e: string) {
      // 容器布局
      this.rowHeightOrColWidth = VIEW_STYLE_FLEX[e];
      // 总数
      const oldCount = this.cameraPlayOptionList.length;
      const newCount = this.getCameraItemViewCount() || 0;

      //
      const oldList: any[] = this.cameraPlayOptionList;
      const newList: any[] = [];

      // 第一次创建
      if (oldCount === 0) {
        for (let i = 0; i < newCount; i++) {
          newList.push(this.createCameraPlayOptions());
        }
      }
      // 总数变大
      else if (newCount > oldCount) {
        newList.push(...oldList);
        for (let i = oldCount; i < newCount; i++) {
          newList.push(this.createCameraPlayOptions());
        }
      }
      // 总数变小
      else if (oldCount > newCount) {
        for (let i = 0; i < newCount; i++) {
          newList.push(oldList[i]);
        }
      }

      // 播放配置
      this.cameraPlayOptionList = [...newList];
    },
    /** 回放时间变更 */
    playbackRangeChanged(e) {
      if (!Array.isArray(e)) {
        e = [null, null];
      }
      let time;
      if (e.length === 0) {
        e = [null, null];
      } else {
        time = [e[0], e[1]];
      }
      console.log('time', time);
      // 修改回放时间
      // 遍历更新所有视图的宽高
      const count = this.getCameraItemViewCount() || 0;
      for (let index = 0; index < count; index++) {
        /// 更新配置项
        const playOptions = this.getCameraPlayOptions(index);
        playOptions.playBackOptions.dateRange = [...time];

        // 更新配置到视图中
        this.setCameraPlayOptions(index, {
          ...playOptions,
        });
      }
    },
    /** 获取当前页面CameraItemView实例 */
    getCameraItemViewCount() {
      switch (this.viewLayout) {
        case '2x2':
          return 4;
        case '3x3':
          return 9;
        case '4x4':
          return 16;
      }
    },
    /** 根据编号获取对应的CameraItemView实例 */
    getCameraItemView(index: number) {
      return this.$refs[`camera-item-${index}`] as any;
    },
    /** 获取设备播放选项 */
    getCameraPlayOptions(index: number) {
      let currentPlayOptions = this.cameraPlayOptionList[index];
      if (!currentPlayOptions) {
        currentPlayOptions = this.createCameraPlayOptions();
        // 更新到字典中
        this.cameraPlayOptionList[index] = currentPlayOptions;
      }

      return currentPlayOptions;
    },
    /** 更新播放字典配置 */
    setCameraPlayOptions(index: number, options: any) {
      // 重置配置
      if (!options) {
        options = this.createCameraPlayOptions();
      }
      this.cameraPlayOptionList[index] = options;
    },
    /** 创建播放器配置 */
    createCameraPlayOptions(deviceConfig: CameraViewerGetDeviceConfig = {}) {
      // 根据option中deviceid获取deviceConfig
      const options: ICameraPlayOptions = {
        id: idHelper.getId(),
        mode: this.viewMode as any,
        deviceId: deviceConfig.id ?? '',
        deviceName: deviceConfig.deviceName ?? '',
        channel: deviceConfig.deviceId ?? '',
        serviceIp: deviceConfig.serviceIp ?? '',
        servicePort: deviceConfig.servicePort,
        serviceId: deviceConfig.serviceId ?? '',
        servicePassword: deviceConfig.servicePassword ?? '',
        dateRange: [...this.dateRange],
        isSSL: deviceConfig.isEnableSSL,
      };
      return options;
    },
    /** 获取ice server */
    getIceServers() {
      // const val = abp.setting.get('AMS:IceServers');
      // if (!val || val === '') {
      //   abp.log.warn(
      //     'camera ice server is default! stun:stun1.l.google.com:19302,stun:stun2.l.google.com:19305'
      //   );
      //   return ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19305'];
      // }
      const val = 'stun:stun1.l.google.com:19302, stun:stun2.l.google.com:19305';
      return val.split(',');
    },
    /** 右击 */
    openMenu(e: any, index: number) {
      this.rightClickIndex = index;
    },
    /** 重新加载当前camera播放 */
    cameraReload() {
      if (this.rightClickIndex == -1) {
        return;
      }
      const index = this.rightClickIndex;
      const playOptions = this.getCameraPlayOptions(index);
      this.setCameraPlayOptions(index, {
        ...playOptions,
      });
      this.rightClickIndex = -1;
    },
    /** 清空当前camera播放 */
    cameraClear() {
      if (this.rightClickIndex == -1) {
        return;
      }
      this.setCameraPlayOptions(this.rightClickIndex, undefined);
      this.rightClickIndex = -1;
    },

    /** 获取默认时间范围，当前时间减去1小时5分钟 */
    getDefaultDateRange(): any[] {
      const timestamp = Date.now();
      const rangeStart = moment(timestamp - 60 * 65 * 1000).format('YYYY-MM-DD HH:mm:ss');
      const rangeEnd = moment(timestamp - 60 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss');
      console.log('dwd', rangeStart);
      return [rangeStart, rangeEnd];
    },
  },
});
