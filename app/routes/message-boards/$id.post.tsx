import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { postMessageToBoard } from '../../compositiionRoot.server';

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const messageBoardId = params.id;
  const text = formData.get('text');

  if (!messageBoardId) throw new Error('Expected message board id.');
  if (typeof text !== 'string' || !text.length)
    throw new Error('Message text is required.');

  await postMessageToBoard.execute({ messageBoardId, messageText: text });
  return redirect(`/message-boards/${messageBoardId}`);
};
