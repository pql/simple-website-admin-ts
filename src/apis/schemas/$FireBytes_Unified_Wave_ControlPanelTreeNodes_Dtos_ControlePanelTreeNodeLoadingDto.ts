/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingDto = {
    properties: {
        id: {
            type: 'string',
            format: 'uuid',
        },
        nodeId: {
            type: 'string',
            format: 'uuid',
        },
        parentNodeId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        nodeName: {
            type: 'string',
            isNullable: true,
        },
        icon: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        type: {
            type: 'string',
            isNullable: true,
        },
        bladeVisualId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        parentType: {
            type: 'string',
            isNullable: true,
        },
        parentIdList: {
            type: 'string',
            isNullable: true,
        },
        isAction: {
            type: 'boolean',
        },
        isLeaf: {
            type: 'boolean',
        },
        graphicType: {
            type: 'string',
            isNullable: true,
        },
        isHaveSlave: {
            type: 'boolean',
        },
        decompressingFilesId: {
            type: 'string',
            isNullable: true,
            format: 'uuid',
        },
        decompressingFilesName: {
            type: 'string',
            isNullable: true,
        },
    },
} as const;
