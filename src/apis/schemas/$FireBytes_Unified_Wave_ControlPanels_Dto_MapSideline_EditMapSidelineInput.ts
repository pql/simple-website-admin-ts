/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineInput = {
    properties: {
        buildingMapId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        makers: {
            type: 'array',
            contains: {
                type: 'FireBytes_Unified_Wave_ControlPanels_Dto_MapSideline_EditMapSidelineDto',
            },
            isNullable: true,
        },
    },
} as const;
