import * as app from '~/app';

export default {
  Query: {
    user(obj, args, context) {
      const { user } = context;

      return user;
    },
    async activeQuestions(obj, args, context) {
      const { user } = context;
      
      if (!user) {
        throw Error('Log in is required.');
      }

      // Get current date in millieseconds.      
      const nowTime = new Date();

      nowTime.setHours(0, 0, 0, 0);
      const todayBeginsAt = nowTime.getTime();
      const promises = [];
      const res = [];
      const questionIds = [];

      // Get active questions based on user id.
      const quesRef = await app.db
        .collection('questions')
        .where('userId', '==', user.id)
        .where('active', '>', 0)
        .get();
      
      // Get today's answers.
      const ansRef = await app.db
        .collection('answers')
        .where('userId', '==', user.id)
        .where('timestamp', '>=', todayBeginsAt)
        .get();

      quesRef.forEach(snapshot => {
        res.push(snapshot.data());
      });
      ansRef.forEach(snapshot => {
        const answers = snapshot.data().values;
        
        Object.keys(answers).map((qid) => {
          // Insert the answer value to res using questionId.
          const targetIndex = res.findIndex(item => item.id === qid);
          res.splice(targetIndex, 1, {
            ...res[targetIndex],
            answer: answers[qid]
          })
        });
      });

      return res;
    }
  },
  Mutation: {
    async login() {
      return {};
    },
    async answer(obj, args, context) {
      const { user } = context;
      const { answers, timestamp } = args;
      let values = {};
      
      if (!user) {
        throw Error('Log in is required.');
      }
      if (!answers || answers.length === 0) {
        throw Error('Required parameters not found.');
      }

      // Convert the answers array to key-value pairs.
      answers.map(answer => values[answer.questionId] = answer.value);

      await app.db.collection('answers')
        .add({
          timestamp,
          values,
          userId: user.id
        });

      return;
    }
  }
};
