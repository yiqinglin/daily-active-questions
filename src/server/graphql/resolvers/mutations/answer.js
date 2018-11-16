import * as app from '~/app';

export default async function answer(obj, args, context) {
  const { user } = context;
  const { answers } = args;

  // Get current date in millieseconds.      
  const timestamp = new Date().getTime();

  if (!user) {
    throw Error('Log in is required.');
  }
  if (!answers) {
    throw Error('Required parameters not found.');
  }

  await app.db.collection('answers')
    .add({
      timestamp,
      values: answers,
      userId: user.id
    });

  return;
}