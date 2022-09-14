import type { Message } from '../message/Message';
import type { MessageBoard } from './MessageBoard';

export interface MessageBoardRepository {
  findAllBoards: () => Promise<Array<MessageBoard>>;
  findAllMessagesOnBoard: (boardId: string) => Promise<Array<Message>>;
  findBoardById: (boardId: string) => Promise<MessageBoard>;
  findMessageById: (messageId: string) => Promise<Message>;
  saveBoard: (messageBoard: MessageBoard) => Promise<void>;
  saveMessage: (message: Message) => Promise<void>;
}
