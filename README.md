# Architecture Example

This repository contains a simple message board application which draws heavily from architectural concepts discussed in Robert Martin's _Clean Architecture_.

## What is this trying to accomplish?

The biggest goal with this approach is code readability and maintainability. We want to be able to know anything the system does at a glance and also provide a straightforward way for new developers to get up to speed on system basics.

This approach is far from perfect, but it aims to accomplish that.

## Where do I start?

The best place to start is in the `use-cases` directory. Think of use cases as vertical slices through all layers of a system. They contain a bit of UI, some system logic, and a bit of persistence.

Most importantly though, they tell us exactly what operations the system supports. If this is done correctly, you should be able to look at the `use-cases` directory here and be able to tell that this is some sort of message board application.

## Where is the database?

Maybe the biggest concept this example tries to explain is that the database is a detail. It really doesn't matter when it comes to application and domain logic. That's why you'll find that the application has been built around generic repositories.

For example, the `MessageBoardRepository` interface describes what a fully-functional message board repository should be able to do, but leaves the implementation up to a concrete class somewhere else. The use cases are none the wiser. All they know is that a message board repository contains a specific set of methods, and they are free to call those.

With that said, this example has a couple of concrete implementations in the `adapters` directory to consider.

One is the `JsonMessageBoardRepository`. This persists message board data as JSON to the local machine, which comes in pretty handy for development without a network connection, and is also a secondary goal of this architecture -- allowing completely local development. Even in today's highly-connected world, this has come in handy for me on numerous occasions and also facilitates testing.

The other implementation is the `PrismaMessageBoardRepository`, which allows for persistence in a Postgres database.

The important thing to note here is that we can swap out any implementation we want here. We're free to use an ORM, SQL, Mongo, Dyanamo, or even plain text files if we so choose. It frees us up to optimize data storage in isolation from the rest of the code.

In addition, it also frees us up to be extremely lazy (in a good way) as well. Notice that message board message IDs are stored in the Prisma repository as a simple string, which is created by JSON-stringifying the array of IDs. This is fast, easy, and can always be swapped out for an optimized foreign key relation sometime in the future if need be -- all without touching domain or application code.

## Where is the business logic?

Entities are where the business logic lives. See the `entities` directory in this example.

Entities should be able to be understood by the business -- even non-engineers. They use common business terms and contain the vital logic that the business operates on.

The use cases interact with and direct these entities in a digital fashion. You can think of entities as how the business operates, and you think of use cases as how the business interacts with these entities in a digital system.

Notice that the entities here are not the "entities" that objects returned from an ORM are typically referred to as. It's an unfortunate naming collision, and both camps are well-established at this point. If we are using an ORM, we want its "entities" to stay hidden behind the repositories, where they can stay our friends and not cause any harm.

## Why classes?

This is very much a choice. You can absolutely implement entities as pure data structures and functions that operate on them, but I like classes for two main reasons:

1. Readability
2. Encapsulation

I like the readability classes lend themselves to because, by using class methods, we can cut out some of the cruft of pure data operations. For example, in two separate apps, these snippets may accomplish the same thing:

```typescript
message.likes += 1;
```

```typescript
message.like();
```

These are both easy, but I would argue the second snippet does a better job of getting the point across. You know exactly what this line does. The first snippet is also an easy one-liner, but there is a bit of parsing the brain needs to do to understand the concept.

Encapsulation goes hand-in-hand with readability. The previous examples are trivial, but what about when a bit more logic is involved? Say we want make sure that likes don't become negative if the message is "unliked" while the likes are at `0`. That may look something like this:

```typescript
message.likes = message.likes > 0 ? message.likes - 1 : 0;
```

```typescript
message.unlike();
```

Yes, the logic does exist somewhere -- in this case, in the `unlike` method -- but there is a significant amount of parsing the brain must do in the first example to grok the concept.

Another benefit of encapsulation is the we can hide away the implementation details of a given class. For example, the `MessageBoard` entity contains a list of `Message` IDs representing the messages that are currently on that board. A `Set` works great for this information because it provides an easy way to ensure that the same message does not mistakenly appear twice on the same board. With a class, this `Set` is hidden away inside and message IDs are exposed to the outside world as a simple `Array`. The only way to interact with the `messages` list is via the `post` method, which enhances readability.

```typescript
messageBoard.post(message);
```

I will now get off the `class` soapbox.

## How does this all come together?

The composition root is the place where everything needed to run the app gets initialized. This can be found here in `app/compositionRoot.server.ts`.

The composition root is the dirtiest file in the repository. It's where we initialize the concrete implmentations of generic interfaces, usually based on configuration values, such as environment variables.

For example, in this app, a `STORAGE_METHOD` environment variable controls whether the application stores its data locally with JSON, or in a Postgres database via Prisma.

Once the correct repository is initialized, it is injected into anything that depends on it. In this case, that is the use cases; the instances of which are exported from the composition root to be used in the rest of the Remix app controlling the web interface.

## The web is also a detail

Speaking of the web, it's important to note that, like the database, it is also a detail. We could just as easily take these use cases and use them to create a command line application, or a desktop or mobile app.
