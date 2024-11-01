/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_WidgetAppServices_Dtos_AlertDeviceConfigDto = {
    properties: {
        defaultBuildingId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        cameraIdList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
