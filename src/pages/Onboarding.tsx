import { useState } from 'react'
import Button from '../components/Button'
import PageDots from '../components/PageDots'
import IllustrationStage from '../components/IllustrationStage'
import WomanPhone from '../assets/WomanPhone'
import WomanStep from '../assets/WomanStep'
import WomanRobot from '../assets/WomanRobot'
import type { ReactNode } from 'react'

type Slide = {
  illustration: ReactNode
  headline: string
  subtext?: string
}

const slides: Slide[] = [
  {
    illustration: <WomanPhone />,
    headline: 'Чиний хэлээр, шүүлтгүй',
  },
  {
    illustration: <WomanStep />,
    headline: 'Эхний бодит алхам — хэдхэн минутад',
  },
  {
    illustration: <WomanRobot />,
    headline: 'Khatun — чиний хажууд алхах AI хамтрагч',
    subtext: 'Нэг алхам урагшил',
  },
]

export default function Onboarding({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0)
  const isLast = index === slides.length - 1
  const slide = slides[index]

  function next() {
    if (isLast) onDone()
    else setIndex((i) => i + 1)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      {/* top bar: wordmark + skip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '18px 20px',
        }}
      >
        <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: 0.5, color: '#6F61E8' }}>
          Khatun
        </span>
        <button
          onClick={onDone}
          style={{
            position: 'absolute',
            right: 20,
            color: '#6F61E8',
            fontSize: 15,
            fontWeight: 600,
            opacity: 0.85,
          }}
        >
          Алгасах
        </button>
      </div>

      <IllustrationStage>
        <div key={index} className="fade-in" style={{ width: '100%' }}>
          {slide.illustration}
        </div>
      </IllustrationStage>

      {/* lower content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '28px 26px 36px',
          textAlign: 'center',
        }}
      >
        <PageDots count={slides.length} active={index} />

        <div key={index} className="fade-in" style={{ padding: '0 6px' }}>
          <h1
            style={{
              fontSize: isLast ? 27 : 25,
              fontWeight: 800,
              lineHeight: 1.25,
              color: '#fff',
            }}
          >
            {slide.headline}
          </h1>
          {slide.subtext && (
            <p style={{ marginTop: 12, fontSize: 17, color: 'rgba(255,255,255,0.85)' }}>
              {slide.subtext}
            </p>
          )}
        </div>

        <div style={{ width: '100%' }}>
          <Button onClick={next}>{isLast ? 'Эхлэх' : 'Дараагийнх'}</Button>
        </div>
      </div>
    </div>
  )
}
