export type QueryAccount_Security_Logs_Dto = {
  tenantId: string | null;
  applicationName: string | null;
  identity: string | null;
  action: string | null;
  userId: string | null;
  userName: string | null;
  tenantName: string | null;
  clientId: string | null;
  correlationId: string | null;
  clientIpAddress: string | null;
  browserInfo: string | null;
  creationTime: string | null;
  extraProperties: string | null;
  id: string | null;
};

export type QueryAccount_Profile_Picture_Dto = {
  fileContent: string | null;
  source: string | null;
  type: number | null;
};

export type QueryAccount_Change_Password_Dto = {
  currentPassword: string;
  newPassword: string;
};

export type QueryAccount_MyProfile_Dto = {
  email: string | null;
  extraProperties: object | null;
  name: string | null;
  phoneNumber: string | number | null;
  surname: string | null;
  timezone: string | null;
  userName: string | null;
};

export type QueryDelegated_Users_Dto = {
  userName: string | null;
  startTime: string | null;
  endTime: string | null;
  id: string | null;
};

export type QueryMyDelegated_Users_Dto = {
  userName: string | null;
  startTime: string | null;
  endTime: string | null;
  id: string | null;
};

export type QueryAssociation_Account_Dto = {
  targetUserId: string | null;
  targetUserName: string | null;
  targetTenantId: string | null;
  argetTenantName: string | null;
  directlyLinked: boolean;
};

export type PostConnect_Token_Dto = {
  userId?: string | null;
  tenantId?: string | null;
  userName?: string | null;
  userDelegationId?: string | null;
  linkUserId?: string | null;
};
