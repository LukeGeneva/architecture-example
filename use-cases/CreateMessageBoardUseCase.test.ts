import { CreateMessageBoardUseCase } from './CreateMessageBoardUseCase';
import { TestMessageBoardRepository } from './test/TestMessageBoardRepository';

let messageBoardRepository: TestMessageBoardRepository;
let createMessageBoard: CreateMessageBoardUseCase;

beforeEach(() => {
  messageBoardRepository = new TestMessageBoardRepository();
  createMessageBoard = new CreateMessageBoardUseCase(messageBoardRepository);
});

test('that board is created', async () => {
  const output = await createMessageBoard.execute({ messageBoardName: 'Test' });
  const messageBoard = await messageBoardRepository.findBoardById(
    output.messageBoardId
  );
  expect(messageBoard.name).toBe('Test');
});
