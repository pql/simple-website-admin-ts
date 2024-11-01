/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_ControlPanels_Dto_CommandSettingDetailDto } from './FireBytes_Unified_Wave_ControlPanels_Dto_CommandSettingDetailDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_DeviceEditCustomFields } from './FireBytes_Unified_Wave_Devices_Dtos_DeviceEditCustomFields';
export type FireBytes_Unified_Wave_ControlPanels_Dto_GetDeviceDetailDto = {
    id?: string | null;
    deviceName?: string | null;
    deviceHostNameOrIp?: string | null;
    deviceHostPort?: number;
    deviceHostWebAddress?: string | null;
    deviceSlaveId?: string | null;
    deviceMacAddress?: string | null;
    deviceModel?: string | null;
    deviceVendorSystemId?: string | null;
    interfaceServiceId?: string | null;
    interfaceService?: string | null;
    deviceTypeId?: string | null;
    deviceType?: string | null;
    deviceStatusId?: string | null;
    deviceStatus?: string | null;
    statusModificationTime?: string;
    buildingFloorId?: string | null;
    buildingFloor?: string | null;
    credentialProfileId?: string | null;
    credentialProfile?: string | null;
    zones?: string | null;
    deviceCategoryId?: string | null;
    deviceCategory?: string | null;
    cameras?: string | null;
    deviceEditCustomFields?: Array<FireBytes_Unified_Wave_Devices_Dtos_DeviceEditCustomFields> | null;
    commandSettings?: Array<FireBytes_Unified_Wave_ControlPanels_Dto_CommandSettingDetailDto> | null;
};

