import * as app from '~/app';
import moment from 'moment';
import { getAverage } from '~/lib/helpers';

export default {
  user(obj, args, context) {
    const { user } = context;

    return user;
  },
  async dailyAverage(obj, args, context) {
    const { user } = context;
    
    if (!user) {
      throw Error('Log in is required.');
    }

    const { timeframe } = args;

    const startOfMonth = moment.parseZone(timeframe).startOf('month').format();
    const endOfMonth = moment.parseZone(timeframe).endOf('month').format();
    const res = [];

    const ansRef = await app.db
      .collection('answers')
      .where('userId', '==', user.id)
      .where('timestamp', '>=', startOfMonth)
      .where('timestamp', '<=', endOfMonth)
      .get();

    ansRef.forEach(snapshot => {
      const dailyAnswers = snapshot.data();

      res.push({
        timestamp: dailyAnswers.timestamp,
        value: getAverage(dailyAnswers.values)
      });
    });

    return res;
  },
  async activeQuestions(obj, args, context) {
    const { user } = context;
    
    if (!user) {
      throw Error('Log in is required.');
    }

    const { todayIs } = args;
    const startOfToday = moment.parseZone(todayIs).startOf('day').format();

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
      .where('timestamp', '>=', startOfToday)
      .get();

    quesRef.forEach(snapshot => {
      res.push(snapshot.data());
    });
    ansRef.forEach(snapshot => {
      const answers = snapshot.data().values;
      
      Object.keys(answers).map((qid) => {
        // Insert the answer value to res using questionId.
        const targetIndex = res.findIndex(item => item.id === qid);
        if (targetIndex > -1) {
          res.splice(targetIndex, 1, {
            ...res[targetIndex],
            answer: answers[qid]
          })
        }
      });
    });

    return res;
  },
}