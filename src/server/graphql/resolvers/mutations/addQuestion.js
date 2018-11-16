import * as app from '~/app';

export default async function addQuestion(obj, args, context) {
  const { user } = context;
  const { question } = args;

  if (!user) {
    throw Error('Log in is required.');
  }

  // Get the doc ref first to save the auto-ID generated by Firestore in the document.
  const docRef = await app.db.collection('questions').doc();
  await docRef.set({
      active: 1, // TODO: update this to ranking
      title: question,
      userId: user.id,
      id: docRef.id
    });

  return;
}