import type {
  MessageBoard as RawMessageBoard,
  Message as RawMessage,
  PrismaClient,
} from '@prisma/client';
import { EntityNotFoundError } from '../entities/EntityNotFoundError';
import { MessageBoard } from '../entities/message-board/MessageBoard';
import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';
import { Message } from '../entities/message/Message';

export class PrismaMessageBoardRepository implements MessageBoardRepository {
  constructor(private prisma: PrismaClient) {}

  findAllBoards = async () => {
    const rawBoards = await this.prisma.messageBoard.findMany({});
    return rawBoards.map(toMessageBoard);
  };

  findAllMessagesOnBoard = async (boardId: string) => {
    const rawBoard = await this.prisma.messageBoard.findUnique({
      where: { id: boardId },
    });
    if (!rawBoard)
      throw new EntityNotFoundError(
        `No message board found with ID "${boardId}".`
      );
    const rawMessageIds = JSON.parse(rawBoard.messages);
    const rawMessages = await this.prisma.message.findMany({
      where: { id: { in: rawMessageIds } },
    });
    return rawMessages.map(toMessage);
  };

  findBoardById = async (boardId: string) => {
    const rawBoard = await this.prisma.messageBoard.findUnique({
      where: { id: boardId },
    });
    if (!rawBoard)
      throw new EntityNotFoundError(
        `No message board found with ID "${boardId}".`
      );
    return toMessageBoard(rawBoard);
  };

  findMessageById = async (messageId: string) => {
    const rawMessage = await this.prisma.message.findUnique({
      where: { id: messageId },
    });
    if (!rawMessage)
      throw new EntityNotFoundError(`No message found with ID "${messageId}".`);
    return toMessage(rawMessage);
  };

  saveBoard = async (messageBoard: MessageBoard) => {
    await this.prisma.messageBoard.upsert({
      create: {
        id: messageBoard.id,
        name: messageBoard.name,
        messages: JSON.stringify(messageBoard.messages),
      },
      update: {
        name: messageBoard.name,
        messages: JSON.stringify(messageBoard.messages),
      },
      where: { id: messageBoard.id },
    });
  };

  saveMessage = async (message: Message) => {
    await this.prisma.message.upsert({
      create: {
        id: message.id,
        text: message.text,
        likes: message.likes,
      },
      update: {
        text: message.text,
        likes: message.likes,
      },
      where: {
        id: message.id,
      },
    });
  };
}

const toMessageBoard = (rawMessageBoard: RawMessageBoard) => {
  return MessageBoard.__hydrate({
    id: rawMessageBoard.id,
    name: rawMessageBoard.name,
    messages: JSON.parse(rawMessageBoard.messages),
  });
};

const toMessage = (rawMessage: RawMessage) => {
  return Message.__hydrate({
    id: rawMessage.id,
    text: rawMessage.text,
    likes: rawMessage.likes,
  });
};
