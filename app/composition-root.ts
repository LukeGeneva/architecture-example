import path from 'path';
import { JsonMessageBoardRepository } from '../adapters/JsonMessageBoardRepository';
import { CreateMessageBoardUseCase } from '../use-cases/CreateMessageBoardUseCase';
import { LikeMessageUseCase } from '../use-cases/LikeMessageUseCase';
import { DisplayMessageBoardUseCase } from '../use-cases/DisplayMessageBoardUseCase';
import { PostMessageToBoardUseCase } from '../use-cases/PostMessageToBoardUseCase';
import { UnlikeMessageUseCase } from '../use-cases/UnlikeMessageUseCase';
import { DATA_DIR, STORAGE_METHOD } from './env';
import { ListMessageBoardsUseCase } from '../use-cases/ListMessageBoardsUseCase';
import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';
import { PrismaMessageBoardRepository } from '../adapters/PrismaMessageBoardRepository';
import { PrismaClient } from '@prisma/client';

export let createMessageBoard: CreateMessageBoardUseCase;
export let displayMessageBoard: DisplayMessageBoardUseCase;
export let likeMessage: LikeMessageUseCase;
export let listMessageBoards: ListMessageBoardsUseCase;
export let postMessageToBoard: PostMessageToBoardUseCase;
export let unlikeMessage: UnlikeMessageUseCase;

let messageBoardRepository: MessageBoardRepository;

if (STORAGE_METHOD === 'prisma') {
  if (!globalThis.prisma) globalThis.prisma = new PrismaClient();
  messageBoardRepository = new PrismaMessageBoardRepository(globalThis.prisma);
} else {
  const messageBoardFile = path.join(DATA_DIR, 'message-boards.json');
  messageBoardRepository = new JsonMessageBoardRepository(messageBoardFile);
}

createMessageBoard = new CreateMessageBoardUseCase(messageBoardRepository);
displayMessageBoard = new DisplayMessageBoardUseCase(messageBoardRepository);
likeMessage = new LikeMessageUseCase(messageBoardRepository);
listMessageBoards = new ListMessageBoardsUseCase(messageBoardRepository);
postMessageToBoard = new PostMessageToBoardUseCase(messageBoardRepository);
unlikeMessage = new UnlikeMessageUseCase(messageBoardRepository);
