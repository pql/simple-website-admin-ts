/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_ControlePanelTreeLoadingDto = {
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
        parentTypeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        parentFloorId: {
            type: 'string',
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
        memberCount: {
            type: 'number',
            format: 'int32',
        },
        roleCount: {
            type: 'number',
            format: 'int32',
        },
        type: {
            type: 'string',
            isNullable: true,
        },
        childrenType: {
            type: 'string',
            isNullable: true,
        },
        typeIcon: {
            type: 'string',
            isNullable: true,
        },
        graphicType: {
            type: 'string',
            isNullable: true,
        },
        graphicPanel: {
            type: 'string',
            isNullable: true,
        },
        graphicPanelId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        graphicStoragePath: {
            type: 'string',
            isNullable: true,
        },
        modelId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        graphicUrl: {
            type: 'string',
            isNullable: true,
        },
        isAction: {
            type: 'boolean',
        },
        viewerCameraConfig: {
            type: 'string',
            isNullable: true,
        },
        twoDViewerCameraConfig: {
            type: 'string',
            isNullable: true,
        },
        deviceTypeRole: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
