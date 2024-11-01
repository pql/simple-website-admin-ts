/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_Devices_Dtos_GraphicPanelDto = {
    properties: {
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
            format: 'uuid',
        },
        graphicPanelTypeId: {
            type: 'string',
            format: 'uuid',
        },
        graphicPanelType: {
            type: 'FireBytes_Unified_Wave_Devices_Dtos_GraphicPanelTypeDto',
        },
        tenantId: {
            type: 'string',
            isNullable: true,
        },
        hideObjectIds: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
