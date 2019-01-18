# Reflekt - Daily Questions that Make a Difference
<img src="/public/img/logo.png" width="200" alt="Reflekt Logo" />


## About Reflekt
Inspired by the active questions process introduced by [Marshall Goldsmith](http://www.marshallgoldsmith.com), Reflekt allows users to set up goals and keep track of the efforts they put into achieving them.

The app is based on Goldsmith's simple concept of "active questions", which always start with "Did I do my best to...?". When reviewing and answersing the question set on a daily basis, users reflect on their efforts towards the goals and are reminded of their commitments.

Using Reflekt, users can enter questions and record their efforts on a 0-10 scale and see visualization of historical data.

To learn more about the idea and the benefits of the process, you can have a read of Goldsmith's book [*Triggers*](https://www.amazon.com/Triggers-Creating-Behavior-Lasts-Becoming-Person-ebook/dp/B00N6PEN0Y/ref=sr_1_1?ie=UTF8&qid=1547797184&sr=8-1&keywords=trigger+goldsmith). He also has a short [essay](http://www.marshallgoldsmith.com/articles/questions-that-make-a-difference-the-daily-question-process/) that serves as a great introduction to the concepts. 


## Getting Started
### To set up

```
npm install
```

### To run app

**NOTE:**  make sure you are running node 7 or later.

#### Terminal #1:

```
docker-compose up - d
make serve
```

#### Terminal #2:
```
npm run dev
```

### Environment Variables

#### Firebase Database

The app uses [Firebase Cloud Firestore](https://firebase.google.com/docs/firestore/). Follow the instructions of [https://firebase.google.com/docs/admin/setup](https://firebase.google.com/docs/admin/setup) and the JSON file with your service account credentials in the root directory.

#### Google Auth

The app uses Google Auth for user signups and logins. Follow the steps here [https://developers.google.com/identity/sign-in/web/sign-in](https://developers.google.com/identity/sign-in/web/sign-in) to set up. Save `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in a `.env` file in the root directory.


