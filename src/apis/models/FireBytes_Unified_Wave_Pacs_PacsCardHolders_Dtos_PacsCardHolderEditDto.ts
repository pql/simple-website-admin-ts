/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardDeviceAccessGroupIdListDto } from './FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardDeviceAccessGroupIdListDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCustoms_PacsCardHolderCustomEditDto } from './FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCustoms_PacsCardHolderCustomEditDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDeviceAccessScheduleGroup_PacsCardHolderDeviceAccessScheduleGroupEditDto } from './FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDeviceAccessScheduleGroup_PacsCardHolderDeviceAccessScheduleGroupEditDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDevices_PacsCardHolderDeviceListDto } from './FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDevices_PacsCardHolderDeviceListDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderEmails_PacsCardHolderEmailEditDto } from './FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderEmails_PacsCardHolderEmailEditDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderPhones_PacsCardHolderPhoneEditDto } from './FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderPhones_PacsCardHolderPhoneEditDto';
import type { FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsHolderFaceProfiles_PacsHolderFaceProfileEditDto } from './FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsHolderFaceProfiles_PacsHolderFaceProfileEditDto';
export type FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderEditDto = {
    id?: string | null;
    name?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    photo?: string | null;
    userType?: Array<string> | null;
    emailAddress?: string | null;
    dateOfBirth?: string | null;
    cardHolderNumber?: string | null;
    joinedDate?: string | null;
    department?: Array<string> | null;
    position?: Array<string> | null;
    mobileNo?: string | null;
    mobileld?: string | null;
    blacklisted?: boolean | null;
    gender?: string | null;
    mobileAccessEnabled?: boolean;
    statusId?: string | null;
    statusName?: string | null;
    faceProfileId?: string | null;
    pinNumber?: string | null;
    phoneList?: Array<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderPhones_PacsCardHolderPhoneEditDto> | null;
    emailList?: Array<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderEmails_PacsCardHolderEmailEditDto> | null;
    customList?: Array<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCustoms_PacsCardHolderCustomEditDto> | null;
    faceProfile?: FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsHolderFaceProfiles_PacsHolderFaceProfileEditDto;
    cardList?: Array<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderCards_PacsCardDeviceAccessGroupIdListDto> | null;
    companyList?: Array<string> | null;
    deviceAccessScheduleGroupList?: Array<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDeviceAccessScheduleGroup_PacsCardHolderDeviceAccessScheduleGroupEditDto> | null;
    deviceList?: Array<FireBytes_Unified_Wave_Pacs_PacsCardHolders_Dtos_PacsCardHolderDevices_PacsCardHolderDeviceListDto> | null;
    deviceIdList?: Array<string> | null;
    deviceAccessGroupIds?: Array<string> | null;
};

