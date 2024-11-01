/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto } from './FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto';
export type FireBytes_Unified_Wave_ControlPanels_Dto_ControlPanelMapMarkerDto = {
    id?: string;
    title?: string | null;
    description?: string | null;
    type?: string | null;
    deviceStatus?: FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto;
    deviceStatusId?: string | null;
    latitude?: number;
    longitude?: number;
    commandMode?: string | null;
    peopleAround?: Array<string> | null;
    isIndoorTrackingDevice?: boolean;
    decompressingFileId?: string | null;
    fileIName?: string | null;
};

