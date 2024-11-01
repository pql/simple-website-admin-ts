/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_DeviceStatusDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        statusName: {
            type: 'string',
            isNullable: true,
        },
        statusIconFont: {
            type: 'string',
            format: 'uuid',
        },
        statusCode: {
            type: 'string',
            isNullable: true,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        messageBackgroundColorCode: {
            type: 'string',
            isNullable: true,
        },
        deviceType: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
