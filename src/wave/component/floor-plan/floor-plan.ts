import { defineComponent } from 'vue';
import { BIMViewer, LocaleService } from '@xeokit/xeokit-bim-viewer';
import { messages as localeMessages } from '@xeokit/xeokit-bim-viewer/dist/messages';
import { AppConsts } from '@/abpPro/AppConsts';
import tippy from 'tippy.js';
import {
  IViewRef,
  IBimMarkDef,
  IMarkClickEventArgs,
  IBimClickMenuItem,
  RightClickMenuItem,
} from './interfaces';
import { AnnotationsPlugin, PickResult, Annotation } from '@xeokit/xeokit-sdk/dist/xeokit-sdk.es5';
import { BIMServer } from './BimServer';
import { useRouter } from 'vue-router';
import { ControlPanelService } from '@/apis';
import AppComponentBase from '@/shared/component-base/app-component-base';
import Toolbar from '@/wave/component/floor-plan/toolbar/toolbar.vue';
import { APP_DARK_MODE_KEY } from '@/enums/cacheEnum';

const { remoteServiceBaseUrl } = AppConsts;
export default defineComponent({
  components: { Toolbar },
  mixins: [AppComponentBase],
  props: {
    // /** 画的标记 */
    // bimMarkDefs: {
    //   type: Object as PropType<IBimMarkDef[]>
    // }
    /** 是否为设计模式 */
    isDesign: {
      type: Boolean,
      default: false,
    },
    /** 画板Id */
    graphicPanelId: {
      type: String,
      default: '',
    },
    /** site\build\floor id */
    id: {
      type: String,
      default: '',
    },
    /** 画板存储路径 */
    graphicStoragePath: {
      type: String,
      default: '',
    },
    /** 高度 */
    mapHeight: {
      type: Number,
      default: 0,
    },
    /** 不是在frame中 */
    notIframe: {
      type: Boolean,
      default: false,
    },
    /** 是否展示资源浏览器 */
    showExplorer: {
      type: Boolean,
      default: false,
    },
    /** 是否展示右键菜单 */
    showContextMenu: {
      type: Boolean,
      default: false,
    },
    /** 是否展示toolbar */
    showToolbar: {
      type: Boolean,
      default: true,
    },
    /** 工具条样式 */
    toolbarStyle: {
      type: Object,
      default: {},
    },
    /** 视图是否加粗 */
    annotationTitleBlod: {
      type: Boolean,
      default: false,
    },
    tablePanelInfo: {
      type: Object,
      default: {},
    },
  },

  emits: {
    /** 视图点击 */
    bimViewerClick(pickResult: PickResult) {
      return true;
    },
    /** 标记点击 */
    markClick(annotation: Annotation) {
      return true;
    },
    /* 标记普通点击 */
    normalClick(annotation: Annotation) {
      return true;
    },
    loadBimMarkers(buildingId: string, graphicPanelId: string) {
      return true;
    },
    /**标点右键 */
    markerContextmenu(obj: any) {
      return true;
    },
  },
  data() {
    const viewRef: IViewRef = {};
    const bimViewer: BIMViewer = null;
    const annotations: AnnotationsPlugin = null;
    return {
      viewRef: viewRef,
      bimViewer: bimViewer,
      annotations: annotations,
      //标点记录
      annotationsRecord: [] as any[],
      graphicPanelNewId: '',
      //建筑id
      boundBuildingId: '',
      viewerCameraConfig: { threeD: '', twoD: '' },
      //是否展示菜单
      isMenuVisible: false,
      top: 0,
      left: 0,
      menuItems: [{ id: 1, label: 'Unbind' }],
      menuDeviceId: '',
      viewPoint: [] as number[],
    };
  },

  watch: {
    graphicStoragePath(newVal: string) {
      this.bimViewerReload(newVal);
    },
  },

  mounted() {
    // 事件监听
    window.addEventListener('click', this.hideMenu);
    this.graphicPanelNewId = this.graphicPanelId || '';
    this.boundBuildingId = this.id || '';

    // iframe包含
    // if (!this.notIframe) {
    //   //用于工作台传参
    //   window.addEventListener('message', receiver, false);
    //   const that = this;
    //   function receiver(e) {
    //     if (e.data.type == 'function') {
    //       //创建坐标点
    //       if (e.data.function == 'createBimMarks') {
    //         that.createBimMarks(e.data.data);
    //       }
    //     } else {
    //       that.destroyAll();
    //       //父类传参加载plan
    //       that.graphicPanelNewId = e.data.graphicPanelId;
    //       that.bimViewerReload(e.data.graphicStoragePath);
    //       window.parent.postMessage(
    //         {
    //           info: 'success',
    //           function: 'loadBimMarkers',
    //           graphicPanelId: e.data.graphicPanelId,
    //           boundBuildingId: that.boundBuildingId,
    //         },
    //         '*',
    //       );
    //     }
    //   }
    // try {
    //   this.$nextTick(() => {
    //     // 页面加载完成后执行的代码
    //     const router = useRouter();
    //     const { currentRoute } = router;
    //     if (!currentRoute) return;
    //     const query = currentRoute.value.query;
    //     if (query && query.graphicPanelId) {
    //       this.graphicPanelNewId = query.graphicPanelId.toString();
    //       this.boundBuildingId = query?.boundBuildingId?.toString() ?? '';
    //       if (query.tempViewPoint) {
    //         const tempViewPoint = (query.viewPoint as string).split(',');
    //         this.viewPoint = tempViewPoint.map((item) => Number(item));
    //       }
    //       this.bimViewerReload(query?.graphicStoragePath?.toString() || '');
    //       window.parent.postMessage(
    //         {
    //           info: 'success',
    //           function: 'loadBimMarkers',
    //           graphicPanelId: this.graphicPanelNewId,
    //           boundBuildingId: this.boundBuildingId,
    //         },
    //         '*',
    //       );
    //     }
    //   });
    // } catch (error) {
    //   console.log('dwwqdq', error);
    // }
    // }

    // 初始化视图组件的引用
    this.intiViewRef();
    // 加载markers
    this.bimViewerReload(this.graphicStoragePath);
    this.$emit('loadBimMarkers', this.id, this.graphicPanelNewId);
  },
  beforeUnmount() {
    this.destroyAll();
  },
  methods: {
    hideMenu() {
      this.isMenuVisible = false;
    },
    handleMenuItemClick(item) {
      if (this.menuDeviceId == '') {
        this.notify.warn({ message: this.l('Invalid marker') });
        return;
      }
      // 处理菜单项点击事件
      console.log(`点击了菜单项: ${item.label}`);
      const requestBody = {
        boundBuildingId: this.id,
        deviceId: this.menuDeviceId,
      };
      ControlPanelService.postApiAppControlPanelDeviceUnbindPointView({ requestBody }).then(() => {
        if (this.annotations.annotations[this.menuDeviceId]) {
          //删除需要更改的标点
          this.annotations.destroyAnnotation(this.menuDeviceId);
          const records = this.annotationsRecord.filter((o) => o['id'] == this.menuDeviceId);
          if (records.length > 0) {
            const index = this.annotationsRecord.indexOf(records[0]);
            this.annotationsRecord.splice(index, 1); // Remove from tracking array
          }
        }
        this.menuDeviceId = '';
      });
      this.isMenuVisible = false;
    },
    /** 销毁资源 */
    destroyAll() {
      if (this.annotations) {
        this.annotations.clear();
        this.annotations.destroy();
        this.annotations = null;
      }
      if (this.bimViewer) {
        this.bimViewer.destroy();
        this.bimViewer = null;
      }
    },
    /**
     * 添加标注
     * @param bimMarkDefs 标注定义
     * @param clear 是否清空原有
     * @returns 成功返回true，失败返回false
     */
    createBimMarks(bimMarkDefs: IBimMarkDef[], clear = false): boolean {
      // 画布未初始化
      if (!this.annotations) {
        return false;
      }

      // 处理数据
      bimMarkDefs = Array.isArray(bimMarkDefs) ? bimMarkDefs : [];

      // 清空现有
      if (clear) {
        this.annotations.clear();
      }

      // 画图
      bimMarkDefs.forEach((item) => {
        // 查询是否有这个标点记录
        const existingAnnotation = this.annotationsRecord.find(
          (annotation) =>
            annotation &&
            annotation.id === item.id &&
            annotation.faIconClass === item.faIconClass &&
            annotation.commandMode === item.commandMode &&
            annotation.markerBGColor === item.markerBGColor &&
            annotation.worldPos[0] === item.worldPos[0] &&
            annotation.worldPos[1] === item.worldPos[1] &&
            annotation.worldPos[2] === item.worldPos[2],
        );

        if (existingAnnotation) {
          return;
        }
        if (this.annotations.annotations[item.id]) {
          // 删除需要更改的标点
          this.annotations.destroyAnnotation(item.id);
          const index = this.annotationsRecord.indexOf(existingAnnotation);
          if (index > -1) {
            this.annotationsRecord.splice(index, 1); // 从跟踪数组中移除
          }
        }

        this.annotationsRecord.push(item); // 添加一个新的标点到跟踪数组中
        this.annotations.createAnnotation({
          id: item.id, //标注的唯一标识符
          worldPos: item.worldPos, //标注在世界坐标系中的位置
          occludable: false, //（可选）默认为 true，当设置为 true 时，如果标注被其他实体遮挡，则不可见。
          markerShown: true, //（可选）默认为 true，控制是否显示标注的位置标记。
          labelShown: false, //（可选）默认为 false，控制是否显示标注的标签。
          values: {
            faIconClass: item.faIconClass,
            commandMode: item.commandMode,
            markerBGColor: item.markerBGColor,
            title: item.title,
            description: item.description,
            markerType: item.markerType,
          }, //（可选）用于覆盖 AnnotationsPlugin 默认值的键值对，可以包含如 glyph、title、description 等字段，这些值将被插入到标注的HTML模板中。
          visible: item.visible,
        });
      });

      if (this.isDesign) {
        setTimeout(() => {
          bimMarkDefs.forEach((item) => {
            // 给已标注的设备添加点击事件监听
            const marker = this.annotations.annotations[item.id]._marker;
            marker.addEventListener('contextmenu', (e: MouseEvent) => {
              e.preventDefault();
              const data = this.annotations.annotations[item.id];
              data.x = e.clientX;
              data.y = e.clientY;
              data.plugin.fire('markerContextmenu', data);
            });
          });
        }, 1000);
      }

      return true;
    },
    /**
     * 修改标注
     * @param bimMarkDefs 标注定义
     * @param scene 是否更新视图
     * @returns 成功返回true，失败返回false
     */
    updateBimMarks(bimMarkDefs: IBimMarkDef[]): boolean {
      // 画布未初始化
      if (!this.annotations) {
        return false;
      }
      // 处理数据
      bimMarkDefs = Array.isArray(bimMarkDefs) ? bimMarkDefs : [];
      // 画图
      const that = this;
      bimMarkDefs.forEach((item) => {
        // 替换新标点
        if (this.annotations.annotations[item.id]) {
          const newArray = this.annotationsRecord.map((annotation) => {
            if (annotation.id === item.id) {
              that.annotations.destroyAnnotation(item.id);
              return item; // 返回传入的对象
            } else {
              return annotation; // 否则返回原对象
            }
          });
          this.annotationsRecord = newArray;
        }
        this.annotations.createAnnotation({
          id: item.id, //标注的唯一标识符
          worldPos: item.worldPos, //标注在世界坐标系中的位置
          occludable: false, //（可选）默认为 true，当设置为 true 时，如果标注被其他实体遮挡，则不可见。
          markerShown: true, //（可选）默认为 true，控制是否显示标注的位置标记。
          labelShown: false, //（可选）默认为 false，控制是否显示标注的标签。
          values: {
            faIconClass: item.faIconClass,
            commandMode: item.commandMode,
            markerBGColor: item.markerBGColor,
            title: item.title,
            description: item.description,
            markerType: item.markerType,
          }, //（可选）用于覆盖 AnnotationsPlugin 默认值的键值对，可以包含如 glyph、title、description 等字段，这些值将被插入到标注的HTML模板中。
          visible: item.visible,
        });
      });

      if (this.isDesign) {
        setTimeout(() => {
          bimMarkDefs.forEach((item) => {
            // 给已标注的设备添加点击事件监听
            const marker = this.annotations.annotations[item.id]._marker;
            marker.addEventListener('contextmenu', (e: MouseEvent) => {
              e.preventDefault();
              const data = this.annotations.annotations[item.id];
              data.x = e.clientX;
              data.y = e.clientY;
              data.plugin.fire('markerContextmenu', data);
            });
          });
        }, 1000);
      }

      return true;
    },
    /** 初始化组件引用 */
    intiViewRef() {
      this.viewRef.el = this.$refs.myExplorer as any;
      this.viewRef.myExplorer = this.$refs.myExplorer as any;
      this.viewRef.myToolbar = this.$refs.myToolbar as any;
      this.viewRef.myInspector = this.$refs.myInspector as any;
      this.viewRef.myViewer = this.$refs.myViewer as any;
      this.viewRef.myCanvas = this.$refs.myCanvas as any;
      this.viewRef.myNavCubeCanvas = this.$refs.myNavCubeCanvas as any;
    },

    /** 初始化视图 */
    bimViewerReload(graphicStoragePath: string) {
      this.graphicPanelNewId = this.graphicPanelId || '';
      const requestParams = {
        locale: 'en',
        openExplorer: 'false',
        enableEditModels: 'false',
        configs: null,
        tab: false,
      };
      const locale = requestParams.locale || 'en';
      if (!graphicStoragePath) {
        this.notify.error({
          message: this.l('NullObjectException: `graphicStoragePath` not defined!'),
        });
        return;
      }

      // 参数配置
      const openExplorer = requestParams.openExplorer;
      this.setExplorerOpen(openExplorer === 'true');
      const enableEditModels = requestParams.enableEditModels === 'true';

      // =========== 创建实例 ===========
      // 资源服务器

      const dataDir = `${remoteServiceBaseUrl}/DecompressingFiles`;
      /* 测试 资源服务器*/
      // const dataDir = 'http://steagil-api.prod.firebytes.com.sg/xeokit/data'
      const server = new BIMServer({
        dataDir: dataDir,
      });
      const localeService = new LocaleService({
        messages: localeMessages,
        locale: locale,
      });
      /* 创建视图实例 */
      const bimViewer = new BIMViewer(server, {
        enableEditModels: enableEditModels,
        localeService: localeService,
        canvasElement: this.viewRef.myCanvas, // WebGL canvas
        keyboardEventsElement: this.viewRef.myCanvas, // Optional, defaults to canvasElement
        explorerElement: this.viewRef.myExplorer, // Left panel
        toolbarElement: this.viewRef.myToolbar, // Toolbar
        inspectorElement: this.viewRef.myInspector, // Right panel
        navCubeCanvasElement: this.viewRef.myNavCubeCanvas,
        busyModelBackdropElement: this.viewRef.myViewer,
      });

      bimViewer.on('modelLoaded', (e) => {
        /* 模型加载完成 */
        /* 设置右键菜单项 */
        let showObjectItems: IBimClickMenuItem[] = [];
        if (this.showContextMenu) {
          showObjectItems = RightClickMenuItem;
        }
        /*设置右键空白区域菜单 */
        bimViewer._objectContextMenu.items = [showObjectItems];
        bimViewer._canvasContextMenu.items = [];
      });

      /* 更新视图配置 */

      // bimViewer.setConfigs({ "backgroundColor": [0.37, 0.40, 0.72] });
      // =========== 绑定设备点击事件 ===========
      bimViewer.viewer.scene.input.on('mouseclicked', (coords) => {
        const pickResult = bimViewer.viewer.scene.pick({
          canvasPos: coords,
          pickSurface: true, //选择寻找实体上的交点
        });
        // 没有东西
        if (pickResult) {
          pickResult.graphicPanelId = this.graphicPanelNewId;
        }
        this.$emit('bimViewerClick', pickResult);
      });

      // 多语言
      bimViewer.localeService.on('updated', () => {
        const localizedElements = this.viewRef?.el?.querySelectorAll('.xeokit-i18n');
        if (localizedElements && localizedElements.length) {
          localizedElements.forEach((localizedElement: any) => {
            if (localizedElement.dataset.xeokitI18n) {
              localizedElement.innerText = bimViewer.localeService.translate(
                localizedElement.dataset.xeokitI18n,
              );
            }
            if (localizedElement.dataset.xeokitI18ntip) {
              const translation = bimViewer.localeService.translate(
                localizedElement.dataset.xeokitI18ntip,
              );
              if (translation) {
                localizedElement.dataset.tippyContent = bimViewer.localeService.translate(
                  localizedElement.dataset.xeokitI18ntip,
                );
              }
            }
            if (localizedElement.dataset.tippyContent) {
              if (localizedElement._tippy) {
                localizedElement._tippy.setContent(localizedElement.dataset.tippyContent);
              } else {
                // TODO:tippy(localizedElement
                tippy(localizedElement, {
                  appendTo: 'parent',
                  zIndex: 1000000,
                  allowHTML: true,
                });
              }
            }
          });
        }
      });

      // 打开资源管理器
      bimViewer.on('openExplorer', () => {
        this.setExplorerOpen(true);
      });
      bimViewer.on('openInspector', () => {
        this.setInspectorOpen(true);
      });

      // 打开模态框
      bimViewer.on('addModel', (event) => {
        // 在Models选项卡的上下文菜单中选择“添加”
        console.log('addModel: ' + JSON.stringify(event, null, '\t'));
      });

      bimViewer.on('editModel', (event) => {
        // 在Models选项卡的上下文菜单中选择“Edit”
        console.log('editModel: ' + JSON.stringify(event, null, '\t'));
      });

      bimViewer.on('deleteModel', (event) => {
        // 在Models选项卡的上下文菜单中选择“删除”
        console.log('deleteModel: ' + JSON.stringify(event, null, '\t'));
      });
      // =========== 数据标注 ===========
      //style='background-color: {{markerBGColor}};'
      const annotationClass = this.annotationTitleBlod ? 'annotation-title-blod' : '';
      const annotations = new AnnotationsPlugin(bimViewer.viewer, {
        markerHTML: `<div class='annotation-marker ${!this.isDesign ? 'markers' : ''}' title='{{title}}'>
                        <div class='annotation-marker1' style='background:{{markerBGColor}}'>
                          <div style='background-image: url({{faIconClass}}); background-size:100% 100%; height:100%; width:100%;'>
                          </div>
                        </div>
                        <div class='annotation-title ${annotationClass}'>{{title}}</div>
                    </div>
                    `,
        // labelHTML: `<div class='annotation-label' style='background-color: {{labelBGColor}};'>
        //             <div class='annotation-title'>{{title}}</div>
        //                             <div class='annotation-desc'>{{description}}</div>
        //                         </div>`,
        // values: {
        //   markerBGColor: 'red',
        //   faIconClass: 'fa-question',
        //   title: 'Untitled',
        //   description: 'No description'
        // },

        // Amount to offset each Annotation from its Entity surface (0.3 is the default value).
        // This is useful when the Annotation is occludable, which is when it is hidden when occluded
        // by other objects. When occludable, there is potential for the Annotation#worldPos to become
        // visually embedded within the surface of its Entity when viewed from a distance. This happens
        // as a result of limited GPU accuracy GPU accuracy, especially when the near and far view-space clipping planes,
        // specified by Perspective#near and Perspective#far, or Ortho#near and Perspective#far, are far away from each other.
        //
        // Offsetting the Annotation may ensure that it does become visually embedded within its Entity. We may also
        // prevent this by keeping the distance between the view-space clipping planes to a minimum. In general, a good
        // default value for Perspective#far and Ortho#far is around ````2.000````.

        surfaceOffset: 0.1,
      });

      annotations.on('markerClicked', (annotation: Annotation) => {
        const def = annotation.getValues();
        const markerInfo: IMarkClickEventArgs = {
          id: annotation.id, // 设备id
          markerType: def.markerType, // 设备类型
          title: def.title, // 设备名称
          graphicPanelId: this.graphicPanelNewId,
          boundBuildingId: this.id,
          commandMode: def.commandMode,
          position: {
            left: parseFloat(annotation._marker.style.left.replace('px', '')),
            top: parseFloat(annotation._marker.style.top.replace('px', '')),
            'z-index': annotation._marker.style['z-index'],
          },
        };
        this.$emit('normalClick', markerInfo);
        if (this.isDesign) {
          return;
        }
        this.$emit('markClick', markerInfo);
        //调用父类的坐标点击事件
        if (!this.notIframe) {
          window.parent.postMessage(
            {
              info: 'success',
              function: 'markClick',
              data: markerInfo,
              sign: Math.random() * 10,
            },
            '*',
          );
        }
      });
      /* 为标注的标记添加右击事件 */
      annotations.on('markerContextmenu', (annotation) => {
        this.menuDeviceId = annotation.id; // 设备id
        this.isMenuVisible = true;
        this.top = annotation.y;
        this.left = annotation.x;
      });
      /* 添加鼠标进入（mouse enter）事件 */
      annotations.on('markerMouseEnter', (annotation) => {
        annotation.setLabelShown(true);
      });

      annotations.on('markerMouseLeave', (annotation) => {
        annotation.setLabelShown(false);
      });
      this.annotations = annotations;
      bimViewer.annotations = annotations;

      // =========== 数据加载 ===========
      const pam = {
        graphicPanelId: this.graphicPanelNewId,
      };
      if (this.id != null && this.id != '') {
        pam['controlPanelId'] = this.id;
      }
      ControlPanelService.getApiAppControlPanelFloorPlanConfig(pam).then((res) => {
        /* 请求模型资源 */
        bimViewer.loadProject(
          graphicStoragePath,
          () => {
            //锁定设备视角
            if (this.viewPoint.length > 0) {
              const config = {} as any;
              config.look = this.viewPoint;
              config.eye = [this.viewPoint[0], this.viewPoint[1] + 5, this.viewPoint[2]];
              bimViewer.setCamera(config);
            } else {
              // 初始化摄像头视角
              if (!!res.viewerCameraConfig && res.viewerCameraConfig !== '') {
                this.viewerCameraConfig.threeD = res.viewerCameraConfig;
                const config = JSON.parse(res.viewerCameraConfig);
                bimViewer.setCamera(config);
              }
            }
            if (!!res.twoViewerCameraConfig && res.twoViewerCameraConfig !== '') {
              this.viewerCameraConfig.twoD = res.twoViewerCameraConfig;
            }

            // 隐藏页面对象
            const scene = bimViewer.viewer.scene;
            scene.setObjectsVisible(res.hideObjectIds, false);
          },
          (errorMsg) => {
            console.error(errorMsg);
          },
        );
      });

      // =========== 构建完成 ===========
      this.overrideThreeDMode(bimViewer);

      bimViewer.setConfigs({ backgroundColor: [0.145, 0.157, 0.165] });
      // bimViewer.setConfigs({  "backgroundColor" : [1, 0.173, 0] });
      this.bimViewer = bimViewer;
      this.bimViewer.isThreeD = true;
    },

    setExplorerOpen(explorerOpen: boolean) {
      console.log('setExplorerOpen---------------------');
    },

    setInspectorOpen(inspectorOpen: boolean) {
      console.log('setInspectorOpen---------------------');
    },
    /* 保存视角 */
    saveDegree() {
      const config = {
        eye: Array.from(this.bimViewer.viewer.camera.eye),
        look: Array.from(this.bimViewer.viewer.camera.look),
        up: Array.from(this.bimViewer.viewer.camera.up),
        scale: this.bimViewer.viewer.camera.ortho.scale,
      };
      const pam = {
        controlPanelId: this.id,
        graphicPanelId: this.graphicPanelId,
        viewerCameraConfig: JSON.stringify(config),
        isThreeD: this.bimViewer.isThreeD, // 判断当前是2d还是3d
      };

      // 存储到后端
      ControlPanelService.postApiAppControlPanelSetFloorPlanViewerConfig({ requestBody: pam }).then(
        (res) => {
          if (res) {
            // 成功提示
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
            // 替换当前页面缓存的视角数据
            if (pam.isThreeD) {
              this.viewerCameraConfig.threeD = pam.viewerCameraConfig;
            } else {
              this.viewerCameraConfig.twoD = pam.viewerCameraConfig;
            }
          }
        },
      );
    },
    /**获取隐藏 的id */
    getHideObjectIds() {
      return this.bimViewer.viewer.scene.objectIds.filter(
        (item) => !this.bimViewer.viewer.scene.visibleObjectIds.includes(item),
      );
    },
    /** 重写 ThreeDMode */
    overrideThreeDMode(bimViewer: BIMViewer) {
      const that = this;
      // 重写-退出3d
      const _exitThreeDMode2 = bimViewer._threeDMode._exitThreeDMode;
      bimViewer._threeDMode._exitThreeDMode2 = _exitThreeDMode2;
      bimViewer._threeDMode._exitThreeDMode = function (done) {
        this._exitThreeDMode2(done);
        this.bimViewer.viewer.cameraControl.navMode = 'firstPerson';
        this.bimViewer.isThreeD = false;

        // 设置2d的摄像头视角
        if (that.viewerCameraConfig.twoD) {
          const config = JSON.parse(that.viewerCameraConfig.twoD);
          this.bimViewer.viewer.camera.projection = 'orthographic';
          this.bimViewer.viewer.camera.ortho.scale = config.scale;
          this.bimViewer.viewer.cameraFlight.jumpTo({
            eye: config.eye,
            look: config.look,
            up: config.up,
          });
        }
      };

      // 重写-进入3d
      const _enterThreeDMode2 = bimViewer._threeDMode._enterThreeDMode;
      bimViewer._threeDMode._enterThreeDMode2 = _enterThreeDMode2;
      bimViewer._threeDMode._enterThreeDMode = function (done) {
        this._enterThreeDMode2(done);
        this.bimViewer.isThreeD = true;
        // setTimeout(() => {
        //   // TODO:设置3d的摄像头视角
        //   bimViewer.setCamera();
        // }, 1000);
        if (that.viewerCameraConfig.threeD) {
          const config = JSON.parse(that.viewerCameraConfig.threeD);
          this.bimViewer.viewer.cameraFlight.jumpTo({
            eye: config.eye,
            look: config.look,
            up: config.up,
            duration: 1,
          });
        }
      };
    },
  },
});
