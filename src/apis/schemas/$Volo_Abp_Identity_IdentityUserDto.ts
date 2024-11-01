/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Volo_Abp_Identity_IdentityUserDto = {
    properties: {
        extraProperties: {
            type: 'dictionary',
            contains: {
                properties: {
                },
            },
            isReadOnly: true,
            isNullable: true,
        },
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
        tenantId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        userName: {
            type: 'string',
            isNullable: true,
        },
        email: {
            type: 'string',
            isNullable: true,
        },
        name: {
            type: 'string',
            isNullable: true,
        },
        surname: {
            type: 'string',
            isNullable: true,
        },
        emailConfirmed: {
            type: 'boolean',
        },
        phoneNumber: {
            type: 'string',
            isNullable: true,
        },
        phoneNumberConfirmed: {
            type: 'boolean',
        },
        supportTwoFactor: {
            type: 'boolean',
        },
        twoFactorEnabled: {
            type: 'boolean',
        },
        isActive: {
            type: 'boolean',
        },
        lockoutEnabled: {
            type: 'boolean',
        },
        isLockedOut: {
            type: 'boolean',
        },
        lockoutEnd: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        shouldChangePasswordOnNextLogin: {
            type: 'boolean',
        },
        concurrencyStamp: {
            type: 'string',
            isNullable: true,
        },
        roleNames: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
        accessFailedCount: {
            type: 'number',
            format: 'int32',
        },
        lastPasswordChangeTime: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        isExternal: {
            type: 'boolean',
        },
    },
} as const;
