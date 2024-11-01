import { defineComponent } from 'vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { ControlPanelService as ControlPanelServiceApi } from '@/wave/device-configuration/command-control/control-panel/control-panel-service';
import {
  ControlPanelService,
  ControlPanelTreeNodeService,
  FireBytes_Unified_Wave_ControlPanels_Dto_CreateGraphicPanelDevicePointViewInput as CreateGraphicPanelDevicePointViewInput,
} from '@/apis';
import { FloorPlan } from '@/wave/component';
import DeviceTabs from './device-tabs/device-tabs.vue';
import AlertList from './alert-list/alert-list.vue';
import mittEvent from '@/utils/eventBus';
import { createLocalStorage } from '@/utils/cache';
import { PAGE_FLOOR_PLAN_KEY } from '@/enums/cacheEnum';
import { useRouter } from 'vue-router';

const ls = createLocalStorage();
type FloorPlanType = InstanceType<typeof FloorPlan>;
export default defineComponent({
  name: 'OpsPanel',
  components: {
    FloorPlan,
    DeviceTabs,
    AlertList,
  },
  mixins: [AppComponentBase],
  data() {
    return {
      /* 获取设备信息 */
      controlPanelSer: new ControlPanelServiceApi(),
      /* floor列表 */
      resultData: [] as any[],
      /* 当前选中的 floor Item */
      floorlItem: {} as any,
      /* 当前选中的 floor id */
      floorValue: undefined,
      loading: false,
      /* 显示模型 */
      floorShow: false,
    };
  },
  created() {
    this.getControlePanelTreeLoading();
  },
  mounted() {
    /* 监听设备状态 */
    // 发送信息  import mittEvent from '@/utils/eventBus';    mittEvent.emit('panel:refresh.DeviceStatus',[])
    //接收信息
    mittEvent.on('opsPane:RefreshDeviceStatus', this.RefreshDeviceStatus);
    const router = useRouter();
    const { currentRoute } = router;
    if (currentRoute) {
      const routerName = currentRoute.value.name as string;
      const floorPlanCollect = ls.get(`${PAGE_FLOOR_PLAN_KEY}${routerName}`);
      if (floorPlanCollect) {
        this.getPanelInfo(floorPlanCollect);
        // this.floorValue = floorPlanCollect.nodeId;
      }
    }
  },
  methods: {
    /* 选择 floorPanel*/
    floorHandle(value, option) {
      this.getPanelInfo(option);
    },
    /* 获取 floorPanel详情*/
    async getPanelInfo(option) {
      const pam = { nodeId: option.nodeId, type: option.type };
      const res =
        await ControlPanelTreeNodeService.getApiAppControlPanelTreeNodeShowTablePanelInfo(pam);
      if (res) {
        this.floorlItem = { ...res, graphicPanelId: res.graphicPanelId };
        this.floorShow = true;
        this.loadBimMarkers(res.id, res.graphicPanelId);
      }
    },
    /* 获取所有的floor */
    getControlePanelTreeLoading() {
      this.loading = true;
      const requestBody = { type: 'floor' };
      const that = this;
      ControlPanelTreeNodeService.postApiAppControlPanelTreeNodeControlePanelTreeNodeAllTypeLoading(
        { requestBody },
      )
        .then(async (result) => {
          //遍历数据label和value
          const arr: any[] = [];
          for (const item of result) {
            let treeItem: any = {};
            treeItem = item;
            treeItem.label = item.nodeName;
            treeItem.value = item.id;
            arr.push(treeItem);
          }
          /* 默认加载第一个 */
          // if (!that.floorShow && arr.length) {
          //   that.floorValue = arr[0].id
          //   that.getPanelInfo(arr[0])
          // }
          that.resultData = arr;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    /* 设备点击事件 */
    onNormalClick(marker) {
      try {
        this.$nextTick(() => {
          (this.$refs['DeviceTabs'] as any).panelDeviceClick(marker);
        });
      } catch (error) {}
    },
    /** 加载标注并绘制到3d视图 */
    loadBimMarkers(buildingId, graphicPanelId) {
      const pam = {
        boundBuildingId: buildingId,
        graphicPanelId: graphicPanelId,
        isMapViewer: false,
      };
      const floorPlans: any = this.getFloorPlan();
      // 清空标点
      if (floorPlans?.createBimMarks) floorPlans?.createBimMarks(null, true);
      ControlPanelService.getApiAppControlPanelPlanDevicePoints(pam).then((res: any[]) => {
        if (res.length <= 0) {
          return;
        }
        this.controlPanelSer.devicePoints2BimMarks(res).then((markDefs: any) => {
          // 创建标点
          Promise.all(markDefs).then((marks) => {
            // 这里的 marks 是 markDefs Promise 解析后的值
            if (floorPlans && floorPlans.id === res[0]?.amsDevicePointView.boundBuildingId)
              floorPlans.createBimMarks(marks, true);
          });
        });
      });
    },
    /**刷新设备状态 */
    RefreshDeviceStatus(item) {
      console.log('opsPane:RefreshDeviceStatus 来了', item);

      if (!item) return;
      //根据模板id刷新模板
      const pam = {
        boundBuildingId: item.boundBuildingIdList[0],
        graphicPanelId: this.floorlItem.graphicPanelId,
        isMapViewer: false,
        deviceId: item.deviceId,
      };
      /* 修改下面的接口 获取设备配置 */
      ControlPanelService.getApiAppControlPanelPlanDevicePointsSingle(pam).then((res: any) => {
        // 组装设备信息标点信息
        this.controlPanelSer.devicePoints2BimMarks([res]).then((markDefs: any) => {
          const floorPlans: any = this.getFloorPlan();
          Promise.all(markDefs).then((marks) => {
            if (floorPlans && floorPlans.id === res.amsDevicePointView.boundBuildingId)
              // 修改设备标点
              floorPlans.updateBimMarks(marks, false);
          });
        });
      });
    },
    /** 获取画图实例 */
    getFloorPlan() {
      return this.$refs.floorPlan as FloorPlanType[];
    },
  },
});
