import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';
import { Message } from '../entities/message/Message';

export interface PostMessageToBoardInput {
  messageBoardId: string;
  messageText: string;
}

export interface PostMessageToBoardOutput {
  messageId: string;
}

export class PostMessageToBoardUseCase {
  constructor(private messageBoardRepository: MessageBoardRepository) {}

  execute = async (
    input: PostMessageToBoardInput
  ): Promise<PostMessageToBoardOutput> => {
    const board = await this.messageBoardRepository.findBoardById(
      input.messageBoardId
    );
    const message = new Message(input.messageText);
    board.post(message);
    await this.messageBoardRepository.saveMessage(message);
    await this.messageBoardRepository.saveBoard(board);
    return { messageId: message.id };
  };
}
