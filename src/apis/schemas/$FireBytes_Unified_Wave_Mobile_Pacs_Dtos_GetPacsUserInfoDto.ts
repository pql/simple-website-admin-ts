/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserInfoDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        firstName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        lastName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        photo: {
            type: 'string',
            isNullable: true,
        },
        cardHolderNumber: {
            type: 'string',
            isNullable: true,
            maxLength: 70,
        },
        department: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        position: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        dateOfBirth: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        emailAddress: {
            type: 'string',
            isNullable: true,
        },
        isQRCode: {
            type: 'boolean',
        },
        userType: {
            type: 'string',
            isNullable: true,
        },
        mobileLoginID: {
            type: 'string',
            isNullable: true,
        },
        customFields: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Mobile_Pacs_Dtos_CustomFields',
            },
            isNullable: true,
        },
        joinedDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        status: {
            type: 'string',
            isNullable: true,
        },
        blacklisted: {
            type: 'boolean',
        },
    },
} as const;
