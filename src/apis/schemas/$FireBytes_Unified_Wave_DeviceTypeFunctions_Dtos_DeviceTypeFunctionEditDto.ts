/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceTypeFunctions_Dtos_DeviceTypeFunctionEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceFunction: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        deviceTypeFunctionCode: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        vendorFunctionCode: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        description: {
            type: 'string',
            isNullable: true,
            maxLength: 255,
        },
        deviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceStatusId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        buttonAction: {
            type: 'string',
            isNullable: true,
        },
        isChangeDeviceStatus: {
            type: 'boolean',
        },
        isSystemFunction: {
            type: 'boolean',
        },
    },
} as const;
