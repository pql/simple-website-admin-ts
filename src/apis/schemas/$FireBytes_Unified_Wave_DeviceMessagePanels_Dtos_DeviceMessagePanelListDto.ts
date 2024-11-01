/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_DeviceMessagePanels_Dtos_DeviceMessagePanelListDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        creationTime: {
            type: 'string',
            format: 'date-time',
        },
        creatorId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        lastModificationTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        lastModifierId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        isDeleted: {
            type: 'boolean',
        },
        deleterId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        deletionTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        creatorName: {
            type: 'string',
            isNullable: true,
        },
        lastModifierName: {
            type: 'string',
            isNullable: true,
        },
        deleterName: {
            type: 'string',
            isNullable: true,
        },
        tenantId: {
            type: 'string',
            format: 'uuid',
        },
        submissionDateTime: {
            type: 'string',
            format: 'date-time',
        },
        responseDateTime: {
            type: 'string',
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
        vendorStatusCode: {
            type: 'string',
            isNullable: true,
        },
        faceData: {
            type: 'string',
            isNullable: true,
            format: 'byte',
        },
        faceBase64String: {
            type: 'string',
            isNullable: true,
        },
        statusIconFontBase64String: {
            type: 'string',
            isNullable: true,
        },
        isAlertDelete: {
            type: 'boolean',
        },
        isAlertConfirm: {
            type: 'boolean',
        },
        requestMesssageId: {
            type: 'string',
            isNullable: true,
        },
        vendorEventId: {
            type: 'string',
            isNullable: true,
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
