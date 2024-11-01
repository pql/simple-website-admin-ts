import { defineComponent } from 'vue';
import { Modal } from 'ant-design-vue';
import { CTRL_VIEW_DICT } from '..';
import AppComponentBase from '@/shared/component-base/app-component-base';
import idHelper from '@/utils/helper/id-helper';
import { getFileUrlById } from '@/shared/components/f-upload/src/helper';
import {
  BuildingService,
  BuildingFloorService,
  SiteService,
  ControlPanelService,
  FireBytes_Unified_Wave_ControlPanels_Dto_DeviceUnbindPointViewInput as DeviceUnbindPointViewInput,
  FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineInput as EditMapSidelineInput,
  FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineDto as EditMapSidelineDto,
  FireBytes_Unified_Wave_ControlPanels_Dto_SetBuildingFloorPointInput as SetBuildingFloorPointInput,
  FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto as DeviceStatusDto,
} from '/@/apis';
import { AppConsts } from '@/abpPro/AppConsts';
import { useRouter } from 'vue-router';

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css';

const { remoteServiceBaseUrl } = AppConsts;

declare const Microsoft: any;
export interface IViewRef {
  el?: HTMLElement;
  myExplorer?: HTMLDivElement;
  myToolbar?: HTMLDivElement;
  myInspector?: HTMLDivElement;
  myViewer?: HTMLDivElement;
  myCanvas?: HTMLCanvasElement;
  myNavCubeCanvas?: HTMLCanvasElement;
}
export class addMakerObject {
  latitude?: Number;
  longitude?: Number;
  title?: String;
  description?: String;
  pid?: Number;
  markerType?: String;
  deviceStatusId?: String;
  id?: String;
  commandMode?: String;
  peopleAround?: Array<Object>;
  isIndoorTrackingDevice?: Boolean;
  mr;
}

