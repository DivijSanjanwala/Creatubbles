import React, { useEffect, useState } from 'react'
import './globals.css'
import { fetchQuestionnaireData } from '@/lib/api'
import { QuestionType } from '@/interfaces/index'

export async function getServerSideProps() {
  const questionnaire = await fetchQuestionnaireData()
  return {
    props: {
      questionnaire,
    }
  }
}

const Home: React.FC = (props) => {

  // for testing
  const allQuestions: QuestionType[] = [
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/scs-interview.appspot.com/o/q1.png?alt=media&token=1e44f8f2-05ac-4902-9e4e-e66293d03d07",
      question: "What is Mister Daydream's day job?",
      options: [
        "He's unemployed",
        "Junior account manager",
        "Stock clerk",
        "Freelance hacker",
      ],
      answer: 2,
      time: 10,
    },
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/scs-interview.appspot.com/o/q2.png?alt=media&token=4655034e-3d8d-48ae-88e1-f0cc02028bdd",
      question: "Which character is not originally from Planet Hak Hak?",
      options: ["AL-X", "Kobra Lynn", "Boo Donna", "Noodle Snout"],
      answer: 3,
      time: 10,
    },
    {
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/scs-interview.appspot.com/o/q3.jpeg?alt=media&token=de77f493-4aaa-4261-b247-5743dde5b114",
      question: "What is the name of Dell & Spec's educational show?",
      options: [
        "How Do Dat?",
        "What Dat Do?",
        "Dis Do What?",
        "How Dat Work?",
      ],
      answer: 0,
      time: 10,
    },
  ]

  // console.log(props)

  return (
    <main className="flex relative min-h-screen min-w-screen items-center justify-center font-mono">
          <div className="flex flex-row absolute top-0 items-center justify-between w-full">
          </div>
      <div>
        <div className="flex flex-col items-center justify-between w-full">
            <h1 className="text-2xl font-bold">{allQuestions[0].question}</h1>
        </div>
      </div>
    </main>
  );
};

export default Home;