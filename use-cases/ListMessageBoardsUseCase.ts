import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';

export interface ListMessageBoardsOutput {
  messageBoards: Array<ListMessageBoardsOutputMessageBoard>;
}

export interface ListMessageBoardsOutputMessageBoard {
  id: string;
  name: string;
}

export class ListMessageBoardsUseCase {
  constructor(private messageBoardRepository: MessageBoardRepository) {}

  execute = async (): Promise<ListMessageBoardsOutput> => {
    const messageBoards = await this.messageBoardRepository.findAllBoards();
    return {
      messageBoards: messageBoards.map((board) => ({
        id: board.id,
        name: board.name,
      })),
    };
  };
}
