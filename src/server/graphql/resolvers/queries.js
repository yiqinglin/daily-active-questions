import * as app from '~/app';
import moment from 'moment';
import { getAverage } from '~/lib/helpers';

export default {
  user(obj, args, context) {
    const { user } = context;

    return user;
  },
  async dailyDetails(obj, args, context) {
    const { user } = context;
    
    if (!user) {
      throw Error('Log in is required.');
    }

    const { month } = args;
    const parsedTime = moment.parseZone(month);

    const startOfMonth = parsedTime.startOf('month').format();
    const endOfMonth = parsedTime.endOf('month').format();
    // Generate a placeholder response with every day in the target month
    // and an empty question object.
    const res = [];
    let pointer = parsedTime.startOf('month');

    do {
      res.push({
        date: pointer.format(),
        questions: []
      });
      pointer = pointer.add(1, 'day')
    } while (pointer.isSame(startOfMonth, 'month'))

    // Get questions based on user id.
    const quesRef = await app.db
      .collection('questions')
      .where('userId', '==', user.id)
      .get();
    const questionDict = {};

    // Build a dictionary using question id as key and title as value.
    quesRef.forEach(snapshot => {
      const question = snapshot.data();
      questionDict[question.id] = question.title;
    })

    const ansRef = await app.db
      .collection('answers')
      .where('userId', '==', user.id)
      .where('timestamp', '>=', startOfMonth)
      .where('timestamp', '<=', endOfMonth)
      .get();

    ansRef.forEach(snapshot => {
      const dailyDetails = snapshot.data();
      const questions = [];

      Object.keys(dailyDetails.values).map(qId => 
        questions.push({
          question: questionDict[qId].toString(),
          value: dailyDetails.values[qId]
        }));

      res.splice(moment(dailyDetails.timestamp).date() - 1, 1, {
        date: dailyDetails.timestamp,
        questions
      })

      return res;
    });


    return res;
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