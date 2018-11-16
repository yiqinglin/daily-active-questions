import * as app from '~/app';

export default async function deleteQuestion(obj, args, context) {
  const { user } = context;
  const { qid } = args;

  if (!user) {
    throw Error('Log in is required.');
  }

  await app.db.collection('questions').doc(qid).set({active: -1}, {merge: true});

  return;
}