import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { likeMessage } from '../../composition-root';

export const action: ActionFunction = async ({ params }) => {
  const messageBoardId = params.messageBoardId;
  const messageId = params.messageId;

  if (!messageBoardId) throw new Error('Expected message board ID.');
  if (!messageId) throw new Error('Expected message ID.');

  await likeMessage.execute({ messageId });
  return redirect(`/message-boards/${messageBoardId}`);
};
