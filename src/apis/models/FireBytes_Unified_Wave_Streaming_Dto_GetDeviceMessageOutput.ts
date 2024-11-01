/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Streaming_Dto_DeviceServer } from './FireBytes_Unified_Wave_Streaming_Dto_DeviceServer';
export type FireBytes_Unified_Wave_Streaming_Dto_GetDeviceMessageOutput = {
    tenantId?: string | null;
    deviceId?: string;
    deviceName?: string | null;
    vendorSystemId?: string | null;
    deviceHostNameOrIp?: string | null;
    deviceHostPort?: number | null;
    deviceSlaveId?: string | null;
    isStitchingViewCamera?: boolean;
    deviceEditCustomFieldsJson?: string | null;
    masterDeviceId?: string | null;
    deviceTypeName?: string | null;
    deviceBrandName?: string | null;
    deviceServerList?: Array<FireBytes_Unified_Wave_Streaming_Dto_DeviceServer> | null;
};

