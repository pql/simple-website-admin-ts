/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Chat_Messages_ChatMessageSide } from './Volo_Chat_Messages_ChatMessageSide';
export type Volo_Chat_Users_ChatContactDto = {
    userId?: string;
    name?: string | null;
    surname?: string | null;
    username?: string | null;
    hasChatPermission?: boolean;
    lastMessageSide?: Volo_Chat_Messages_ChatMessageSide;
    lastMessage?: string | null;
    lastMessageDate?: string | null;
    unreadMessageCount?: number;
};

