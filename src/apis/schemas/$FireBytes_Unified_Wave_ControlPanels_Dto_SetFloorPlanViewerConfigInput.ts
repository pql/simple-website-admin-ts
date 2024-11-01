/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanels_Dto_SetFloorPlanViewerConfigInput = {
    properties: {
        isThreeD: {
            type: 'boolean',
        },
        controlPanelId: {
            type: 'string',
            format: 'uuid',
        },
        graphicPanelId: {
            type: 'string',
            format: 'uuid',
        },
        viewerCameraConfig: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
