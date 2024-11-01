import { IBimMarkDef } from '/@/wave/component';
import { AppConsts } from '/@/abpPro/AppConsts';
// import { apiHttpClient } from '/@/shared';
import { getFileUrlById } from '@/shared/components/f-upload/src/helper';
// import {
//   DeviceTypeDto,
//   DeviceStatusDto,
//   DevicePointViewWithNavigationPropertiesDto,
//   ControlPanelServiceProxy
// } from '/@/shared/service-proxies';
import {
  ControlPanelService as ControlPanelServices,
  FireBytes_Unified_Wave_ControlPanels_Dto_DevicePointViewWithNavigationPropertiesDto as DevicePointViewWithNavigationPropertiesDto,
  FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto as DeviceTypeDto,
  FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto as DeviceStatusDto,
} from '@/apis';
export class ControlPanelService {
  /** 后端接口 */
  // api: ControlPanelServiceProxy;
  /** 设备状态字典 */
  deviceStatusDict: { [key: string]: any };
  /** 设备类型字典 */
  deviceTypesDict: { [key: string]: any };

  constructor() {
    // this.api = new ControlPanelServiceProxy(AppConsts.remoteServiceBaseUrl, apiHttpClient);

    this.initData().then(() => {});
  }

  /** 初始化数据:设备类型，设备状态 */
  initData() {
    return new Promise<void>((res, rej) => {
      // 已经初始化
      if (!!this.deviceStatusDict) {
        res();
        return;
      }

      // 第一次初始化
      Promise.all([
        ControlPanelServices.getApiAppControlPanelDeviceStatus(),
        ControlPanelServices.getApiAppControlPanelDeviceTypes(),
      ]).then(([statusRes, typeRes]) => {
        // 状态
        this.deviceStatusDict = {};
        for (const dto of statusRes) {
          this.deviceStatusDict[dto.id || ''] = dto;
        }

        // 类型
        this.deviceTypesDict = {};
        for (const dto of typeRes) {
          this.deviceTypesDict[dto.id || ''] = dto;
        }
      });
    });
  }

  // ======================== 前端帮助 ========================

  /**
   * 设备点集合转标记
   * @param dtos  设备点集合
   * @returns 标记定义
   */
  devicePoints2BimMarks(
    dtos: DevicePointViewWithNavigationPropertiesDto[],
  ): Promise<IBimMarkDef[]> {
    return new Promise<IBimMarkDef[]>((res, rej) => {
      this.initData().then(() => {
        const markDefList = this.innerDevicePoints2BimMarks(
          dtos,
          this.deviceTypesDict,
          this.deviceStatusDict,
        );
        res(markDefList);
      });
    });
  }

  /**
   * 设备点转标记
   * @param title 标题
   * @param description 描述
   * @param deviceId 设备Id
   * @param markerType 标记类型
   * @param deviceStatusId 设备状态id
   * @param worldPos 坐标
   * @param deviceStatusDict 设备状态
   */
  devicePoint2BimMark(
    title: string,
    description: string,
    deviceId: string,
    markerType: DeviceTypeDto,
    deviceStatusId: string,
    worldPos: number[],
  ) {
    return new Promise<IBimMarkDef>((res, rej) => {
      this.initData().then(() => {
        const markDef = this.innerDevicePoint2BimMark(
          title,
          description,
          deviceId,
          markerType,
          deviceStatusId,
          worldPos,
          this.deviceStatusDict,
        );

        res(markDef);
      });
    });
  }

  /**
   * 设备点集合转标记
   * @param dtos  设备点集合
   * @param deviceTypesDict 设备类型字典
   * @param deviceStatusDict 设备状态字典
   * @returns 标记定义
   */
  innerDevicePoints2BimMarks(
    dtos: DevicePointViewWithNavigationPropertiesDto[],
    deviceTypesDict: { [key: string]: DeviceTypeDto },
    deviceStatusDict: { [key: string]: DeviceStatusDto },
  ) {
    if (!Array.isArray(dtos)) {
      dtos = [];
    }
    const res: IBimMarkDef[] = [];
    for (const dto of dtos) {
      if (
        !dto.amsDevice ||
        !dto.amsDevicePointView.pointXvalue ||
        !dto.amsDevicePointView.pointYvalue ||
        !dto.amsDevicePointView.pointZvalue
      ) {
        // dto数据不正确，跳过
        continue;
      }
      // 转换坐标点
      const worldPos = [
        dto.amsDevicePointView.pointXvalue,
        dto.amsDevicePointView.pointYvalue,
        dto.amsDevicePointView.pointZvalue,
      ];
      const deviceType = deviceTypesDict[dto.amsDevice.deviceTypeId];
      // 转换为标记
      const markDef = this.innerDevicePoint2BimMark(
        dto.amsDevice.deviceName,
        '',
        dto.amsDevice.id,
        deviceType,
        dto.amsDevice.deviceStatusId,
        worldPos,
        deviceStatusDict,
      );
      res.push(markDef);
    }
    return res;
  }

