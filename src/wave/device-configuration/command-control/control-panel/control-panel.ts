import { defineComponent } from 'vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { FloorPlan, ImagePlan, MapPlan, CTRL_VIEW_DICT, ControlPanelTree } from '@/wave/component';
import { ControlPanelService as ControlPanelServiceApi } from '@/wave/device-configuration/command-control/control-panel/control-panel-service';
import { PickResult } from '@xeokit/xeokit-sdk/dist/xeokit-sdk.es5';
import mittEvent from '@/utils/eventBus';
import {
  ControlPanelService,
  ControlPanelTreeNodeService,
  FireBytes_Unified_Wave_ControlPanels_Dto_CreateGraphicPanelDevicePointViewInput as CreateGraphicPanelDevicePointViewInput,
} from '@/apis';
import { Modal } from 'ant-design-vue';
import { AppConsts } from '@/abpPro/AppConsts';
// import { EvnetComponentBase } from './event-component-base';
type FloorPlanType = InstanceType<typeof FloorPlan>;
type MapType = InstanceType<typeof MapPlan>;
type ImagePlanType = InstanceType<typeof ImagePlan>;
// import mittEvent from '@/utils/eventBus';
export default defineComponent({
  name: 'ControlPanelDesign1',
  components: {
    ImagePlan,
    FloorPlan,
    MapPlan,
    ControlPanelTree,
    Modal,
  },
  mixins: [AppComponentBase],
  data() {
    return {
      /** 获取设备信息 */
      controlPanelSer: new ControlPanelServiceApi(),
      /** 当前激活的选项，  1:map  2:Floor Plan  3:Case Management */
      currentTab: '1',
      /** 隐藏添加 */
      hideAdd: true,
      /** 右侧面板集合 */
      panels: [] as any[],
      /** 是否为绑定模式 */
      isBinding: false,
      /** 标记点位的id */
      bindingId: '' as string,
      /** 标记点位的类型 */
      bindingType: String,
      /** 是否是设计模式 */
      isDesign: true,
      /** 绑定模态框展示 */
      bindingModalDispay: false,
      /** 用于弹窗显示隐藏 */
      visible: false,
      /** 是否设置为默认的视图 */
      isDefultBoundBuilding: false,
      /** 绑定对象 */
      bindingObj: {} as any,
      isFullscreen: false,
      updatePanle: false,
      visualViewUrl: '',
    };
  },
  created() {},
  activated() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.updatePanle = true;
      }, 400);
    });
  },
  deactivated() {
    this.updatePanle = false;
  },
  mounted() {
    /* 监听设备状态 */
    // 发送信息    mittEvent.emit('panel:refresh.DeviceStatus',[])
    //接收信息
    // mittEvent.on('panel:refresh.DeviceStatus', this.RefreshDeviceStatus);
    mittEvent.on('opsPane:FullScreen', this.toggleFullScreen);
    this.updatePanle = true;
  },
  methods: {
    postMessage(data) {
      const iframe: any = document.getElementById('avue');
      if (iframe) {
        iframe.contentWindow && iframe.contentWindow.postMessage(data, '*');
      }
    },
    /** 右侧tab编辑事件 */
    tabEdit(targetKey: string | MouseEvent, action: string) {
      if (action === 'remove') {
        this.removeTab(targetKey as string);
      }
    },
    /** 删除标签 */
    removeTab(targetKey: string) {
      // 计算关闭标签后显示那个标签
      let lastIndex = 0;
      for (let i = 0; i < this.panels.length; i++) {
        const item = this.panels[i];
        if (item.id === targetKey) {
          lastIndex = i - 1;
          break;
        }
      }
      this.panels = this.panels.filter((pane) => pane.id != targetKey);
      if (this.panels.length && this.currentTab === targetKey) {
        if (lastIndex >= 0) {
          this.currentTab = this.panels[lastIndex].id;
        } else {
          this.currentTab = this.panels[0].id;
        }
      }
    },
    /** 3d视图点击 */
    onBimViewerClick(pickResult: PickResult) {
      if (!this.isBinding) {
        return;
      }
      if (this.bindingModalDispay) {
        return;
      }
      this.bindingModalDispay = true;
      this.visible = true;
      this.bindingObj = pickResult;
    },
    /** 绑定标点 提交 */
    bindingMarker(pickResult: any, isDefultBoundBuilding: boolean, buildingId: string) {
      if (!pickResult) return;
      this.isBinding = false;
      const graphicPanelId = pickResult.graphicPanelId;
      const pam: CreateGraphicPanelDevicePointViewInput = {
        deviceId: this.bindingId,
        graphicPanelId: graphicPanelId,
        pointXvalue: pickResult._worldPos[0],
        pointYvalue: pickResult._worldPos[1],
        pointZvalue: pickResult._worldPos[2],
        isDefultBoundBuilding: isDefultBoundBuilding,
        boundBuildingId: buildingId,
      };
      ControlPanelService.postApiAppControlPanelGraphicPanelDevicePointView({ requestBody: pam })
        .finally(() => {})
        .then((res) => {
          this.loadBimMarkers(buildingId, graphicPanelId);
        });

      this.bindingModalDispay = false;
    },
    /** 3d视图标记点击 */
    onMarkClick(marker) {
      const deviceId = marker.id; // 设备id
      const deviceName = marker.title; // 设备名称
      //将类型小写和去除空格方便类型匹配
      const commandMode = marker.commandMode.toLowerCase().replace(/\s*/g, ''); // 设备类型

      const deviceCtrlViewDef = CTRL_VIEW_DICT[commandMode];
      if (!deviceCtrlViewDef) {
        return;
      }
      ControlPanelService.getApiAppControlPanelDeviceTypeFunctionByDeviceId(deviceId).then(
        (res) => {
          if (res.length == 0) {
            return;
          }
          this.modalHelper
            .create(
              deviceCtrlViewDef.component,
              {
                deviceId: deviceId,
                deviceName: deviceName,
                deviceTypeFunctionData: res,
              },
              { width: deviceCtrlViewDef.width },
            )
            .subscribe((res) => {
              this.loadBimMarkers(marker.boundBuildingId, marker.graphicPanelId);
            });
        },
      );
    },
    /** 加载标注并绘制到3d视图 */
    loadBimMarkers(buildingId, graphicPanelId) {
      const pam = {
        boundBuildingId: buildingId,
        graphicPanelId: graphicPanelId,
        isMapViewer: false,
      };
      ControlPanelService.getApiAppControlPanelPlanDevicePoints(pam).then((res: any[]) => {
        if (res.length <= 0) {
          return;
        }
        // 画图
        this.controlPanelSer.devicePoints2BimMarks(res).then((markDefs: any) => {
          // 这里的 marks 是 markDefs Promise 解析后的值
          Promise.all(markDefs).then((marks) => {
            const floorPlans = this.getFloorPlan();
            for (const floorPlan of floorPlans) {
              /* 判断tabs页面 */
              if (floorPlan.id == res[0]?.amsDevicePointView.boundBuildingId)
                floorPlan.createBimMarks(marks);
            }
          });
        });
      });
    },
    /** 获取模型实例 */
    getFloorPlan() {
      return this.$refs.floorPlan as FloorPlanType[];
    },
    /** 获取地图实例 */
    getMap() {
      return this.$refs.map as MapType[];
    },
    /** 左侧树选中项发生改变 */
    onShowTable(nodeInfo) {
      // 判断tabs页面数量
      if (this.panels.length === 5) {
        this.notify.warn({ message: 'Maximum five tabs' });
        return;
      }

      // 是否有操作权限
      if (!nodeInfo.isAction) {
        return;
      }

      // 节点类型是否只是打开table
      if (!['site', 'building', 'floor'].includes(nodeInfo.type)) {
        return;
      }

      // 判断是否已经存在
      const isHave = this.panels.some((o) => o.id === nodeInfo.nodeId);

      // 切换到新的tab页
      if (isHave) {
        this.currentTab = nodeInfo.nodeId;
        return;
      }
      // 不存在则添加
      const pam = { nodeId: nodeInfo.nodeId, type: nodeInfo.type };
      ControlPanelTreeNodeService.getApiAppControlPanelTreeNodeShowTablePanelInfo(pam).then(
        (res) => {
          /* todo 此处有警告待处理 */
          this.panels = this.panels.concat(res);

          // todo http://localhost:4300/应该从appconfig中获取
          this.visualViewUrl = `${AppConsts.avueUrl}/view/${res.bladeVisualId}`;
          this.currentTab = res.id || '';
        },
      );
    },
    /**刷新设备状态 */
    RefreshDeviceStatus(boundBuildingIds) {
      console.log('control-panel panel:refresh.DeviceStatus 来了', boundBuildingIds);
      //根据模板id刷新模板
      for (const boundBuildingId of boundBuildingIds) {
        if (this.$refs.floorPlan) {
          const floorPlans = this.$refs.floorPlan as FloorPlanType[];
          for (const floorPlan of floorPlans) {
            if (boundBuildingId == floorPlan.id) {
              this.loadBimMarkers(boundBuildingId, floorPlan.graphicPanelId);
            }
          }
        }
        /* 地图 */
        if (this.$refs.map) {
          const maps = this.$refs.map as MapType[];
          for (const map of maps) {
            if (boundBuildingId == map.id) {
              map.refreshDeviceStatus();
            }
          }
        }
        if (this.$refs.image) {
          const imagePlans = this.$refs.image as ImagePlanType[];
          for (const imagePlan of imagePlans) {
            if (boundBuildingId == imagePlan.id) {
              imagePlan.initCanvas();
            }
          }
        }
      }
    },
    /** 处理绑定 */
    handleOk() {
      // 根据模板id刷新模板

      // 3d模型
      if (this.$refs.floorPlan) {
        const floorPlans = this.$refs.floorPlan as FloorPlanType[];
        for (const floorPlan of floorPlans) {
          if (this.currentTab == floorPlan.id) {
            this.bindingMarker(this.bindingObj, this.isDefultBoundBuilding, floorPlan.id);
          }
        }
      }

      /*  地图 */
      if (this.$refs.map) {
        const maps = this.$refs.map as any[];
        for (const map of maps) {
          if (this.currentTab == map.id) {
            map.bindingMaker(this.isDefultBoundBuilding);
          }
        }
      }

      // 图片
      if (this.$refs.image) {
        const imagePlans = this.$refs.image as ImagePlanType[];
        for (const imagePlan of imagePlans) {
          if (this.currentTab == imagePlan.id) {
            imagePlan.bindingMaker(this.isDefultBoundBuilding);
          }
        }
      }

      // 隐藏绑定
      this.visible = false;
      this.isDefultBoundBuilding = false;
    },
    /** 取消绑定 */
    handleCancel() {
      this.visible = false;
      this.isDefultBoundBuilding = false;
      this.bindingModalDispay = false;
    },
    toggleFullScreen() {
      this.isFullscreen = !this.isFullscreen;
    },
  },
});
