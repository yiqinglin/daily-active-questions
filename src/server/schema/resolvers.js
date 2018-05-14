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

      const quesRef = await app.db
        .collection('questions')
        .where('userId', '==', user.id)
        .where('active', '>', 0)
        .get();

      quesRef.forEach(snapshot => {
        const answerRef = app.db
          .collection('answers')
          .where('userId', '==', user.id)
          .where('questionId', '==', snapshot.id)
          .where('timestamp', '>=', todayBeginsAt);

        promises.push(answerRef.get());
        res.push(snapshot.data())
      });

      const results = await Promise.all(promises);
      results.forEach(querySnapshot => {
        querySnapshot.forEach(doc => {
          const answer = doc.data();
          const index = res.findIndex(q => q.id === answer.questionId);

          res.splice(index, 1, {
            ...res[index],
            answer: answer.value
          });
        });
      })

      return res;
    }
  },
  Mutation: {
    async login() {
      return {};
    }
  }
};
