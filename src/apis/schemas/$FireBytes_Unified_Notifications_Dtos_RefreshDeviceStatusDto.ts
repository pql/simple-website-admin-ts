/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Notifications_Dtos_RefreshDeviceStatusDto = {
    properties: {
        boundBuildingIdList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
    },
} as const;
