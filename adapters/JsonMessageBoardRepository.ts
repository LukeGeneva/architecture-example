import fs from 'fs';
import path from 'path';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';
import { MessageBoard } from '../entities/message-board/MessageBoard';
import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';
import { Message } from '../entities/message/Message';

interface FileJson {
  messageBoards: Record<string, RawMessageBoard>;
  messages: Record<string, RawMessage>;
}

interface RawMessageBoard {
  id: string;
  name: string;
  messages: Array<string>;
}

interface RawMessage {
  id: string;
  text: string;
  likes: number;
}

export class JsonMessageBoardRepository implements MessageBoardRepository {
  protected file: string;

  constructor(dataFilePath: string) {
    this.file = dataFilePath;
    const dirname = path.dirname(dataFilePath);
    if (!fs.existsSync(dirname)) {
      fs.mkdirSync(dirname, { recursive: true });
    }
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(
        this.file,
        JSON.stringify({ messageBoards: {}, messages: {} })
      );
    }
  }

  findAllBoards = async () => {
    const data = this.read();
    return Object.values(data.messageBoards).map(toMessageBoard);
  };

  findAllMessagesOnBoard = async (boardId: string) => {
    const data = this.read();
    const board = data.messageBoards[boardId];
    if (!board)
      throw new EntityNotFoundError(
        `No message board found with ID "${boardId}".`
      );
    const rawMessages = [];
    for (let messageId of board.messages) {
      const rawMessage = data.messages[messageId];
      if (rawMessage) rawMessages.push(rawMessage);
    }
    return rawMessages.map(toMessage);
  };

  findBoardById = async (boardId: string) => {
    const data = this.read();
    const rawBoard = data.messageBoards[boardId];
    if (!rawBoard)
      throw new EntityNotFoundError(
        `No message board found with ID "${boardId}".`
      );
    return toMessageBoard(rawBoard);
  };

  findMessageById = async (messageId: string) => {
    const data = this.read();
    const rawMessage = data.messages[messageId];
    if (!rawMessage)
      throw new EntityNotFoundError(`No message found with ID "${messageId}".`);
    return toMessage(rawMessage);
  };

  saveBoard = async (messageBoard: MessageBoard) => {
    const data = this.read();
    data.messageBoards[messageBoard.id] = toRawMessageBoard(messageBoard);
    this.write(data);
  };

  saveMessage = async (message: Message) => {
    const data = this.read();
    data.messages[message.id] = toRawMessage(message);
    this.write(data);
  };

  private read = (): FileJson => {
    return JSON.parse(fs.readFileSync(this.file).toString());
  };

  private write = (data: FileJson) => {
    fs.writeFileSync(this.file, JSON.stringify(data));
  };
}

const toMessageBoard = (raw: RawMessageBoard) => {
  return MessageBoard.__hydrate({
    id: raw.id,
    name: raw.name,
    messages: raw.messages,
  });
};

const toRawMessageBoard = (messageBoard: MessageBoard) => ({
  id: messageBoard.id,
  name: messageBoard.name,
  messages: messageBoard.messages,
});

const toMessage = (raw: RawMessage) => {
  return Message.__hydrate({ id: raw.id, text: raw.text, likes: raw.likes });
};

const toRawMessage = (message: Message) => ({
  id: message.id,
  text: message.text,
  likes: message.likes,
});
