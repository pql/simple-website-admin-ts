/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_GraphicPanels_Dtos_SetFloorPlanHideObjectIdInput = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        hideObjectIds: {
            type: 'array',
            contains: {
                type: 'string',
            },
            isNullable: true,
        },
    },
} as const;
