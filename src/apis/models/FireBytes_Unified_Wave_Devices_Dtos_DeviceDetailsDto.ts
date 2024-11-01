/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Devices_Dtos_CommandSettingDto } from './FireBytes_Unified_Wave_Devices_Dtos_CommandSettingDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_DeviceDetailsCustomFields } from './FireBytes_Unified_Wave_Devices_Dtos_DeviceDetailsCustomFields';
export type FireBytes_Unified_Wave_Devices_Dtos_DeviceDetailsDto = {
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
    interfaceServiceName?: string | null;
    deviceTypeId?: string | null;
    deviceTypeName?: string | null;
    deviceStatusId?: string | null;
    deviceStatusName?: string | null;
    buildingFloorId?: string | null;
    buildingFloorName?: string | null;
    credentialProfileId?: string | null;
    zoneList?: Array<string> | null;
    deviceCategoryId?: string | null;
    deviceGroupId?: string | null;
    cameraIdList?: Array<string> | null;
    deviceEditCustomFields?: Array<FireBytes_Unified_Wave_Devices_Dtos_DeviceDetailsCustomFields> | null;
    commandSettings?: Array<FireBytes_Unified_Wave_Devices_Dtos_CommandSettingDto> | null;
    isStitchingViewCamera?: boolean;
    masterDeviceId?: string | null;
    slaveDeviceIdList?: Array<string> | null;
    redundantInterfaceServiceIdList?: Array<string> | null;
    network?: string | null;
    status?: string | null;
    channel?: string | null;
    position?: string | null;
    timezone?: string;
};

