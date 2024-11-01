/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Devices_Dtos_CommandSettingDto } from './FireBytes_Unified_Wave_Devices_Dtos_CommandSettingDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_DeviceEditCustomFields } from './FireBytes_Unified_Wave_Devices_Dtos_DeviceEditCustomFields';
export type FireBytes_Unified_Wave_Devices_Dtos_DeviceEditDto = {
    id?: string | null;
    deviceName?: string | null;
    deviceHostNameOrIp?: string | null;
    deviceHostPort?: number | null;
    deviceHostWebAddress?: string | null;
    deviceSlaveId?: string | null;
    deviceMacAddress?: string | null;
    deviceModel?: string | null;
    deviceVendorSystemId?: string | null;
    interfaceServiceId?: string | null;
    deviceTypeId?: string | null;
    deviceStatusId?: string | null;
    buildingFloorId?: string | null;
    credentialProfileId?: string | null;
    zoneList?: Array<string> | null;
    deviceCategoryId?: string | null;
    deviceGroupId?: string | null;
    cameraIdList?: Array<string> | null;
    deviceEditCustomFields?: Array<FireBytes_Unified_Wave_Devices_Dtos_DeviceEditCustomFields> | null;
    commandSettings?: Array<FireBytes_Unified_Wave_Devices_Dtos_CommandSettingDto> | null;
    isStitchingViewCamera?: boolean;
    masterDeviceId?: string | null;
    slaveDeviceIdList?: Array<string> | null;
    redundantInterfaceServiceIdList?: Array<string> | null;
    channel?: string | null;
    position?: string | null;
};

