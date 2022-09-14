import { MessageBoard } from '../../entities/message-board/MessageBoard';
import { TestMessageBoardRepository } from './TestMessageBoardRepository';

let messageBoardRepository: TestMessageBoardRepository;

beforeEach(() => {
  messageBoardRepository = new TestMessageBoardRepository();
});

test('that message board can be saved', async () => {
  const board = new MessageBoard('Test');
  await messageBoardRepository.saveBoard(board);
  const foundBoard = await messageBoardRepository.findBoardById(board.id);
  expect(foundBoard.equals(board)).toBe(true);
});
