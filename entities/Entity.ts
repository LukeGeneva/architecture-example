import { v4 as uuid } from 'uuid';

export abstract class Entity {
  protected _id: string;

  get id() {
    return this._id;
  }

  constructor() {
    this._id = uuid();
  }

  equals(otherEntity: Entity) {
    return this.id === otherEntity.id;
  }
}
