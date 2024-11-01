/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Brands_Dtos_BrandDto } from './FireBytes_Unified_Wave_Brands_Dtos_BrandDto';
export type FireBytes_Unified_Wave_Devices_Dtos_DeviceTypeDto = {
    id?: string;
    deviceTypeName?: string | null;
    deviceTypeIcon?: string | null;
    description?: string | null;
    releaseNote?: string | null;
    vendorSoftwareNote?: string | null;
    displayOrder?: number;
    brandId?: string;
    brand?: FireBytes_Unified_Wave_Brands_Dtos_BrandDto;
    tenantId?: string | null;
    isShowMapViewer?: boolean;
    isSettingCamera?: boolean;
    cameraLimitNumber?: number;
    isSettingDeviceGroup?: boolean;
    isSysteam?: boolean;
    commandMode?: string | null;
    customFieldsJson?: string | null;
    deviceTypeRole?: string | null;
    redundantServer?: boolean;
    redundantInterfaceService?: boolean;
    masterDeviceTypeId?: string | null;
};

