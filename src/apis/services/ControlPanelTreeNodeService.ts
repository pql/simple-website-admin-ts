/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeAllTypeLoadingDto } from '../models/FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeAllTypeLoadingDto';
import type { FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeAllTypeLoadingRequest } from '../models/FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeAllTypeLoadingRequest';
import type { FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingDto } from '../models/FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingDto';
import type { FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingRequest } from '../models/FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingRequest';
import type { FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ShowTablePanelInfoDto } from '../models/FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ShowTablePanelInfoDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ControlPanelTreeNodeService {
    /**
     * @returns FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeAllTypeLoadingDto Success
     * @throws ApiError
     */
    public static postApiAppControlPanelTreeNodeControlePanelTreeNodeAllTypeLoading({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeAllTypeLoadingRequest,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeAllTypeLoadingDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel-tree-node/controle-panel-tree-node-all-type-loading',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingDto Success
     * @throws ApiError
     */
    public static postApiAppControlPanelTreeNodeControlePanelTreeNodeLoading({
        requestBody,
    }: {
        requestBody?: FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingRequest,
    }): CancelablePromise<Array<FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ControlePanelTreeNodeLoadingDto>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel-tree-node/controle-panel-tree-node-loading',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns boolean Success
     * @throws ApiError
     */
    public static deleteApiAppControlPanelTreeNodeTreeNode({
        id,
    }: {
        id: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/app/control-panel-tree-node/{id}/tree-node',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ShowTablePanelInfoDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelTreeNodeShowTablePanelInfo({
        nodeId,
        type,
    }: {
        nodeId?: string,
        type?: string,
    }): CancelablePromise<FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ShowTablePanelInfoDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel-tree-node/show-table-panel-info',
            query: {
                'NodeId': nodeId,
                'Type': type,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppControlPanelTreeNodeNodeDataSynchronous({
        hierarchy,
    }: {
        hierarchy?: number,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/control-panel-tree-node/node-data-synchronous',
            query: {
                'hierarchy': hierarchy,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @returns FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ShowTablePanelInfoDto Success
     * @throws ApiError
     */
    public static getApiAppControlPanelTreeNodeShowDefaultImagePanelInfo(): CancelablePromise<FireBytes_Unified_Wave_ControlPanelTreeNodes_Dtos_ShowTablePanelInfoDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/control-panel-tree-node/show-default-image-panel-info',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
}
