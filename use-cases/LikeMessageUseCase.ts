import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';

export interface LikeMessageInput {
  messageId: string;
}

export interface LikeMessageOutput {
  messageId: string;
  likes: number;
}

export class LikeMessageUseCase {
  constructor(private messageBoardRepository: MessageBoardRepository) {}

  execute = async (input: LikeMessageInput): Promise<LikeMessageOutput> => {
    const message = await this.messageBoardRepository.findMessageById(
      input.messageId
    );
    message.like();
    this.messageBoardRepository.saveMessage(message);
    return { messageId: message.id, likes: message.likes };
  };
}
