import { Message } from '../message/Message';
import { MessageBoard } from './MessageBoard';

test('that message can be posted to the board', () => {
  const board = new MessageBoard('Test');
  const message = new Message('Add me to the board');
  board.post(message);
  expect(board.messages).toEqual([message.id]);
});

test('that posting messages is idempotent', () => {
  const board = new MessageBoard('Test');
  const message = new Message('Post me twice');
  board.post(message);
  board.post(message);
  expect(board.messages).toEqual([message.id]);
});

test('that message board can be hydrated', () => {
  const board = MessageBoard.__hydrate({
    id: 'a',
    name: 'Test',
    messages: ['x', 'y'],
  });
  expect(board.id).toEqual('a');
  expect(board.name).toEqual('Test');
  expect(board.messages).toEqual(['x', 'y']);
});