/** array-要分组的对象数组 name-分类标识 */
export const groupBy = (array: any[], name: string) => {
  const groups = {};
  array.forEach(function (o) {
    const group = JSON.stringify(o[name]);
    groups[group] = groups[group] || [];
    groups[group].push(o);
  });
  return Object.values(groups);
};
export default defineComponent({
  mixins: [AppComponentBase],
  props: {
    //site\building\floor Id
    id: {
      type: String,
    },
    isDesign: {
      type: Boolean,
    },
    //绑定id  用户对哪个进行绑定
    bindingId: {
      type: String,
    },
    type: {
      type: String,
    },
    bindingType: {
      type: [String, Function],
    },
    graphicPanelId: {
      type: String,
    },
    graphicStoragePath: {
      type: String,
    },
    isBinding: {
      type: Boolean,
    },
    mapHeight: {
      type: [String, Number],
      default: 0,
    },
    visible: {
      type: Boolean,
    },
    //是否是mapview页
    isMapViewer: {
      type: Boolean,
      default: false,
    },
    viewPoint: {
      type: Object,
    } as any,
  },
  emits: {
    /** 标记点击 */
    // markClick(mapMarker) {
    //   return true;
    // }

    /* 标记普通点击 */
    normalClick(obj: any) {
      return true;
    },
    /**标点右键 */
    markerContextmenu(obj: any) {
      return true;
    },
    /** 更新显示 */
    'update:visible'(obj: boolean) {
      return true;
    },
    /** 更新绑定模式 */
    'update:isBinding'(obj: boolean) {
      return true;
    },
  },
  data() {
    return {
      mapElem: null as L.Map, //地图
      deviceStatusDict: {} as { [key: string]: DeviceStatusDto },
      infobox: {},
      bindingModalDispay: false,
      drawingManager: {} as any, //画图工具
      mapMarkerList: {} as { [key: string]: any },
      divMarkerList: {} as { [key: string]: any },
      //绑定的对象
      bindingObj: {} as any,
      //是否展示菜单
      isMenuVisible: false,
      top: 0,
      left: 0,
      menuItems: [{ id: 1, label: 'UnBind' }],
      menuDeviceId: '',
    };
  },
  computed: {
    // 滚动区高度
    scrollerHeight: function () {
      if (this.mapHeight == 0) {
        return window.innerHeight - 170 + 'px'; //自定义高度需求
      } else {
        return this.mapHeight;
      }
    },
  },
  mounted() {
    this.loadDeviceStatus();
    // 点击页面任何地方都会关闭右键菜单
    window.addEventListener('click', this.hideMenu);
  },
  methods: {
    hideMenu() {
      this.isMenuVisible = false;
    },
    handleMenuItemClick(item) {
      if (this.menuDeviceId == '') {
        this.notify.warn({ message: 'Invalid marker' });
        return;
      }
      // 处理菜单项点击事件
      console.log(`点击了菜单项: ${item.label}`);
      const requestBody = {
        boundBuildingId: this.id,
        deviceId: this.menuDeviceId,
      } as DeviceUnbindPointViewInput;
      ControlPanelService.postApiAppControlPanelDeviceUnbindPointView({ requestBody }).then(
        (res) => {
          if (res) {
            this.mapElem.removeLayer(this.divMarkerList[this.menuDeviceId]);
            this.menuDeviceId = '';
          }
        },
      );
      this.isMenuVisible = false;
    },
    init() {
      //根据类型加载数据，
      const pam = {
        type: this.type,
        id: this.id,
        graphicPanelId: this.graphicPanelId,
        isMapViewer: this.isMapViewer,
      };
      ControlPanelService.getApiAppControlPanelControlPanelMapMarker(pam)
        .then((result) => {
          let latitude = 1.318935824661909;
          let longitude = 103.89456198166204;
          let zoom = 14;
          const resultData = result[0] ?? {};
          if (this.viewPoint && this.viewPoint.latitude != 0) {
            latitude = this.viewPoint.latitude;
            longitude = this.viewPoint.longitude;
            zoom = 18;
          } else {
            if (result[0].latitude && result[0].longitude) {
              latitude = result[0].latitude;
              longitude = result[0].longitude;
            }
          }

          if (this.mapElem == null || this.mapElem == undefined) {
            this.mapElem = L.map('by_map' + this.id, {
              center: [latitude, longitude], // 中心位置
              zoom: zoom, // 缩放等级
              minZoom: 14,
              maxZoom: 18,
              zoomControl: false, //禁用 + - 按钮
              doubleClickZoom: false, // 禁用双击放大
              attributionControl: false, // 移除右下角leaflet标识
            });
            const url = `https://tile.openstreetmap.org/{z}/{x}/{y}.png`;
            // const url = `${remoteServiceBaseUrl}/DecompressingFiles/map/${resultData.decompressingFileId}/${resultData.fileIName}/{z}/{x}/{y}.png`;
            // const url = `${ remoteServiceBaseUrl } /DecompressingFiles/projects / 2d799363 - 9dec - 87d0 - a072 - 3a14f1dc114a / map / 14 / 13283 / 8543.png`
            L.tileLayer(url, {
              foo: 'bar',
            }).addTo(this.mapElem); // 加载地图
            const that = this;
            this.mapElem.on('click', function (e) {
              if (that.isBinding) {
                //绑定设备弹出
                if (that.bindingType == 'device' || that.bindingType == 'slaveDevice') {
                  that.showBindingModal(e);
                } else {
                  that.buildingFloorBinding(e);
                }
              }
            });
          }
          try {
            for (const marker of result) {
              const obj = {} as any;
              obj.latitude = marker.latitude;
              obj.longitude = marker.longitude;
              obj.title = marker.title;
              obj.description = marker.description;
              obj.pid = 11;
              obj.markerType = marker.type;
              obj.deviceStatusId = marker.deviceStatusId;
              obj.id = marker.id;
              obj.commandMode = marker.commandMode;
              obj.isIndoorTrackingDevice = marker.isIndoorTrackingDevice;
              obj.peopleAround = marker.peopleAround;
              this.addMarker(obj);
            }

            // const router = useRouter();
            // if (router) {
            //   const { currentRoute } = router;
            //   const query = currentRoute.value.query;
            //   if (!query.logId) return;
            //   const obj = new addMakerObject();

            //   obj.latitude = this.viewPoint.latitude;
            //   obj.longitude = this.viewPoint.longitude;
            //   (obj.title as any) = query.userName;
            //   obj.description = '';
            //   obj.pid = 11;
            //   obj.markerType = 'user';
            //   obj.deviceStatusId = '';
            //   (obj.id as any) = query.logId;
            //   obj.commandMode = '';
            //   // obj.isIndoorTrackingDevice = marker.isIndoorTrackingDevice;
            //   // obj.peopleAround = marker.peopleAround;
            //   this.addMarker(obj);
            // }
            // Binding the events

            this.initDrawingTool();
          } catch (error) {
            console.log('this.initDrawingTool', error);
          }
        })
        .catch((err) => {});
    },
    drawRectangle() {
      this.mapElem.pm.enableDraw('Rectangle', {
        snappable: true,
        snapDistance: 20,
      });
    },
    drawCircle() {
      this.mapElem.pm.enableDraw('Circle', {
        snappable: true,
        snapDistance: 20,
      });
    },
    disableDraw() {
      this.mapElem.pm.disableDraw('Rectangle');
    },
    /**初始化画图工具 */
    initDrawingTool() {
      //设计端才初始化画图工具
      if (this.isDesign) {
        this.mapElem.pm.addControls({
          position: 'topleft',
          color: '#FF6E00',
          drawPolygon: true, // 绘制多边形
          drawMarker: false, //绘制标记点
          drawCircleMarker: false, //绘制圆形标记
          drawPolyline: false, //绘制线条
          drawRectangle: true, //绘制矩形
          drawCircle: false, //绘制圆圈
          editMode: true, //编辑多边形
          dragMode: true, //拖动多边形
          cutPolygon: false, // 添加一个按钮以删除多边形里面的部分内容
          removalMode: true, // 清除多边形
        });
      }
      this.mapElem.on('pm:create', (e) => {
        console.log(e.layer._latlngs, '绘制完成时调用');
      });
      // //根据id查出边线数据
      ControlPanelService.getApiAppControlPanelMapSidelineMakers({
        buildingId: this.id || '',
      }).then((res) => {
        const eyes = [];
        if (res.length > 0) {
          //对点位数据进行分组
          const markerList = groupBy(res, 'groupId');

          for (const marker of markerList) {
            const markerArr = [] as any[];
            for (const mar of marker as any) {
              markerArr.push([mar.latitude, mar.longitude]);
            }
            // 绘制多边形
            // color：线段颜色
            // weight：线段宽度
            // opacity：线段透明度
            // dashArray：虚线间隔
            // fill：是否填充内部(true/false)
            // fillColor:内部填充颜色，如不设置，默认为color颜色
            // fillOpacity：内部填充透明度
            L.polygon(markerArr).addTo(this.mapElem);
            //  eyes.push(polygon);
          }
        }
      });
    },
    //保存描边事件
    saveOutline() {
      if (!this.isDesign) {
        return;
      }

      //获取地图中的多变形
      const oulines: any[] = [];
      for (const layer of Object.values(this.mapElem._layers)) {
        if ((layer as any)._latlngs != undefined) {
          oulines.push((layer as any)._latlngs[0]);
        }
      }
      const requestBody: EditMapSidelineInput = {};
      requestBody.buildingMapId = this.id;
      requestBody.makers = [] as EditMapSidelineDto[];
      for (const markers of oulines) {
        const guid = idHelper.getGuid();
        for (const marker of markers) {
          if (marker == null) continue;
          const dto: EditMapSidelineDto = {};
          dto.groupId = guid;
          dto.latitude = String(marker.lat);
          dto.longitude = String(marker.lng);
          requestBody.makers.push(dto);
        }
      }
      ControlPanelService.postApiAppControlPanelEditMapSideline({ requestBody }).then(() => {
        this.notify.success({
          message: this.l('Unified.texts.SavedSuccessfully'),
        });
      });
    },
    /** 加载设备状态定义 */
    loadDeviceStatus() {
      ControlPanelService.getApiAppControlPanelDeviceStatus().then((res: any) => {
        this.deviceStatusDict = {};
        for (const dto of res) {
          this.deviceStatusDict[dto.id] = dto;
        }
        this.init();
      });
    },
    showBindingModal(e) {
      this.bindingObj = e;
      this.$emit('update:visible', true);
    },
    bindingMaker(isDefault: boolean) {
      const that = this;
      const e = this.bindingObj;
      if (this.bindingModalDispay) {
        return;
      }
      this.bindingModalDispay = true;

      //获取之前标点出坐标外数据用于给新点位信息
      const input = {} as any;
      input.id = that.bindingId;
      input.latitude = e.latlng.lat;
      input.longitude = e.latlng.lng;
      //标点类型和地图类型是相同情况下
      if (that.type == that.bindingType) {
        const marker = that.deleteOldMarker(input.id);
        const obj = {} as addMakerObject;
        obj.latitude = e.latlng.lat;
        obj.longitude = e.latlng.lng;
        if (marker != null && marker != undefined) {
          obj.title = marker.title;
          obj.description = marker.description;
          obj.pid = 11;
          obj.markerType = marker.type;
          obj.deviceStatusId = marker.deviceStatus;
          obj.id = marker.id;
        }
        if (that.type == 'site') {
          SiteService.putApiAppSiteMapMarker(input).then(() => {
            that.mapElem.setView([input.latitude, input.longitude]);
            // that.addMarker(obj);
          });
        } else if (that.type == 'building') {
          BuildingService.putApiAppBuildingMapMarker(input).then(() => {
            // that.addMarker(obj);
            that.mapElem.setView([input.latitude, input.longitude]);
          });
        } else if (that.type == 'floor') {
          BuildingFloorService.putApiAppBuildingFloorMapMarker(input).then(() => {
            //that.addMarker(obj);
            that.mapElem.setView([input.latitude, input.longitude]);
          });
        }
      } else {
        const marker = that.deleteOldMarker(input.id);
        const PointViewInput = {
          deviceId: that.bindingId,
          graphicPanelId: that.graphicPanelId,
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          isDefultBoundBuilding: isDefault,
          boundBuildingId: this.id,
        } as any;
        ControlPanelService.postApiAppControlPanelGraphicPanelDevicePointView({
          requestBody: PointViewInput,
        })
          .finally(() => {})
          .then((res) => {
            const obj = {} as any;
            obj.latitude = e.latlng.lat;
            obj.longitude = e.latlng.lng;
            obj.pid = 11;
            obj.deviceStatusId = res.deviceStatusId;
            obj.title = res.title;
            obj.markerType = res.type;
            obj.id = res.id;
            obj.commandMode = res.commandMode;
            that.addMarker(obj);
          });
      }
      that.$emit('update:isBinding', false);
      that.bindingModalDispay = false;
    },
    deleteOldMarker(delKey) {
      let oldId;
      let oldMarker;
      //先删除之前的标点marker
      if (this.mapMarkerList[delKey] != undefined) {
        this.mapElem.removeLayer(this.mapMarkerList[delKey]);
        this.mapElem.removeLayer(this.divMarkerList[delKey]);

        oldMarker = this.mapMarkerList[delKey].options.data;
        this.mapMarkerList[delKey] = undefined;
        this.divMarkerList[delKey] = undefined;
      }
      return oldMarker;
    },
    async addMarker(addObj: any) {
      let marker;
      addObj.markerType = addObj.markerType.replace(' ', '').toLowerCase();
      if (
        addObj.markerType != 'site' &&
        addObj.markerType != 'building' &&
        addObj.markerType != 'floor'
      ) {
        const mapLocation = L.latLng(addObj.latitude, addObj.longitude); //new Microsoft.Maps.Location(addObj.latitude, addObj.longitude);
        if (!addObj.deviceStatusId) {
          addObj.deviceStatusId = '';
        }
        let deviceStatus = this.deviceStatusDict[addObj.deviceStatusId.toString()];
        let iconPath = '';
        if (deviceStatus !== null && deviceStatus !== undefined) {
          iconPath = (await getFileUrlById(deviceStatus.statusIconFont)) ?? '';
        } else {
          //TODO :添加默认icon
          iconPath = '/public/assets/images/app/user.png';
          deviceStatus = {};
          deviceStatus.messageBackgroundColorCode = 'red';
        }

        iconPath = encodeURI(iconPath);
        // const pin = await this.createScaledPushpin(mapLocation, iconPath, addObj.title);
        // marker = pin;
        if (iconPath == '') {
          return;
        }

        const myCustomColour = '#583470';

        const markerHtmlStyles = `
      background-color: ${deviceStatus.messageBackgroundColorCode};
      width: 2rem;
      height: 2rem;
      display: block;
      left: -1rem;
      top: -1rem;
      position: relative;
      border-radius: 3rem 3rem 0;
      transform: rotate(45deg);
      border: 1px solid #FFFFFF`;

        const titleHtmlStyles = `
      color:black;
      display: block;
      left: -50%;
      top: -0.6rem;
      position: relative;
      text-align: center;
      `;

        const iconHtmlStyle = `
      background-image: url('data:image/jpeg;${iconPath}');
      width: 60%;
      height: 60%;
      background-size: 100% 100%;
      background-attachment: fixed;
      display: block;
      margin: 18%;
      transform: rotate(-45deg);
      `;
        const numberHtmlStyle = `width: 15px;
      height: 15px;
      display: block;
      position: relative;
      background: red;
      z-index: 9;
      color: #fff;
      text-align: center;
      align-content: center;
      left: 7px;
      border-radius: 50%; `;
        let html = `<div style="width:max-content" > <span style="${markerHtmlStyles}" > <span style="${iconHtmlStyle}" > </span></span > <span style="${titleHtmlStyles}" > ${addObj.title} </span></div> `;

        if (addObj.isIndoorTrackingDevice && !this.isDesign) {
          html = `<div style="width:max-content" > <span style="${numberHtmlStyle}" > ${addObj.peopleAround.length} </span><span style="${markerHtmlStyles}" ><span style="${iconHtmlStyle}"></span> </span><span style="${titleHtmlStyles}">${addObj.title}</span> </div>`;
        }
        const iconMarker = L.divIcon({
          className: 'my-custom-pin',
          iconAnchor: [0, 24],
          labelAnchor: [-6, 0],
          popupAnchor: [0, -36],
          html: html,
        });

        //删除之前的设备标点
        if (this.divMarkerList[addObj.id.toString()] != null) {
          this.mapElem.removeLayer(this.divMarkerList[addObj.id.toString()]);
        }

        const divMarker = L.marker(mapLocation, { data: addObj, icon: iconMarker })
          // .bindPopup(addObj.description)
          .addTo(this.mapElem);
        // this.mapMarkerList[addObj.id.toString()] = iconMarker;
        this.divMarkerList[addObj.id.toString()] = divMarker;

        divMarker.on('click', (e) => {
          if (this.isDesign) {
            return;
          }
          const data = e.target.options.data;
          const markerInfo = {} as any;
          markerInfo.markerType = data.markerType; // 设备类型
          markerInfo.id = data.id; // 设备id
          markerInfo.title = data.title; // 设备名称
          markerInfo.graphicPanelId = this.graphicPanelId;
          markerInfo.latitude = data.latitude;
          markerInfo.longitude = data.markerInfo;
          markerInfo.commandMode = data.commandMode;
          this.onMarkClick(markerInfo);
        });
        /**设计端 右键坐标 */
        if (this.isDesign) {
          divMarker.on('contextmenu', (e) => {
            const data = e.target.options.data;
            this.menuDeviceId = data.id; // 设备id
            this.isMenuVisible = true;
            this.top = e.containerPoint.y;
            this.left = e.containerPoint.x;
          });
        }
      }

      //for azure maps only
      //var marker = new atlas.HtmlMarker({
      //    draggable : true,
      //    htmlContent: "<div><div class='pin bounce'></div><div class='pulse'></div></div>",
      //    position: [latitude, longitude],

      //    pixelOffset: [5, -18]
      //});
    },
    /**
     * 解绑
     * @param markerInfo
     */
    onUnBind(markerInfo) {},
    createScaledPushpin(location, imgUrl, title) {
      return new Promise<any[]>((res, rej) => {
        const img = new Image();

        // 加载处理
        img.onload = function () {
          const c = document.createElement('canvas');
          const context = c.getContext('2d') as CanvasRenderingContext2D;

          c.width = 40;
          c.height = 40;

          //Draw scaled image
          context.drawImage(img, 0, 0, c.width, c.height);

          const pin = new Microsoft.Maps.Pushpin(location, {
            //Generate a base64 image URL from the canvas.
            icon: c.toDataURL(),
            title: title,
            //Anchor based on the center of the image.
            anchor: new Microsoft.Maps.Point(c.width / 2, c.height / 2),
          });
          res(pin);
        };

        // 设置图片加载
        img.setAttribute('crossOrigin', 'Anonymous');
        img.src = imgUrl;
      });
    },
    createFontPushpin(location, text, fontName, fontSizePx, color, subTitle) {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d') as CanvasRenderingContext2D;

      //Define font style
      const font = '900 ' + fontSizePx + 'px ' + fontName;
      ctx.font = font;

      //Resize canvas based on sie of text.
      const size = ctx.measureText(text);
      c.width = size.width;
      c.height = fontSizePx;

      //Reset font as it will be cleared by the resize.
      ctx.font = font;
      ctx.textBaseline = 'top';
      ctx.fillStyle = color;

      ctx.fillText(text, 0, 0);

      return new Microsoft.Maps.Pushpin(location, {
        icon: c.toDataURL(),
        title: subTitle,
        anchor: new Microsoft.Maps.Point(c.width / 2, c.height / 2), //Align center of pushpin with location.
        draggable: false,
        id: 'aabbbsjsjdu',
      });
    },
    /** 标记点击 */
    onMarkClick(marker) {
      // const deviceType = marker.markerType; // 设备类型
      const deviceId = marker.id; // 设备id
      const deviceName = marker.title; // 设备名称
      //将类型小写和去除空格方便类型匹配
      const commandMode = marker.commandMode.toLowerCase().replace(/\s*/g, ''); // 设备类型

      const deviceCtrlViewDef = CTRL_VIEW_DICT[commandMode];
      this.$emit('normalClick', marker);
      if (!deviceCtrlViewDef) {
        return;
      }
      ControlPanelService.getApiAppControlPanelDeviceTypeFunctionByDeviceId({ deviceId })
        .finally(() => {})
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
        });
    },
    //刷新页面图标
    refreshDeviceStatus() {
      //先删除之前的标点marker
      for (const marker of Object.values(this.mapMarkerList)) {
        const delKey = marker.options.data.id;
        if (this.mapMarkerList[delKey] != undefined) {
          this.mapElem.removeLayer(this.mapMarkerList[delKey]);
          this.mapElem.removeLayer(this.divMarkerList[delKey]);
          this.mapMarkerList[delKey] = undefined;
          this.divMarkerList[delKey] = undefined;
        }
      }
      this.init();
    },
    /**建筑绑定 */
    buildingFloorBinding(e) {
      const that = this;
      Modal.confirm({
        title: 'Whether to bind to the center of the map ?',
        onCancel() {
          that.$emit('update:isBinding', false);
          that.bindingModalDispay = false;
        },
        onOk() {
          if (that.bindingModalDispay) {
            return;
          }
          that.bindingModalDispay = true;
          const requestBody = {
            id: that.bindingId,
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
            type: that.bindingType,
          } as SetBuildingFloorPointInput;
          ControlPanelService.postApiAppControlPanelSetBuildingFloorPoint({ requestBody }).then(
            (res) => {
              if (res) {
                that.notify.success({ message: 'Binding Success!' });
              } else {
                that.notify.error({ message: 'Binding Error!' });
              }
            },
          );

          that.$emit('update:isBinding', false);
          that.bindingModalDispay = false;
        },
      });
    },
  },
});
