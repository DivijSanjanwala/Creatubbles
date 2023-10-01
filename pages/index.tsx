import React, { useEffect, useState } from 'react'
import './globals.css'
import { fetchQuestionnaireData } from '@/lib/api'
import { Question } from '@/interfaces'
import QuestionComponent from '@/components/QuestionComponent'
import { GetServerSidePropsContext } from 'next'

// export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: HomeProps }> {
//   const questionnaire = await fetchQuestionnaireData();
//   return {
//     props: {
//       questionnaire,
//     },
//   };
// }

interface HomeProps {
  questionnaire: Question[];
}

const Home: React.FC<HomeProps> = ({  }: HomeProps) => {

  const questionnaire: Question[] = [
      {
        id: "1",
        data: {
        "imageUrl":"https://firebasestorage.googleapis.com/v0/b/scs-interview.appspot.com/o/q1.png?alt=media&token=1e44f8f2-05ac-4902-9e4e-e66293d03d07","question":"What is Mister Daydream's day job?","options":["He's unemployed","Junior account manager","Stock clerk","Freelance hacker"],"answer":2,"time":10}
        },
      {
        id: "2",
        data: {
          "imageUrl":"https://firebasestorage.googleapis.com/v0/b/scs-interview.appspot.com/o/q2.png?alt=media&token=4655034e-3d8d-48ae-88e1-f0cc02028bdd","question":"Which character is not originally from Planet Hak Hak?","options":["AL-X","Kobra Lynn","Boo Donna","Noodle Snout"],"answer":3,"time":10}
      },
      {
        id: "3",
        data: {"imageUrl":"https://firebasestorage.googleapis.com/v0/b/scs-interview.appspot.com/o/q3.jpeg?alt=media&token=de77f493-4aaa-4261-b247-5743dde5b114","question":"What is the name of Dell & Spec's educational show?","options":["How Do Dat?","What Dat Do?","Dis Do What?","How Dat Work?"],"answer":0,"time":10}
    }
  ]

  const [quizStatus, setQuizStatus] = useState<boolean>(false);

  return (
    <main className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl font-mono">
        {
          quizStatus ? (
            <QuestionComponent allQuestions={questionnaire} totalQuestions={questionnaire.length} endQuizCallback={() => setQuizStatus(false)} />
          ) :

          (
            <button onClick={() => setQuizStatus(true)}>
              <span className="text-lg text-black font-semibold">
                Start Quiz
              </span>
              </button>
          )
        }
    </main>
  );
};

export default Home;