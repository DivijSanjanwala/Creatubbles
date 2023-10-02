import React, { useEffect, useState, useRef} from 'react'
import './globals.css'
import { fetchRequestAPI } from '@/lib/api'
import { Question } from '@/interfaces'
import QuestionComponent from '@/components/QuestionComponent'
import Welcome from '@/components/Welcome'
import QuizEnd from '@/components/QuizEnd'
import { GetServerSidePropsContext } from 'next'

export async function getServerSideProps(context: GetServerSidePropsContext): Promise<{ props: HomeProps }> {
  const questionnaire = await fetchRequestAPI();
  return {
    props: {
      questionnaire,
    },
  };
}

interface HomeProps {
  questionnaire: Question[];
}

const Home: React.FC<HomeProps> = ({ questionnaire }: HomeProps) => {

  const questionnaireLength = useRef(questionnaire.length);

  const [questionsQueue, setQuestionsQueue] = useState<Question[]>(questionnaire);

  const [quizStatus, setQuizStatus] = useState<boolean | null>(null);
  const [totalScore, setTotalScore] = useState<number>(0);

  // reset total score when quiz restarts
  useEffect(() => {
    if (quizStatus === true) {
      setTotalScore(0);
    }
  }, [quizStatus]);


  return (
    <main className="max-w-md mx-auto bg-white shadow-md overflow-hidden md:max-w-2xl font-mono">
      {quizStatus === null && (
        <Welcome setQuizStatus={setQuizStatus} />
      )}
      {quizStatus == true && (
        <QuestionComponent
          allQuestions={questionsQueue}
          totalQuestions={questionnaireLength}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          quizStatus={quizStatus}
          setQuizStatus={setQuizStatus}

        />
      )}
      {quizStatus == false && (
        <QuizEnd
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          setQuizStatus={setQuizStatus}
        />
      )
}
    </main>
  );
};

export default Home;