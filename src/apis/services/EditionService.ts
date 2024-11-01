/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Payment_Plans_PlanDto } from '../models/Volo_Payment_Plans_PlanDto';
import type { Volo_Payment_Requests_PaymentRequestWithDetailsDto } from '../models/Volo_Payment_Requests_PaymentRequestWithDetailsDto';
import type { Volo_Saas_Host_Dtos_EditionCreateDto } from '../models/Volo_Saas_Host_Dtos_EditionCreateDto';
import type { Volo_Saas_Host_Dtos_EditionDto } from '../models/Volo_Saas_Host_Dtos_EditionDto';
import type { Volo_Saas_Host_Dtos_EditionDto_Volo_Saas_Host_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Saas_Host_Dtos_EditionDto_Volo_Saas_Host_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Saas_Host_Dtos_EditionUpdateDto } from '../models/Volo_Saas_Host_Dtos_EditionUpdateDto';
import type { Volo_Saas_Host_GetEditionUsageStatisticsResultDto } from '../models/Volo_Saas_Host_GetEditionUsageStatisticsResultDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EditionService {
    /**
     * @returns Volo_Saas_Host_Dtos_EditionDto Success
     * @throws ApiError
     */
    public static getApiSaasEditions({
        id,
    }: {
        id: string,
    }): CancelablePromise<Volo_Saas_Host_Dtos_EditionDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/editions/{id}',
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
     * @returns Volo_Saas_Host_Dtos_EditionDto Success
     * @throws ApiError
     */
    public static putApiSaasEditions({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: Volo_Saas_Host_Dtos_EditionUpdateDto,
    }): CancelablePromise<Volo_Saas_Host_Dtos_EditionDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/saas/editions/{id}',
            path: {
                'id': id,
            },
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
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiSaasEditions({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/saas/editions/{id}',
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
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Saas_Host_Dtos_EditionDto_Volo_Saas_Host_Application_Contracts_Version_8_3_0_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiSaasEditions1({
        filter,
        sorting,
        skipCount,
        maxResultCount,
    }: {
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    }): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/editions',
            query: {
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
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
     * @returns Volo_Saas_Host_Dtos_EditionDto Success
     * @throws ApiError
     */
    public static postApiSaasEditions({
        requestBody,
    }: {
        requestBody?: Volo_Saas_Host_Dtos_EditionCreateDto,
    }): CancelablePromise<Volo_Saas_Host_Dtos_EditionDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/saas/editions',
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
     * @returns any Success
     * @throws ApiError
     */
    public static putApiSaasEditionsMoveAllTenants({
        id,
        editionId,
    }: {
        id: string,
        editionId?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/saas/editions/{id}/move-all-tenants',
            path: {
                'id': id,
            },
            query: {
                'editionId': editionId,
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
     * @returns Volo_Saas_Host_Dtos_EditionDto Success
     * @throws ApiError
     */
    public static getApiSaasEditionsAll(): CancelablePromise<Array<Volo_Saas_Host_Dtos_EditionDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/editions/all',
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
     * @returns Volo_Saas_Host_GetEditionUsageStatisticsResultDto Success
     * @throws ApiError
     */
    public static getApiSaasEditionsStatisticsUsageStatistic(): CancelablePromise<Volo_Saas_Host_GetEditionUsageStatisticsResultDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/editions/statistics/usage-statistic',
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
     * @returns Volo_Payment_Plans_PlanDto Success
     * @throws ApiError
     */
    public static getApiSaasEditionsPlanLookup(): CancelablePromise<Array<Volo_Payment_Plans_PlanDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/saas/editions/plan-lookup',
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
     * @returns Volo_Payment_Requests_PaymentRequestWithDetailsDto Success
     * @throws ApiError
     */
    public static postApiSaasSubscription({
        editionId,
        tenantId,
    }: {
        editionId?: string,
        tenantId?: string,
    }): CancelablePromise<Volo_Payment_Requests_PaymentRequestWithDetailsDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/saas/subscription',
            query: {
                'editionId': editionId,
                'tenantId': tenantId,
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
}
