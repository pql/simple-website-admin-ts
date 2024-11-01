import { defineComponent } from 'vue';
import { FloorPlan, ImagePlan, MapPlan } from '@/wave/component';
import LeftSider from './left-sider/left-sider.vue';
import RightSider from './right-sider/right-sider.vue';
import PassportKioskPanel from './passport-kiosk-panel/passport-kiosk-panel.vue';
import {
  ControlPanelService,
  ControlPanelTreeNodeService,
  FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ShowTablePanelInfoDto,
} from '@/apis';
import { ControlPanelService as ControlPanelServiceApi } from '@/wave/device-configuration/command-control/control-panel/control-panel-service';
import SampleComponentBase from '@/shared/component-base/sample-component-base';
import mittEvent from '@/utils/eventBus';
import _ from 'lodash-es';
import { createLocalStorage } from '@/utils/cache';
import { PAGE_FLOOR_PLAN_KEY } from '@/enums/cacheEnum';
import { useRouter } from 'vue-router';
import { AppConsts } from '@/abpPro/AppConsts';

const ls = createLocalStorage();
type FloorPlanType = InstanceType<typeof FloorPlan>;

export default defineComponent({
  components: {
    FloorPlan,
    ImagePlan,
    MapPlan,
    LeftSider,
    RightSider,
    PassportKioskPanel,
  },
  mixins: [SampleComponentBase],
  provide() {
    return {
      selectNodeChange: this.onSelectNode,
    };
  },
  data() {
    return {
      /** 当前选中树节点详情信息 */
      tablePanelInfo: {} as FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ShowTablePanelInfoDto,
      /* 获取设备信息 */
      controlPanelSer: new ControlPanelServiceApi(),
      updatePanle: false,
      isFullscreen: false,
      visualViewUrl: '',
    };
  },
  activated() {
    //处理打开路由缓存导致标点偏移
    this.$nextTick(() => {
      setTimeout(() => {
        this.updatePanle = true;
      }, 500);
    });
  },
  deactivated() {
    this.updatePanle = false;
  },
  mounted() {
    /* 监听设备状态 */
    // 发送信息  import mittEvent from '@/utils/eventBus';    mittEvent.emit('panel:refresh.DeviceStatus',[])
    //接收信息
    mittEvent.on('opsPane:RefreshDeviceStatus', this.refreshDeviceStatus);
    mittEvent.on('opsPane:FullScreen', this.toggleFullScreen);
    const router = useRouter();
    const { currentRoute } = router;
    if (currentRoute) {
      const routerName = currentRoute.value.name as string;
      const floorPlanCollect = ls.get(`${PAGE_FLOOR_PLAN_KEY}${routerName}`);
      if (floorPlanCollect && floorPlanCollect.nodeId) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.getTreeNodeShowTablePanelInfo(floorPlanCollect);
          });
        }, 500);
      }
    }

    // 监听事件
    window.addEventListener('message', (e) => {
      console.log('接收到avue页面传来message', e.data);
      if (typeof e.data === 'string') {
        const data = JSON.parse(e.data);
        const { equipmentId, type } = data;
        if (type === 'tapedEquipment') {
          const rightSiderRef: any = this.$refs.rightSiderRef;
          const deviceTabsRef: any = rightSiderRef.getDeviceTabsRef();
          deviceTabsRef.panelDeviceClick({ id: equipmentId });
        }
      }
    });
  },
  methods: {
    /** 推送数据给大屏 */
    postMessageValue(value) {
      const avueDom = document.getElementById('avue') as any;
      if (avueDom && value) {
        console.log('发送了数据给avue', JSON.stringify(value));
        avueDom.contentWindow.postMessage(JSON.stringify(value), '*');
      }
    },
    /* 选中node节点变化*/
    onSelectNode({ dto }: any) {
      const params = {
        nodeId: dto.nodeId,
        type: dto.type,
      };
      // localStorage.setItem("mmdto",JSON.stringify(params))
      this.getTreeNodeShowTablePanelInfo(params);
    },
    /**刷新设备状态 */
    async refreshDeviceStatus(item) {
      console.log('item', item);
      if (!item) return;
      if (item.deviceId && this.tablePanelInfo.graphicType === 'Avue') {
        this.postMessageValue({ equipmentId: item.deviceId, type: 'updateDeviceStatus' });
        return;
      }
      //根据模板id刷新模板
      const params: {
        boundBuildingId?: string;
        graphicPanelId?: string;
        isMapViewer?: boolean;
        deviceId?: string;
      } = {
        boundBuildingId: item.boundBuildingIdList[0],
        graphicPanelId: this.tablePanelInfo.graphicPanelId,
        isMapViewer: false,
        deviceId: item.deviceId,
      };

      try {
        /* 修改下面的接口 获取设备配置 */
        const result =
          await ControlPanelService.getApiAppControlPanelPlanDevicePointsSingle(params);
        // 组装设备信息标点信息
        const markDefs = await this.controlPanelSer.devicePoints2BimMarks([result]);
        const floorPlanRef = this.getFloorPlanRef();
        const marks = await Promise.all(markDefs);
        if (floorPlanRef && floorPlanRef.id === result.amsDevicePointView?.boundBuildingId) {
          // 修改设备标点
          floorPlanRef.updateBimMarks(marks);
        }
      } catch (error) {
        console.log('error', error);
      }
    },
    /* 获取树节点信息详情*/
    async getTreeNodeShowTablePanelInfo(option: { nodeId?: string; type?: string }) {
      // this.updatePanle = false;
      this.tablePanelInfo = {};
      const params = { nodeId: option.nodeId, type: option.type };
      try {
        const res =
          await ControlPanelTreeNodeService.getApiAppControlPanelTreeNodeShowTablePanelInfo(params);
        if (res) {
          this.tablePanelInfo = res;
          console.log('this.tablePanelInfo', this.tablePanelInfo);
          const { id, graphicPanelId, bladeVisualId } = this.tablePanelInfo;

          // todo http://localhost:4300 从appconfig中获取
          this.visualViewUrl = `${AppConsts.avueUrl}/view/${bladeVisualId}`;
          // this.updatePanle = true;
          this.loadBimMarkers(id, graphicPanelId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    /* 设备点击事件 */
    onNormalClick(marker) {
      console.log('marker', marker);
      try {
        const rightSiderRef: any = this.$refs.rightSiderRef;
        const deviceTabsRef: any = rightSiderRef.getDeviceTabsRef();
        this.$nextTick(() => {
          deviceTabsRef.panelDeviceClick(marker);
        });
      } catch (error) {
        console.log('error', error);
      }
    },
    /** 获取画图实例 */
    getFloorPlanRef() {
      return this.$refs.floorPlan as FloorPlanType;
    },
    /** 加载标注并绘制到3d视图 */
    async loadBimMarkers(boundBuildingId?: string, graphicPanelId?: string) {
      const params: {
        boundBuildingId?: string;
        graphicPanelId?: string;
        isMapViewer?: boolean;
        deviceId?: string;
      } = {
        boundBuildingId,
        graphicPanelId,
        isMapViewer: false,
      };
      const floorPlanRef = this.getFloorPlanRef();
      // 清空标点
      if (floorPlanRef && floorPlanRef?.createBimMarks) floorPlanRef?.createBimMarks([], true);

      try {
        const result = await ControlPanelService.getApiAppControlPanelPlanDevicePoints(params);
        if (_.isArray(result)) {
          if (result.length <= 0) return;
          // 创建标点
          const markDefs = await this.controlPanelSer.devicePoints2BimMarks(result);
          // 这里的 marks 是 markDefs Promise 解析后的值
          const marks = await Promise.all(markDefs);

          if (floorPlanRef && floorPlanRef.id === result[0]?.amsDevicePointView?.boundBuildingId) {
            console.log('marks', marks);
            floorPlanRef.createBimMarks(marks, true);
          }
        }
      } catch (error) {
        console.log('error', error);
      }
    },

    toggleFullScreen(isFullscreen) {
      this.isFullscreen = isFullscreen;
      try {
        if (this.isFullscreen) {
          document.getElementsByTagName('body')[0].classList.add('ops-full-screen');
        } else {
          document.getElementsByTagName('body')[0].classList.remove('ops-full-screen');
        }
      } catch (error) {}
    },
  },
});
