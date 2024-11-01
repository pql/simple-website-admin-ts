/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_PassportKioskManagement_PassportKioskMessagePanels_Dtos_PassportKioskMessagePanelListDto = {
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
            isNullable: true,
            format: 'uuid',
        },
        submissionDateTime: {
            type: 'string',
            format: 'date-time',
        },
        messagePriority: {
            type: 'number',
            isNullable: true,
            format: 'int32',
        },
        messageType: {
            type: 'string',
            isNullable: true,
        },
        faceData: {
            type: 'string',
            isNullable: true,
            format: 'byte',
        },
        irisRightData: {
            type: 'string',
            isNullable: true,
            format: 'byte',
        },
        irisLeftData: {
            type: 'string',
            isNullable: true,
            format: 'byte',
        },
        faceBase64String: {
            type: 'string',
            isNullable: true,
        },
        irisRightBase64String: {
            type: 'string',
            isNullable: true,
        },
        irisLeftBase64String: {
            type: 'string',
            isNullable: true,
        },
        faceIsMatch: {
            type: 'boolean',
        },
        irisMatch: {
            type: 'boolean',
        },
        deviceName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        deviceVendorSystemId: {
            type: 'string',
            isNullable: true,
            maxLength: 128,
        },
        flightNo: {
            type: 'string',
            isNullable: true,
            maxLength: 64,
        },
        flightDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        departure: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        departureTerminal: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        departureTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        gate: {
            type: 'string',
            isNullable: true,
            maxLength: 32,
        },
        arrival: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        arrivalTerminal: {
            type: 'string',
            isNullable: true,
        },
        arrivalTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        seatNo: {
            type: 'string',
            isNullable: true,
            maxLength: 32,
        },
        bookingNo: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        seqNo: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        gateCloses: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        name: {
            type: 'string',
            isNullable: true,
            maxLength: 128,
        },
        sex: {
            type: 'string',
            isNullable: true,
            maxLength: 8,
        },
        birth: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        documentType: {
            type: 'string',
            isNullable: true,
        },
        documentId: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        documentImageVisable: {
            type: 'string',
            isNullable: true,
            format: 'byte',
        },
        documentImageVisableBase64String: {
            type: 'string',
            isNullable: true,
        },
        documentImageFace: {
            type: 'string',
            isNullable: true,
            format: 'byte',
        },
        documentImageFaceBase64String: {
            type: 'string',
            isNullable: true,
        },
        nationality: {
            type: 'string',
            isNullable: true,
            maxLength: 64,
        },
        actionType: {
            type: 'string',
            isNullable: true,
            maxLength: 64,
        },
        userType: {
            type: 'string',
            isNullable: true,
            maxLength: 64,
        },
        isBlackList: {
            type: 'boolean',
        },
    },
} as const;
