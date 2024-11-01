/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_GraphicPanels_Dtos_GraphicPanelEditDto = {
    properties: {
        id: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
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
            isNullable: true,
            format: 'int32',
        },
        graphicUrl: {
            type: 'string',
            isNullable: true,
        },
        graphicUrlPath: {
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
            isNullable: true,
            format: 'uuid',
        },
        graphicPanelTypeName: {
            type: 'string',
            isNullable: true,
        },
        visualConfigJson: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
