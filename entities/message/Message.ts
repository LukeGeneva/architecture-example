import { Entity } from '../Entity';
import { InvalidArgumentError } from '../InvalidArgumentError';

interface MessageHydrationData {
  id: string;
  text: string;
  likes: number;
}

export class Message extends Entity {
  private _text: string;
  private _likes: number;

  get text() {
    return this._text;
  }

  get likes() {
    return this._likes;
  }

  constructor(messageText: string) {
    super();

    if (!messageText.trim().length)
      throw new InvalidArgumentError('Message text cannot be empty.');

    this._text = messageText;
    this._likes = 0;
  }

  like = () => {
    this._likes += 1;
  };

  unlike = () => {
    if (this._likes > 0) this._likes -= 1;
  };

  static __hydrate = (data: MessageHydrationData) => {
    const message = new Message(data.text);
    message._id = data.id;
    message._likes = data.likes;
    return message;
  };
}
