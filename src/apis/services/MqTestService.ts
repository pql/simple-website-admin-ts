/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MqTestService {
    /**
     * @returns boolean Success
     * @throws ApiError
     */
    public static postApiAppMqTestSendTest1(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/send-test1',
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
    public static postApiAppMqTestSendTest2(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/send-test2',
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
    public static postApiAppMqTestSendTest3(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/send-test3',
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
    public static postApiAppMqTestSendTest4(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/send-test4',
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
    public static postApiAppMqTestSendTest5(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/send-test5',
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
     * @returns string Success
     * @throws ApiError
     */
    public static getApiAppMqTestGetDownCode({
        type,
    }: {
        type?: number,
    }): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/app/mq-test/get-down-code',
            query: {
                'type': type,
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
    public static postApiAppMqTestPublishPerson({
        deviceVendorSystemId,
        deviceid,
    }: {
        deviceVendorSystemId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_person/{deviceVendorSystemId}',
            path: {
                'deviceVendorSystemId': deviceVendorSystemId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubPerson({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_person',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsWeekschedule({
        deviceVendorSystemId,
        deviceid,
    }: {
        deviceVendorSystemId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_weekschedule/{deviceVendorSystemId}',
            path: {
                'deviceVendorSystemId': deviceVendorSystemId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubPacsWeekschedule({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_pacs_weekschedule',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsHolidayschedule({
        deviceVendorSystemId,
        deviceid,
    }: {
        deviceVendorSystemId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_holidayschedule/{deviceVendorSystemId}',
            path: {
                'deviceVendorSystemId': deviceVendorSystemId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubPacsHolidayschedule({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_pacs_holidayschedule',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsPacscardholder({
        deviceVendorSystemId,
        deviceid,
    }: {
        deviceVendorSystemId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_pacscardholder/{deviceVendorSystemId}',
            path: {
                'deviceVendorSystemId': deviceVendorSystemId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubPacsPacscardholder({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_pacs_pacscardholder',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsPlanschedule({
        deviceVendorSystemId,
        deviceid,
    }: {
        deviceVendorSystemId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_planschedule/{deviceVendorSystemId}',
            path: {
                'deviceVendorSystemId': deviceVendorSystemId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubPacsPlanschedule({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_pacs_planschedule',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsExecutionplan({
        deviceVendorSystemId,
        deviceid,
    }: {
        deviceVendorSystemId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_executionplan/{deviceVendorSystemId}',
            path: {
                'deviceVendorSystemId': deviceVendorSystemId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubPacsExecutionplan({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_pacs_executionplan',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsDownloadapply({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_downloadapply',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubPacsDownloadapply({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_pacs_downloadapply',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsDownloadexecute({
        deviceVendorSystemId,
        deviceid,
    }: {
        deviceVendorSystemId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_downloadexecute/{deviceVendorSystemId}',
            path: {
                'deviceVendorSystemId': deviceVendorSystemId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsDownloadexecuteResponse({
        messageId,
        deviceid,
    }: {
        messageId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_downloadexecute_response/{messageId}',
            path: {
                'messageId': messageId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubPacsDownloadexecuteResponse({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_pacs_downloadexecute_response',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPubDeviceHeartbeat({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/pub_Device-heartbeat',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubDeviceHeartbeat(): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_Device-heartbeat',
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
    public static postApiAppMqTestPubDevice({
        deviceVendorSystemId,
        deviceid,
    }: {
        deviceVendorSystemId: string,
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/pub_Device/{deviceVendorSystemId}',
            path: {
                'deviceVendorSystemId': deviceVendorSystemId,
            },
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubDevice({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_Device',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPubDeviceCmd({
        deviceId,
        deviceTypeFunctionId,
    }: {
        deviceId?: string,
        deviceTypeFunctionId?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/pub_Device-cmd',
            query: {
                'deviceId': deviceId,
                'DeviceTypeFunctionId': deviceTypeFunctionId,
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
    public static postApiAppMqTestSubDeviceCmd({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_Device-cmd',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubDeviceCmdResponse({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub-device-cmd-response',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPubClientReport({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/pub-client-report',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestSubClientReport({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub-client-report',
            query: {
                'deviceid': deviceid,
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
    public static postApiAppMqTestPublishPacsResponse({
        messageId,
        deviceid,
        type,
    }: {
        messageId: string,
        deviceid?: string,
        type?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_response/{messageId}',
            path: {
                'messageId': messageId,
            },
            query: {
                'deviceid': deviceid,
                'type': type,
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
    public static postApiAppMqTestSubPacsResponse({
        deviceid,
        type,
    }: {
        deviceid?: string,
        type?: string,
    }): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_pacs_response',
            query: {
                'deviceid': deviceid,
                'type': type,
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
     * @returns any Success
     * @throws ApiError
     */
    public static postApiAppMqTestPublishPacsResponseCmd({
        deviceid,
    }: {
        deviceid?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/publish_pacs_response_cmd',
            query: {
                'deviceid': deviceid,
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
     * @returns string Success
     * @throws ApiError
     */
    public static postApiAppMqTestSubPassportKioskMessagePanelResponse(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/app/mq-test/sub_passport_kiosk_message_panel_response',
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
