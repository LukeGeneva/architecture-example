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
      <div className="flex flex-col gap-2">
        {messageBoardOutput.messages.map((message) => (
          <div key={message.id} className="card">
            <p className="mb-8">{message.text}</p>
            <div className="flex gap-2 items-center">
              <div>Likes: {message.likes}</div>
              <form
                action={`/message-boards/${messageBoardOutput.boardId}/messages/${message.id}/like`}
                method="post"
              >
                <button className="btn" type="submit">
                  +1
                </button>
              </form>
              <form
                action={`/message-boards/${messageBoardOutput.boardId}/messages/${message.id}/unlike`}
                method="post"
              >
                <button className="btn" type="submit">
                  -1
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
      <form
        className="mt-4"
        action={`/message-boards/${messageBoardOutput.boardId}/post`}
        method="post"
      >
        <input placeholder="Message" name="text" type="text" />
        <button className="btn" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