  /**
   * 设备点转标记
   * @param title 标题
   * @param description 描述
   * @param deviceId 设备Id
   * @param markerType 标记类型
   * @param deviceStatusId 设备状态id
   * @param worldPos 坐标
   * @param deviceStatusDict 设备状态
   */
  async innerDevicePoint2BimMark(
    title: string,
    description: string,
    deviceId: string,
    markerType: DeviceTypeDto,
    deviceStatusId: string,
    worldPos: number[],
    deviceStatusDict: { [key: string]: DeviceStatusDto },
  ) {
    let faIconClass = '';
    if (deviceStatusDict[deviceStatusId]) {
      faIconClass = (await getFileUrlById(deviceStatusDict[deviceStatusId].statusIconFont)) || '';
    } else {
      //TODO : 添加默认icon
      faIconClass = '';
    }
    //const //markerType.deviceTypeIcon != null ? markerType.deviceTypeIcon : 'fa-question';
    const markerBGColor =
      typeof deviceStatusDict[deviceStatusId] != 'undefined' &&
      deviceStatusDict[deviceStatusId].messageBackgroundColorCode != null
        ? deviceStatusDict[deviceStatusId].messageBackgroundColorCode
        : 'grey';
    const res: IBimMarkDef = {
      id: deviceId,
      worldPos: worldPos,
      faIconClass: faIconClass,
      title: title,
      description: description,
      markerBGColor: markerBGColor,
      commandMode: markerType.commandMode ? markerType?.commandMode.toLocaleLowerCase() : '',
      markerType: markerType.deviceTypeName
        ? markerType?.deviceTypeName.toLowerCase().replaceAll(' ', '')
        : '',
      // commandMode: 'button',
      // markerType: 'relay',
      visible: true,
    };
    return res;
  }
}

// 公共的

export interface IPagedResultDto<T> {
  totalCount: number;
  items: T[];
}
/**
 * 设备类型
 */
export interface IDeviceTypeDto {
  id?: string;
  deviceTypeName?: string;
  description?: string;
  deviceTypeUri?: string;
  iconUnicode?: string;

  iconClassName?: string;
  concurrencyStamp?: string;
}

/** 设备状态 */
export interface IAmsDeviceStatusDto {
  id?: string;
  name?: string;
  colorName?: string;
  colorHexCode?: string;
  concurrencyStamp?: string;
}

// 设备点
export interface IAmsDevicePointViewWithNavigationPropertiesDto {
  amsDevicePointView?: IAmsDevicePointViewDto;
  amsDevice?: IAmsDeviceDto;
  amsBuildingFloor?: IAmsBuildingFloorDto;
}

export interface IAmsDevicePointViewDto {
  id?: string;
  latitude?: number;
  longitude?: number;
  pointXvalue?: number;
  pointYvalue?: number;
  pointZvalue?: number;
  amsDeviceId?: string;
  amsBuildingFloorId?: string;
  concurrencyStamp?: string;
}

export interface IAmsDeviceDto {
  id?: string;
  deviceName?: string;
  deviceIp?: string;
  devicePort?: number;
  loginId?: string;
  loginPassword?: string;
  deviceMacAddress?: string;
  deviceUnitName?: string;
  vendorCameraId?: string;
  deviceBrandId?: string;
  deviceTypeId?: string;
  amsBuildingFloorId?: string;
  amsDeviceStatusId?: string;

  concurrencyStamp?: string;
}

export interface IAmsBuildingFloorDto {
  id?: string;
  buildingFloor?: string;
  floorPlanPicture?: string;
  viewerCode?: number;
  amsBuildingId?: string;

  concurrencyStamp?: string;
}
