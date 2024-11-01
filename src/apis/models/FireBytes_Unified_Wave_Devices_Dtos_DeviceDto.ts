/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_BuildingFloors_Dtos_BuildingFloorDto } from './FireBytes_Unified_Wave_BuildingFloors_Dtos_BuildingFloorDto';
import type { FireBytes_Unified_Wave_DevicePointViews_Dtos_DevicePointViewDto } from './FireBytes_Unified_Wave_DevicePointViews_Dtos_DevicePointViewDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto } from './FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_InterfaceServiceDto } from './FireBytes_Unified_Wave_Devices_Dtos_InterfaceServiceDto';
export type FireBytes_Unified_Wave_Devices_Dtos_DeviceDto = {
    deviceName?: string | null;
    deviceHostNameOrIp?: string | null;
    deviceHostPort?: number;
    deviceHostWebAddress?: string | null;
    deviceSlaveId?: string | null;
    deviceMacAddress?: string | null;
    deviceModel?: string | null;
    deviceVendorSystemId?: string | null;
    interfaceServiceId?: string;
    interfaceService?: FireBytes_Unified_Wave_Devices_Dtos_InterfaceServiceDto;
    deviceTypeId?: string | null;
    deviceType?: FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto;
    buildingFloorId?: string | null;
    credentialProfileId?: string | null;
    deviceStatusId?: string | null;
    deviceStatusIdCache?: string | null;
    deviceCategoryId?: string | null;
    buildingFloor?: FireBytes_Unified_Wave_BuildingFloors_Dtos_BuildingFloorDto;
    tenantId?: string | null;
    devicePointViews?: Array<FireBytes_Unified_Wave_DevicePointViews_Dtos_DevicePointViewDto> | null;
    defaultBuildingId?: string | null;
    deviceGroupId?: string | null;
    isStitchingViewCamera?: boolean;
    deviceEditCustomFieldsJson?: string | null;
    masterDeviceId?: string | null;
    channel?: string | null;
    position?: string | null;
};

