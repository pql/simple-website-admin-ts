/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Mobile_Pacs_Dtos_CustomFields } from './FireBytes_Unified_Wave_Mobile_Pacs_Dtos_CustomFields';
export type FireBytes_Unified_Wave_Mobile_Pacs_Dtos_GetPacsUserInfoDto = {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    photo?: string | null;
    cardHolderNumber?: string | null;
    department?: string | null;
    position?: string | null;
    dateOfBirth?: string | null;
    emailAddress?: string | null;
    isQRCode?: boolean;
    userType?: string | null;
    mobileLoginID?: string | null;
    customFields?: Array<FireBytes_Unified_Wave_Mobile_Pacs_Dtos_CustomFields> | null;
    joinedDate?: string | null;
    status?: string | null;
    blacklisted?: boolean;
};

