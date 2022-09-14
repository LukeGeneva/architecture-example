import { EntityNotFoundError } from '../../entities/EntityNotFoundError';
import type { MessageBoard } from '../../entities/message-board/MessageBoard';
import type { MessageBoardRepository } from '../../entities/message-board/MessageBoardRepository';
import type { Message } from '../../entities/message/Message';

export class TestMessageBoardRepository implements MessageBoardRepository {
  private _messageBoards: Map<string, MessageBoard>;
  private _messages: Map<string, Message>;

  constructor() {
    this._messageBoards = new Map<string, MessageBoard>();
    this._messages = new Map<string, Message>();
  }

  findAllBoards = async () => {
    return Array.from(this._messageBoards.values());
  };

  findAllMessagesOnBoard = async (boardId: string) => {
    const board = this._messageBoards.get(boardId);
    if (!board)
      throw new EntityNotFoundError(
        `No message board found with ID "${boardId}".`
      );

    const messages = [];
    for (let messageId of board.messages) {
      const message = this._messages.get(messageId);
      if (message) messages.push(message);
    }

    return messages;
  };

  findBoardById = async (boardId: string) => {
    const board = this._messageBoards.get(boardId);
    if (!board)
      throw new EntityNotFoundError(
        `No message board found with ID "${boardId}".`
      );
    return board;
  };

  findMessageById = async (messageId: string) => {
    const message = this._messages.get(messageId);
    if (!message)
      throw new EntityNotFoundError(`No message found with ID "${messageId}".`);
    return message;
  };

  saveBoard = async (messageBoard: MessageBoard) => {
    this._messageBoards.set(messageBoard.id, messageBoard);
  };

  saveMessage = async (message: Message) => {
    this._messages.set(message.id, message);
  };
}
