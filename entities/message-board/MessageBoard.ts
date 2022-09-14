import { Entity } from '../Entity';
import type { Message } from '../message/Message';

interface MessageBoardHydrationData {
  id: string;
  name: string;
  messages: Array<string>;
}

export class MessageBoard extends Entity {
  private _name: string;
  private _messages: Set<string>;

  get name() {
    return this._name;
  }

  get messages() {
    return Array.from(this._messages);
  }

  constructor(boardName: string) {
    super();
    this._name = boardName;
    this._messages = new Set<string>();
  }

  post = (message: Message) => {
    this._messages.add(message.id);
  };

  static __hydrate = (data: MessageBoardHydrationData) => {
    const messageBoard = new MessageBoard(data.name);
    messageBoard._id = data.id;
    messageBoard._messages = new Set(data.messages);
    return messageBoard;
  };
}
