import * as app from '~/app';

export default async function updateQuestion(obj ,args, context) {
  const { user } = context;
  const { question, qid } = args;

  if (!user) {
    throw Error('Log in is required.');
  }

  const quesRef = await app.db.collection('questions').doc(qid).get();
   // Check if user is updating the question created by him/herself.
  const isAuthorized = quesRef.data().userId === user.id;
 
  if (!isAuthorized) {
    throw Error('You are not authorized to update this question.')
  }

  await app.db.collection('questions').doc(qid).set({ title: question }, {merge: true});
  return;
}