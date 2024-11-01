/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        name: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
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
        userType: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        emailAddress: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        dateOfBirth: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        cardHolderNumber: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        joinedDate: {
            type: 'string',
            isNullable: true,
            format: 'date-time',
        },
        department: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        position: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        mobileNo: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
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
        faceProfileId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        pinNumber: {
            type: 'string',
            isNullable: true,
            maxLength: 8,
        },
        phoneList: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderPhones_PacsCardHolderPhoneEditDto',
            },
            isNullable: true,
        },
        emailList: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderEmails_PacsCardHolderEmailEditDto',
            },
            isNullable: true,
        },
        customList: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCustoms_PacsCardHolderCustomEditDto',
            },
            isNullable: true,
        },
        faceProfile: {
            type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsHolderFaceProfiles_PacsHolderFaceProfileEditDto',
        },
        cardList: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardDeviceAccessGroupIdListDto',
            },
            isNullable: true,
        },
        companyList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        deviceAccessScheduleGroupList: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDeviceAccessScheduleGroup_PacsCardHolderDeviceAccessScheduleGroupEditDto',
            },
            isNullable: true,
        },
        deviceList: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDevices_PacsCardHolderDeviceListDto',
            },
            isNullable: true,
        },
        deviceIdList: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
        deviceAccessGroupIds: {
            type: 'array',
            contains: {
                type: 'string',
                format: 'uuid',
            },
            isNullable: true,
        },
    },
} as const;
