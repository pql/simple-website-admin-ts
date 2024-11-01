/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Devices_Dtos_DeviceDto } from './FireBytes_Unified_Wave_Devices_Dtos_DeviceDto';
import type { FireBytes_Unified_Wave_Devices_Dtos_GraphicPanelDto } from './FireBytes_Unified_Wave_Devices_Dtos_GraphicPanelDto';
export type FireBytes_Unified_Wave_DevicePointViews_Dtos_DevicePointViewDto = {
    latitude?: number;
    longitude?: number;
    pointXvalue?: number;
    pointYvalue?: number;
    pointZvalue?: number;
    border?: number;
    deviceId?: string | null;
    device?: FireBytes_Unified_Wave_Devices_Dtos_DeviceDto;
    graphicPanelId?: string;
    boundBuildingId?: string;
    graphicPanel?: FireBytes_Unified_Wave_Devices_Dtos_GraphicPanelDto;
    tenantId?: string | null;
};

