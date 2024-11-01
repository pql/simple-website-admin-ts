/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderListDto = {
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
        name: {
            type: 'string',
            isNullable: true,
        },
        emailAddress: {
            type: 'string',
            isNullable: true,
        },
        mobileNo: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        userType: {
            type: 'string',
            isNullable: true,
        },
        cardHolderNumber: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        department: {
            type: 'string',
            isNullable: true,
        },
        position: {
            type: 'string',
            isNullable: true,
        },
        dateOfBirth: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        joinedDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        mobileld: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        blacklisted: {
            type: 'boolean',
            isNullable: true,
        },
        gender: {
            type: 'string',
            isNullable: true,
        },
        mobileAccessEnabled: {
            type: 'boolean',
        },
        statusId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        statusName: {
            type: 'string',
            isNullable: true,
        },
        pinNumber: {
            type: 'string',
            isNullable: true,
            maxLength: 8,
        },
    },
} as const;
