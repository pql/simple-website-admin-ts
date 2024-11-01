/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_MessagePanelTableFilterDto = {
    properties: {
        submissionDateTimeStart: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        submissionDateTimeEnd: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        deviceId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deviceName: {
            type: 'string',
            isNullable: true,
        },
        brand: {
            type: 'string',
            isNullable: true,
        },
        functionId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        site: {
            type: 'string',
            isNullable: true,
        },
        dataType: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        responseResult: {
            type: 'string',
            isNullable: true,
        },
        vendorEventId: {
            type: 'string',
            isNullable: true,
        },
        requireAlertAcknowledgement: {
            type: 'boolean',
            isNullable: true,
        },
        isAlertConfirm: {
            type: 'boolean',
            isNullable: true,
        },
        isAlert: {
            type: 'boolean',
            isNullable: true,
        },
    },
} as const;
