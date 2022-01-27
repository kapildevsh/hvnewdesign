export interface ChatMessage {
  id: number;
  ownerId: number;
  msg: string;
  date: number;
}

export interface ChatUser {
  id: number;
  name: string;
  active: boolean;
  avatar: string;
  newMsgCount: number;
  lastChat: ChatMessage;
}
