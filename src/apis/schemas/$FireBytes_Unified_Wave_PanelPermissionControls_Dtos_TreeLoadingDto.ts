/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_PanelPermissionControls_Dtos_TreeLoadingDto = {
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
        parentId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        code: {
            type: 'string',
            isNullable: true,
        },
        displayName: {
            type: 'string',
            isNullable: true,
        },
        type: {
            type: 'string',
            isNullable: true,
        },
        childrenType: {
            type: 'string',
            isNullable: true,
        },
        parentIdList: {
            type: 'string',
            isNullable: true,
        },
        nodeId: {
            type: 'string',
            format: 'uuid',
        },
        isLeaf: {
            type: 'boolean',
        },
    },
} as const;
