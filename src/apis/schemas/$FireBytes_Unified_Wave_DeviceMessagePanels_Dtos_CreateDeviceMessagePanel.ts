/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_CreateDeviceMessagePanel = {
    properties: {
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        submissionDateTime: {
            type: 'string',
            format: 'date-time',
        },
        responseDateTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        isSuccessful: {
            type: 'boolean',
        },
        responseResult: {
            type: 'string',
            isNullable: true,
        },
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
        deviceName: {
            type: 'string',
            isNullable: true,
        },
        deviceVendorSystemId: {
            type: 'string',
            isNullable: true,
        },
        deviceHostNameOrIp: {
            type: 'string',
            isNullable: true,
        },
        deviceHostPort: {
            type: 'number',
            format: 'int32',
        },
        deviceHostWebAddress: {
            type: 'string',
            isNullable: true,
        },
        deviceSlaveId: {
            type: 'string',
            isNullable: true,
        },
        deviceMacAddress: {
            type: 'string',
            isNullable: true,
        },
        deviceModel: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeFunctionId: {
            type: 'string',
            format: 'uuid',
        },
        messagePriority: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        deviceFunction: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeName: {
            type: 'string',
            isNullable: true,
        },
        serviceName: {
            type: 'string',
            isNullable: true,
        },
        statusId: {
            type: 'string',
            format: 'uuid',
        },
        statusName: {
            type: 'string',
            isNullable: true,
        },
        statusIconFont: {
            type: 'string',
            isNullable: true,
        },
        statusCode: {
            type: 'string',
            isNullable: true,
        },
        isAlert: {
            type: 'boolean',
        },
        vendorStatusCode: {
            type: 'string',
            isNullable: true,
        },
        messageBackgroundColorCode: {
            type: 'string',
            isNullable: true,
        },
        requireAlertAcknowledgement: {
            type: 'boolean',
        },
        brandName: {
            type: 'string',
            isNullable: true,
        },
        siteName: {
            type: 'string',
            isNullable: true,
        },
        buildingName: {
            type: 'string',
            isNullable: true,
        },
        floor: {
            type: 'string',
            isNullable: true,
        },
        acknowledgedComment: {
            type: 'string',
            isNullable: true,
        },
        acknowledgedDateTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        acknowledgedBy: {
            type: 'string',
            isNullable: true,
        },
        details: {
            type: 'string',
            isNullable: true,
        },
        requestMesssageId: {
            type: 'string',
            isNullable: true,
        },
        vendorEventId: {
            type: 'string',
            isNullable: true,
        },
        faceData: {
            type: 'string',
            isNullable: true,
            format: 'byte',
        },
        isAlertDelete: {
            type: 'boolean',
        },
        isAlertConfirm: {
            type: 'boolean',
        },
        cardHolderId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        cardHolderName: {
            type: 'string',
            isNullable: true,
        },
        alertImage: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
