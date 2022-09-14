import { InvalidArgumentError } from '../InvalidArgumentError';
import { Message } from './Message';

test('that message can be liked', () => {
  const message = new Message('Hello World');
  message.like();
  expect(message.likes).toBe(1);
});

test('that a message with no text throws', () => {
  expect(() => new Message('')).toThrow(InvalidArgumentError);
});

test('that message can be unliked', () => {
  const message = new Message('Test');
  message.like();
  message.unlike();
  expect(message.likes).toBe(0);
});

test('that message can be hydrated', () => {
  const message = Message.__hydrate({
    id: 'a',
    text: 'Test',
    likes: 5,
  });
  expect(message.id).toEqual('a');
  expect(message.text).toEqual('Test');
  expect(message.likes).toEqual(5);
});

test('that unliking a message with 0 likes does not result in negative likes', () => {
  const message = new Message('Test');
  message.unlike();
  expect(message.likes).toBe(0);
});
