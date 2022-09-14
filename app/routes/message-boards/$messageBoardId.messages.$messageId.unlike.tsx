import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { unlikeMessage } from '../../compositiionRoot.server';

export const action: ActionFunction = async ({ params }) => {
  const messageBoardId = params.messageBoardId;
  const messageId = params.messageId;

  if (!messageBoardId) throw new Error('Expected message board ID.');
  if (!messageId) throw new Error('Expected message ID.');

  await unlikeMessage.execute({ messageId });
  return redirect(`/message-boards/${messageBoardId}`);
};
