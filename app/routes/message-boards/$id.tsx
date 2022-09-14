import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { DisplayMessageBoardOutput } from '../../../use-cases/DisplayMessageBoardUseCase';
import { displayMessageBoard } from '../../compositiionRoot.server';

export const loader: LoaderFunction = async ({ params }) => {
  const messageBoardId = params.id;
  if (!messageBoardId) throw new Error('Expected message board ID.');

  const messageBoardOutput = await displayMessageBoard.execute({
    messageBoardId,
  });
  return messageBoardOutput;
};

export default function MessageBoardPage() {
  const messageBoardOutput = useLoaderData<DisplayMessageBoardOutput>();

  return (
    <div>
      <h1>{messageBoardOutput.boardName}</h1>
      <hr />
      {messageBoardOutput.messages.map((message) => (
        <div key={message.id}>
          <p>{message.text}</p>
          <div>
            Likes: {message.likes}
            <form
              action={`/message-boards/${messageBoardOutput.boardId}/messages/${message.id}/like`}
              method="post"
            >
              <button type="submit">+1</button>
            </form>
            <form
              action={`/message-boards/${messageBoardOutput.boardId}/messages/${message.id}/unlike`}
              method="post"
            >
              <button type="submit">-1</button>
            </form>
          </div>
        </div>
      ))}
      <form
        action={`/message-boards/${messageBoardOutput.boardId}/post`}
        method="post"
      >
        <input placeholder="Message" name="text" type="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
