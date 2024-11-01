/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Shared_CustomFields } from './FireBytes_Unified_Shared_CustomFields';
export type FireBytes_Unified_Wave_DeviceTypes_Dtos_DeviceTypeEditDto = {
    id?: string | null;
    deviceTypeName?: string | null;
    deviceTypeIcon?: string | null;
    description?: string | null;
    releaseNote?: string | null;
    vendorSoftwareNote?: string | null;
    displayOrder?: number | null;
    brandId?: string | null;
    isShowMapViewer?: boolean | null;
    isSettingCamera?: boolean | null;
    cameraLimitNumber?: number | null;
    isSettingDeviceGroup?: boolean | null;
    isSysteam?: boolean | null;
    customFields?: Array<FireBytes_Unified_Shared_CustomFields> | null;
    commandMode?: string | null;
    deviceTypeRole?: string | null;
    redundantServer?: boolean | null;
    redundantInterfaceService?: boolean | null;
    masterDeviceTypeId?: string | null;
};

