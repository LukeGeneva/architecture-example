import { MessageBoard } from '../entities/message-board/MessageBoard';
import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';

export interface CreateMessageBoardInput {
  messageBoardName: string;
}

export interface CreateMessageBoardOutput {
  messageBoardId: string;
}

export class CreateMessageBoardUseCase {
  constructor(private messageBoardRepository: MessageBoardRepository) {}

  execute = async (
    input: CreateMessageBoardInput
  ): Promise<CreateMessageBoardOutput> => {
    const messageBoard = new MessageBoard(input.messageBoardName);
    await this.messageBoardRepository.saveBoard(messageBoard);
    return { messageBoardId: messageBoard.id };
  };
}
