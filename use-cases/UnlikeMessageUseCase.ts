import type { MessageBoardRepository } from '../entities/message-board/MessageBoardRepository';

export interface UnlikeMessageInput {
  messageId: string;
}

export interface UnlikeMessageOutput {
  messageId: string;
  likes: number;
}

export class UnlikeMessageUseCase {
  constructor(private messageBoardRepository: MessageBoardRepository) {}

  execute = async (input: UnlikeMessageInput): Promise<UnlikeMessageOutput> => {
    const message = await this.messageBoardRepository.findMessageById(
      input.messageId
    );
    message.unlike();
    await this.messageBoardRepository.saveMessage(message);
    return { messageId: message.id, likes: message.likes };
  };
}
