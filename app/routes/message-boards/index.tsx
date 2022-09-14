import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { ListMessageBoardsOutput } from '../../../use-cases/ListMessageBoardsUseCase';
import { listMessageBoards } from '../../compositiionRoot.server';

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
        <li key={messageBoard.id}>
          <a href={`/message-boards/${messageBoard.id}`}>{messageBoard.name}</a>
        </li>
      ))}
      <a href="/message-boards/new">New Message Board</a>
    </div>
  );
}
