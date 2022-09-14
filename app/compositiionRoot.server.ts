import path from 'path';
import { JsonMessageBoardRepository } from '../adapters/JsonMessageBoardRepository';
import { CreateMessageBoardUseCase } from '../use-cases/CreateMessageBoardUseCase';
import { LikeMessageUseCase } from '../use-cases/LikeMessageUseCase';
import { DisplayMessageBoardUseCase } from '../use-cases/DisplayMessageBoardUseCase';
import { PostMessageToBoardUseCase } from '../use-cases/PostMessageToBoardUseCase';
import { UnlikeMessageUseCase } from '../use-cases/UnlikeMessageUseCase';
import { DATA_DIR } from './env';
import { ListMessageBoardsUseCase } from '../use-cases/ListMessageBoardsUseCase';

export let createMessageBoard: CreateMessageBoardUseCase;
export let displayMessageBoard: DisplayMessageBoardUseCase;
export let likeMessage: LikeMessageUseCase;
export let listMessageBoards: ListMessageBoardsUseCase;
export let postMessageToBoard: PostMessageToBoardUseCase;
export let unlikeMessage: UnlikeMessageUseCase;

let messageBoardRepository = new JsonMessageBoardRepository(
  path.join(DATA_DIR, 'message-boards.json')
);

createMessageBoard = new CreateMessageBoardUseCase(messageBoardRepository);
displayMessageBoard = new DisplayMessageBoardUseCase(messageBoardRepository);
likeMessage = new LikeMessageUseCase(messageBoardRepository);
listMessageBoards = new ListMessageBoardsUseCase(messageBoardRepository);
postMessageToBoard = new PostMessageToBoardUseCase(messageBoardRepository);
unlikeMessage = new UnlikeMessageUseCase(messageBoardRepository);
