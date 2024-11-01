/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelListDto = {
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
        graphicName: {
            type: 'string',
            isNullable: true,
            maxLength: 256,
        },
        description: {
            type: 'string',
            isNullable: true,
        },
        graphicFile: {
            type: 'number',
            format: 'int32',
        },
        graphicUrl: {
            type: 'string',
            isNullable: true,
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
        graphicPanelTypeId: {
            type: 'string',
            format: 'uuid',
        },
        graphicPanelTypeName: {
            type: 'string',
            isNullable: true,
        },
        decompressingFileId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
    },
} as const;
