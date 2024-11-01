/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDeviceAccessScheduleGroup_PacsCardHolderDeviceAccessScheduleGroupEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        pacsCardHolderId: {
            type: 'string',
            format: 'uuid',
        },
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
        deviceName: {
            type: 'string',
            isNullable: true,
        },
        startDateTime: {
            type: 'string',
            format: 'date-time',
        },
        endDateTime: {
            type: 'string',
            format: 'date-time',
        },
        pacsDeviceAccessScheduleGroupId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
