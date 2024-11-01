/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_GetContrlPanelRightMessagePanelDto = {
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
        deviceId: {
            type: 'string',
            format: 'uuid',
        },
        deviceName: {
            type: 'string',
            isNullable: true,
        },
        deviceFunction: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeName: {
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
        messageBackgroundColorCode: {
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
        responseResult: {
            type: 'string',
            isNullable: true,
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
    },
} as const;
