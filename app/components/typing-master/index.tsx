import { useEffect, useState } from 'react'
import { typingTexts } from './typing-texts'
import { IconClock } from '@tabler/icons-react'

export function TypingMaster() {
  const [random, setRandom] = useState(
    Math.floor(Math.random() * typingTexts.length)
  )
  const singleLine = typingTexts[random].text
  const [typing, setTyping] = useState('')
  const [timer, setTimer] = useState(60)
  const [status, setStatus] = useState<'typing' | 'idle'>('idle')
  const [resultText, setResultText] = useState('')
  const [result, setResult] = useState({ wpm: 0, ws: 0 })
  const [paragraph, setParagraph] = useState(singleLine)

  useEffect(() => {
    if (status === 'idle') return
    const intervalid = setInterval(() => {
      if (timer > 0) {
        setTimer((pre) => pre - 1)
      } else {
        clearInterval(intervalid)
        const resultArr = (resultText ? resultText + ' ' + typing : typing)
          .trim()
          .split(' ')
        const paraArr = paragraph.trim().split(' ')
        for (let i = 0; i < resultArr.length; i++) {
          if (resultArr[i] === paraArr[i]) {
            setResult((pre) => ({ ...pre, wpm: pre.wpm + 1 }))
          } else setResult((pre) => ({ ...pre, ws: pre.ws + 1 }))
        }
      }
    }, 1000)
    return () => {
      clearInterval(intervalid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, status])

  return (
    <div className="max-h-full overflow-y-auto p-4">
      <div className="flex flex-col items-center gap-8">
        <div className="flex w-full justify-between gap-4">
          <div className="flex items-center gap-4 text-lg font-medium">
            <h2>Words Per Minute: {result.wpm}</h2>
            <h2>Miss Spelled: {result.ws}</h2>
          </div>
          <div className="flex items-center gap-4 font-medium">
            <button
              onClick={() => {
                const index = Math.floor(Math.random() * typingTexts.length)
                setRandom(index)
                setTyping('')
                setTimer(60)
                setStatus('idle')
                setResultText('')
                setParagraph(typingTexts[index].text)
                setResult({ wpm: 0, ws: 0 })
              }}
              className="rounded bg-primary px-2 font-medium text-dark-text"
            >
              Restart
            </button>
            <h4 className="flex items-center gap-1 rounded bg-white px-2 font-medium dark:bg-black">
              <IconClock className="size-5" />
              {timer}s
            </h4>
          </div>
        </div>
        <div className="w-full max-w-4xl text-3xl font-medium">
          {singleLine.split('').map((char, i) => {
            if (typing[i]) {
              if (typing[i] === char) {
                return (
                  <span key={i} className="text-green-400">
                    {char}
                  </span>
                )
              } else {
                if (char === ' ') {
                  return (
                    <span key={i} className="bg-red-400">
                      {char}
                    </span>
                  )
                } else {
                  return (
                    <span key={i} className="text-red-400">
                      {char}
                    </span>
                  )
                }
              }
            } else {
              return <span key={i}>{char}</span>
            }
          })}
        </div>
        <input
          disabled={timer === 0}
          value={typing}
          onChange={(e) => {
            if (e.target.value.length === singleLine.length) {
              setResultText((pre) => {
                if (pre) {
                  return pre + ' ' + e.target.value
                } else return e.target.value
              })
              setTyping('')
              const index = Math.floor(Math.random() * typingTexts.length)
              setParagraph((pre) => {
                if (pre) {
                  return pre + ' ' + typingTexts[index].text
                } else {
                  return typingTexts[index].text
                }
              })
              setRandom(index)
            } else {
              setTyping(e.target.value)
              if (status !== 'typing') {
                setStatus('typing')
              }
            }
          }}
          className="w-full max-w-4xl rounded-md bg-light-foreground px-4 py-4 text-3xl font-medium focus:outline-none dark:bg-dark-foreground"
        />
      </div>
    </div>
  )
}
