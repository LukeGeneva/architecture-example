import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';

export interface DisplayMessageBoardInput {
  messageBoardId: string;
}

export interface DisplayMessageBoardOutput {
  boardId: string;
  boardName: string;
  messages: Array<DisplayMessageBoardOutputMessage>;
}

export interface DisplayMessageBoardOutputMessage {
  id: string;
  text: string;
  likes: number;
}

export class DisplayMessageBoardUseCase {
  constructor(private messageBoardRepository: MessageBoardRepository) {}

  execute = async (
    input: DisplayMessageBoardInput
  ): Promise<DisplayMessageBoardOutput> => {
    const board = await this.messageBoardRepository.findBoardById(
      input.messageBoardId
    );
    const messages = await this.messageBoardRepository.findAllMessagesOnBoard(
      input.messageBoardId
    );
    return {
      boardId: board.id,
      boardName: board.name,
      messages: messages.map((message) => ({
        id: message.id,
        text: message.text,
        likes: message.likes,
      })),
    };
  };
}
