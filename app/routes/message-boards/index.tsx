import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { ListMessageBoardsOutput } from '../../../use-cases/ListMessageBoardsUseCase';
import { listMessageBoards } from '../../composition-root';

export const loader: LoaderFunction = async () => {
  const listMessageBoardsOutput = await listMessageBoards.execute();
  return listMessageBoardsOutput;
};

export default function MessageBoardsIndex() {
  const messageBoardOutput = useLoaderData<ListMessageBoardsOutput>();

  return (
    <div>
      <h1>Message Boards</h1>
      <hr />
      {messageBoardOutput.messageBoards.map((messageBoard) => (
        <li className="list-none py-2" key={messageBoard.id}>
          <a
            className="hover:text-blue-500"
            href={`/message-boards/${messageBoard.id}`}
          >
            {messageBoard.name}
          </a>
        </li>
      ))}
      <a className="btn" href="/message-boards/new">
        New Message Board
      </a>
    </div>
  );
}
