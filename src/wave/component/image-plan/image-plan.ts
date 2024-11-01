import {
  ControlPanelService,
  FireBytes_Unified_Wave_ControlPanels_Dto_DeviceUnbindPointViewInput as DeviceUnbindPointViewInput,
  FireBytes_Unified_Wave_ControlPanels_Dto_SetFloorPlanViewerConfigInput as SetFloorPlanViewerConfigInput,
  FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto as DevicePointViewWithNavigationPropertiesDto,
  FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelImageMarkerDto as ControlPanelImageMarkerDto,
} from '@/apis';
import { defineComponent } from 'vue';
import AppComponentBase from '@/shared/component-base/app-component-base';
import { getFileUrlById } from '@/shared/components/f-upload/src/helper';

import { CTRL_VIEW_DICT } from '..';

export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    /**  */
    id: {
      type: String,
    },
    /** 设计模式 */
    isDesign: {
      type: Boolean,
    },
    /** 绑定id  用户对哪个进行绑定 */
    bindingId: {
      type: String,
    },
    /** 类型 */
    type: {
      type: String,
    },
    /**  */
    bindingType: {
      type: String,
    },
    /**  */
    graphicPanelId: {
      type: String,
    },
    /**  */
    isBinding: {
      type: Boolean,
    },
    /**  */
    graphicUrl: {
      type: String,
    },
    /**  */
    visible: {
      type: Boolean,
    },
    /**  */
    isMapViewer: {
      type: Boolean,
      default: false,
    },
    viewPoint: {
      type: Object,
    },
  },
  emits: ['update:isBinding', 'update:visible', 'update:markerContextmenu', 'normalClick'],
  data() {
    return {
      deviceStatusDict: {} as { [key: string]: any },
      //标点图标大小
      iconWidth: 60,
      iconHeight: 60,
      bindingModalDispay: false,
      canvaswidth: 3840,
      canvasheight: 1828,
      mycanvas: {} as any,
      canvasinfo: {
        initialzoom: 1,
        //每次增加多少倍
        everyzoom: 0.1,
        //图片初始位置
        imginitx: 0,
        imginity: 0,
        offset: {
          x: 0,
          y: 0,
        },
        //鼠标进入离开拖动状态标记
        mousestatus: 0,
      },
      imageinfo: {
        width: 0,
        height: 0,
      },
      imageinitzoom: 0,
      img: null,
      //记录坐标原点位置
      origin: {
        x: 0,
        y: 0,
      },
      markers: [] as any[],
      srcImg: '',
      bindingObj: {} as any,
      bitmap: null as any,
      //是否展示菜单
      isMenuVisible: false,
      top: 0,
      left: 0,
      menuItems: [{ id: 1, label: 'UnBind' }],
      menuDeviceId: '',
      /**是否加载完成 */
      isLoadComplete: false,
    };
  },

  watch: {
    id(n) {
      this.init();
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const pam = {
        controlPanelId: this.id,
        graphicPanelId: this.graphicPanelId,
      };
      ControlPanelService.getApiAppControlPanelFloorPlanConfig(pam).then((res) => {
        if (res.viewerCameraConfig) {
          const config = JSON.parse(res.viewerCameraConfig);
          this.canvasinfo.imginitx = config.imginitx;
          this.canvasinfo.imginity = config.imginity;
          this.canvasinfo.initialzoom = config.initialzoom;
          this.canvasinfo.offset = config.offset;
        }

        // 点击页面任何地方都会关闭右键菜单
        window.addEventListener('click', this.hideMenu);
        this.loadDeviceStatus();
        this.mycanvas = (this.$refs.mycanvas as any).getContext('2d') as CanvasRenderingContext2D;
      });
    },
    showMenu(event) {
      this.isMenuVisible = true;
      this.top = event.clientY;
      this.left = event.clientX;
    },
    hideMenu() {
      this.isMenuVisible = false;
    },
    handleMenuItemClick(item) {
      if (this.menuDeviceId == '') {
        this.notify.warn({ message: 'Invalid marker' });
        return;
      }
      // 处理菜单项点击事件
      const pam = {
        boundBuildingId: this.id,
        deviceId: this.menuDeviceId,
      } as DeviceUnbindPointViewInput;
      ControlPanelService.postApiAppControlPanelDeviceUnbindPointView({ requestBody: pam }).then(
        (res) => {
          if (res) {
            const tempMarker: any[] = [];
            for (const marker of this.markers) {
              if (marker.deviceId != this.menuDeviceId) {
                tempMarker.push(marker);
              }
            }
            this.markers = tempMarker;
            // this.addpoint();
            this.drawImage();
            this.menuDeviceId = '';
          }
        },
      );
      this.isMenuVisible = false;
    },
    //加载图片在canvas上
    loadImage() {
      const _this = this;
      //根据标点加载数据，
      const pam = {
        boundBuildingId: this.id,
        graphicPanelId: this.graphicPanelId,
        isMapViewer: this.isMapViewer,
      };
      ControlPanelService.getApiAppControlPanelImagePlanDevicePoints(pam).then(async (result) => {
        _this.bitmap = _this.$refs.bitmap;
        _this.img = _this.bitmap;
        this.srcImg = (await getFileUrlById(_this.graphicUrl)) || ''; // 图片地址
        _this.bitmap.onload = (res) => {
          //先计算原图初始宽高，赋值图片适应图层缩放比例
          _this.calculation(res);
          _this.markers = result;

          //图片加载完成后绘制在canvas上面
          _this.drawImage();
        };
      });
      // });
    },
    //开始绘制canvas
    drawImage() {
      if (!this.mycanvas) return;
      this.mycanvas.clearRect(0, 0, this.canvaswidth, this.canvasheight);
      //是否加载完成（false则标识第一次初始化）
      // if (!this.isLoadComplete) {
      //   if (this.viewPoint && this.viewPoint.latitude != 0) {
      //     this.canvasinfo.imginitx = this.viewPoint.pointXvalue;
      //     this.canvasinfo.imginity = this.viewPoint.pointYvalue;
      //   }
      // }

      this.mycanvas.drawImage(
        this.img,
        this.canvasinfo.imginitx,
        this.canvasinfo.imginity,
        (this.imageinfo.width / this.imageinitzoom) * this.canvasinfo.initialzoom,

        (this.imageinfo.height / this.imageinitzoom) * this.canvasinfo.initialzoom,
      );
      this.isLoadComplete = true;
      this.addpoint();
    },
    initCanvas() {
      //根据标点加载数据，
      const pam = {
        boundBuildingId: this.id,
        graphicPanelId: this.graphicPanelId,
        isMapViewer: this.isMapViewer,
      };
      ControlPanelService.getApiAppControlPanelImagePlanDevicePoints(pam).then((result) => {
        this.markers = result;

        this.addpoint();
      });
    },

    addpoint() {
      for (let i = 0; i < this.markers.length; i++) {
        // _this.mycanvas.font = "14px Arial";
        // _this.mycanvas.textAlign = "center";
        // _this.mycanvas.fillText(marker.title, marker.pointXvalue, marker.pointYvalue - height / 2);

        // _this.mycanvas.drawImage(iconimg, iconx - _this.iconWidth / 2, icony - _this.iconHeight / 2,  _this.iconWidth, _this.iconHeight);

        this.createScaledPushpin(this.markers[i]);
      }
    },
    async createScaledPushpin(marker: ControlPanelImageMarkerDto, isZoom = false) {
      //获取设备状态id
      const deviceStatus = this.deviceStatusDict[marker.deviceStatusId || ''];
      const img = new Image();
      const that = this;
      // 加载处理
      img.onload = function () {
        if (!that.mycanvas) return;
        // var c = document.createElement('canvas');
        // var context = c.getContext('2d');
        //图标大小
        const width = 30;
        const height = 30;
        //配置设备名
        that.mycanvas.font = '14px Arial';
        that.mycanvas.textAlign = 'center';
        const iconx =
          marker.pointXvalue / (that.imageinitzoom / that.canvasinfo.initialzoom) +
          that.canvasinfo.imginitx;
        const icony =
          (that.origin.y - marker.pointYvalue) /
            (that.imageinitzoom / that.canvasinfo.initialzoom) +
          that.canvasinfo.imginity;
        const radius = 20;

        that.mycanvas.beginPath();
        that.mycanvas.arc(iconx, icony - radius - radius * 0.25, radius, 0.3, Math.PI - 0.3, true);
        that.mycanvas.fillStyle = 'white';
        that.mycanvas.fill();

        //that.mycanvas.closePath();
        that.mycanvas.beginPath();
        that.mycanvas.moveTo(iconx, icony);
        that.mycanvas.lineTo(iconx - radius, icony - radius);
        that.mycanvas.lineTo(iconx + radius, icony - radius);
        that.mycanvas.fillStyle = 'white';
        that.mycanvas.fill();
        that.mycanvas.closePath();

        that.mycanvas.font = '12px Arial';
        that.mycanvas.fillStyle = 'white';
        that.mycanvas.textAlign = 'center';
        that.mycanvas.fillText(marker.title, iconx, icony + radius / 2);
        // 计算三角形中心点坐标
        const centerX = (iconx + iconx - radius + iconx + radius) / 3;
        const centerY = (icony + icony - radius + icony - radius) / 3;
        // 计算图标坐标
        const iconX = centerX - width / 2;
        const iconY = icony - radius * 2;
        that.mycanvas.drawImage(img, iconX, iconY, width, width);
        if (marker.isIndoorTrackingDevice && !that.isDesign) {
          // 设置圆形位置和半径
          const circleX = centerX - 10; // 圆心 x 坐标
          const circleY = centerY - 10; // 圆心 y 坐标
          const circleRadius = 10; // 圆半径
          // 绘制圆形背景色
          that.mycanvas.fillStyle = 'red';
          that.mycanvas.beginPath();
          that.mycanvas.arc(
            circleX + radius * 1.5,
            circleY - radius / 2,
            circleRadius,
            0,
            Math.PI * 2,
          );
          that.mycanvas.closePath();
          that.mycanvas.fill();
          //计算公式
          that.mycanvas.font = '12px Arial';
          that.mycanvas.fillStyle = 'white';
          that.mycanvas.textAlign = 'center';
          that.mycanvas.textBaseline = 'middle';
          let peopleAroundNumber = '0';
          if (marker.peopleAround && marker.peopleAround.length > 99) {
            peopleAroundNumber = '99+';
          } else {
            peopleAroundNumber = (marker.peopleAround && marker.peopleAround.length + '') || '';
          }
          that.mycanvas.fillText(peopleAroundNumber, circleX + radius * 1.5, circleY - radius / 2);
        }
      };

      // 设置图片加载
      img.setAttribute('crossOrigin', 'Anonymous');
      img.src = (await getFileUrlById(deviceStatus.statusIconFont)) || ''; //根据文件id获取文件地址
    },
    /**右键事件 */
    contextmenu(e) {
      e.preventDefault();
      const x = Math.floor(
        ((e.offsetX - this.canvasinfo.imginitx) * this.imageinitzoom) / this.canvasinfo.initialzoom,
      );
      const y = Math.floor(
        this.origin.y -
          ((e.offsetY - this.canvasinfo.imginity) * this.imageinitzoom) /
            this.canvasinfo.initialzoom,
      );
      if (this.isDesign) {
        //判断是否点击到标点
        for (const marker of this.markers) {
          if (
            x > marker.pointXvalue - this.iconWidth &&
            x < marker.pointXvalue + this.iconWidth &&
            y > marker.pointYvalue - this.iconHeight * 2 &&
            y < marker.pointYvalue + this.iconHeight / 2
          ) {
            //确定你需要执行的方法
            this.menuDeviceId = marker.deviceId; // 设备id
            this.isMenuVisible = true;
            this.top = e.clientY - 150;
            this.left = e.clientX - 550;
          }
        }
      }
    },
    //点击canvas
    clickMarkPoint(e) {
      // e.offsetX 相对于图片的X坐标
      //  e.offsetY 相对于图片的Y坐标
      // console.log(e.offsetX, e.offsetY);
      const x = Math.floor(
        ((e.offsetX - this.canvasinfo.imginitx) * this.imageinitzoom) / this.canvasinfo.initialzoom,
      );
      const y = Math.floor(
        this.origin.y -
          ((e.offsetY - this.canvasinfo.imginity) * this.imageinitzoom) /
            this.canvasinfo.initialzoom,
      );
      const that = this;

      //判断是否点击到标点
      for (const marker of this.markers) {
        if (
          x > marker.pointXvalue - this.iconWidth &&
          x < marker.pointXvalue + this.iconWidth &&
          y > marker.pointYvalue - this.iconHeight / 2 &&
          y < marker.pointYvalue + this.iconHeight * 2
        ) {
          // alert("这是" + i.id)
          // that.casevasContext.clearRect(x.markerX, x.markerY, 40, 40)
          //这里可以根据i 来确定你需要执行的方法
          const deviceId = marker.deviceId; // 设备id
          const deviceName = marker.title; // 设备名称
          //将类型小写和去除空格方便类型匹配
          const commandMode = marker.commandMode.toLowerCase().replace(/\s*/g, ''); // 设备类型
          marker.id = marker.deviceId;
          console.log('marker', marker);
          this.$emit('normalClick', marker);
          if (this.isDesign) {
            const deviceCtrlViewDef = CTRL_VIEW_DICT[commandMode];
            if (!deviceCtrlViewDef) {
              return;
            }
            ControlPanelService.getApiAppControlPanelDeviceTypeFunctionByDeviceId({ deviceId })
              .then((res) => {
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
                      contorlPanelId: this.id,
                    },
                    { width: deviceCtrlViewDef.width },
                  )
                  .subscribe((res) => {
                    if (!res) return;
                  });
              })
              .finally(() => {});
          }
        }
      }

      if (this.isBinding) {
        this.showBindingModal(x, y);
      }
    },
    showBindingModal(x, y) {
      if (this.bindingModalDispay) {
        return;
      }
      this.bindingObj = { x, y };
      this.$emit('update:visible', true);
    },
    //绑定device坐标
    bindingMaker(isDefultBoundBuilding) {
      const that = this;
      const input = {} as any;
      input.deviceId = this.bindingId;
      input.graphicPanelId = this.graphicPanelId;
      input.PointXvalue = this.bindingObj.x;
      input.PointYvalue = this.bindingObj.y;
      input.isDefultBoundBuilding = isDefultBoundBuilding;
      input.boundBuildingId = this.id;
      ControlPanelService.postApiAppControlPanelGraphicPanelDevicePointView({ requestBody: input })
        .then(() => {
          that.$emit('update:isBinding', false);
          //根据标点加载数据，
          const pam = {
            boundBuildingId: that.id,
            graphicPanelId: that.graphicPanelId,
            isMapViewer: that.isMapViewer,
          };
          ControlPanelService.getApiAppControlPanelImagePlanDevicePoints(pam).then((result) => {
            that.markers = result;
            that.addpoint();
          });
        })
        .finally(() => {});
      that.bindingModalDispay = false;
    },
    /** 加载设备状态定义 */
    loadDeviceStatus() {
      ControlPanelService.getApiAppControlPanelDeviceStatus().then((res: any) => {
        this.deviceStatusDict = {};
        for (const dto of res) {
          this.deviceStatusDict[dto.id] = dto;
        }
        this.loadImage();
      });
    },
    //计算要建立的坐标原点，并计算图片相对于图层缩小倍数
    calculation(res) {
      if (res.target.height > this.canvasheight) {
        this.imageinitzoom = res.target.height / this.canvasheight;
      } else {
        this.imageinitzoom = res.target.width / this.canvaswidth;
      }
      if (this.imageinitzoom < this.canvasinfo.initialzoom) {
        this.imageinitzoom = this.canvasinfo.initialzoom;
      }
      this.imageinfo.width = res.target.width;
      this.imageinfo.height = res.target.height;
      this.origin.x = this.canvasinfo.imginitx; //原点坐标x为相对left的偏移量
      let imginity = this.canvasinfo.imginity;
      if (!this.isLoadComplete) {
        imginity = 0;
      }
      this.origin.y = res.target.height + imginity; //原点坐标y为图片的高度+相对top的偏移量
    },
    /** 记录画面鼠标的位置 */
    getMousePosition(e) {
      return {
        x: e.offsetX,
        y: e.offsetY,
      };
    },

    //鼠标按下操作
    onmousedown(e) {
      this.canvasinfo.mousestatus = 1; // 记录鼠标进入1状态
      this.canvasinfo.offset = this.getMousePosition(e); // 记录鼠标的坐标点
    },
    onmouseup(e) {
      this.canvasinfo.mousestatus = 0; // 记录鼠标进入1状态
    },
    onmousemove(e) {
      // console.log("x:" + Math.floor((e.offsetX - this.canvasinfo.imginitx) * this.imageinitzoom / this.canvasinfo.initialzoom) + "------ y:" + Math.floor(this.origin.y - ((e.offsetY - this.canvasinfo.imginity) * this.imageinitzoom / this.canvasinfo.initialzoom)));
      if (this.canvasinfo.mousestatus === 1) {
        this.canvasinfo.imginitx += e.offsetX - this.canvasinfo.offset.x;
        this.canvasinfo.imginity += e.offsetY - this.canvasinfo.offset.y;
        this.canvasinfo.offset = this.getMousePosition(e);
        this.drawImage();
      }
    },
    onmousewheel(e) {
      //计算偏移量来进行缩放，如果鼠标位置不动，e.offsetX要保持不变
      const changex =
        ((e.offsetX - this.canvasinfo.imginitx) / this.canvasinfo.initialzoom) *
        this.canvasinfo.everyzoom;
      const changey =
        ((e.offsetY - this.canvasinfo.imginity) / this.canvasinfo.initialzoom) *
        this.canvasinfo.everyzoom;
      this.canvasinfo.offset = this.getMousePosition(e);
      if (e.wheelDelta > 0) {
        this.canvasinfo.initialzoom += this.canvasinfo.everyzoom;
        this.canvasinfo.imginitx -= changex;
        this.canvasinfo.imginity -= changey;
      } else {
        if (parseInt(this.canvasinfo.initialzoom * 100) / 100 > this.canvasinfo.everyzoom) {
          this.canvasinfo.initialzoom -= this.canvasinfo.everyzoom;
          this.canvasinfo.imginitx += changex;
          this.canvasinfo.imginity += changey;
        }
      }
      this.drawImage();
    },
    /**
     * 保存视角
     */
    saveDegree() {
      const requestBody = {
        controlPanelId: this.id,
        graphicPanelId: this.graphicPanelId,
        viewerCameraConfig: JSON.stringify(this.canvasinfo),
        isThreeD: true,
      } as SetFloorPlanViewerConfigInput;
      // 存储到后端
      ControlPanelService.postApiAppControlPanelSetFloorPlanViewerConfig({ requestBody }).then(
        (res) => {
          if (res) {
            // 成功提示
            this.notify.success({ message: this.l('Unified.texts.SavedSuccessfully') });
          }
        },
      );
    },
  },
});
