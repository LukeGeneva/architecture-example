import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { createMessageBoard } from '../../composition-root';

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  if (typeof name !== 'string' || !name.length)
    throw new Error('Message board name is required.');

  const output = await createMessageBoard.execute({ messageBoardName: name });
  return redirect(`/message-boards/${output.messageBoardId}`);
};

export default function NewMessageBoard() {
  return (
    <>
      <h1>New Message Board</h1>
      <hr />
      <form method="post">
        <label>
          Message Board Name
          <input type="text" name="name" />
          <button type="submit">Create</button>
        </label>
      </form>
    </>
  );
}
