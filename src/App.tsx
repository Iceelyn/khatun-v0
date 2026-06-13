import { useState } from 'react'
import Onboarding from './pages/Onboarding'
import Questionnaire, { type Answers } from './pages/Questionnaire'
import Result from './pages/Result'

const ONBOARDING_KEY = 'khatun_onboarded_v1'

type Stage = 'onboarding' | 'questionnaire' | 'result'

export default function App() {
  // Onboarding is shown only once (persisted in localStorage).
  const seenOnboarding = localStorage.getItem(ONBOARDING_KEY) === 'true'
  const [stage, setStage] = useState<Stage>(seenOnboarding ? 'questionnaire' : 'onboarding')
  const [answers, setAnswers] = useState<Answers | null>(null)

  function finishOnboarding() {
    localStorage.setItem(ONBOARDING_KEY, 'true')
    setStage('questionnaire')
  }

  function finishQuestionnaire(a: Answers) {
    setAnswers(a)
    setStage('result')
  }

  function restart() {
    setAnswers(null)
    setStage('questionnaire')
  }

  return (
    <div className="app-shell">
      {stage === 'onboarding' && <Onboarding onDone={finishOnboarding} />}
      {stage === 'questionnaire' && <Questionnaire onComplete={finishQuestionnaire} />}
      {stage === 'result' && answers && <Result answers={answers} onRestart={restart} />}
    </div>
  )
}
