import { Entity } from './Entity';

class TestEntity extends Entity {}

test('that entity has id', () => {
  const entity = new TestEntity();
  expect(entity.id.length).toBeGreaterThan(0);
});

test('that entities with identical ids are considered equal', () => {
  const entityA = new TestEntity();
  const entityB = entityA;
  expect(entityA.equals(entityB)).toBe(true);
});

test('that entities with different ids are considered not equal', () => {
  const entityA = new TestEntity();
  const entityB = new TestEntity();
  expect(entityA.equals(entityB)).toBe(false);
});
