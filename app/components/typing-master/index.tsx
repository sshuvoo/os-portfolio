import { useEffect, useState } from 'react'
import { typingTexts } from './typing-texts'
import { IconClock } from '@tabler/icons-react'

export function TypingMaster() {
  const [random, setRandom] = useState(
    Math.floor(Math.random() * typingTexts.length)
  )
  const [cursor, setCursor] = useState({ start: 0, end: 60 })
  const singleLine = typingTexts[random].text.slice(cursor.start, cursor.end)
  const [typing, setTyping] = useState('')
  const [timer, setTimer] = useState(60)
  const [status, setStatus] = useState<'typing' | 'idle'>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const intervalid = setInterval(() => {
      if (timer > 0) {
        setTimer((pre) => pre - 1)
      } else clearInterval(intervalid)
    }, 1000)
    return () => {
      clearInterval(intervalid)
    }
  }, [timer, status])

  return (
    <div className="max-h-full overflow-y-auto p-4">
      <div className="flex flex-col items-center gap-8">
        <div className="flex w-full justify-end gap-4">
          <button
            onClick={() => {
              setRandom(Math.floor(Math.random() * typingTexts.length))
              setCursor({ start: 0, end: 60 })
              setTyping('')
              setTimer(60)
              setStatus('idle')
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
                return (
                  <span key={i} className="text-red-400">
                    {char}
                  </span>
                )
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
              setTyping('')
              setCursor({
                start: cursor.end,
                end:
                  typingTexts[random].text.length >= cursor.end + 60
                    ? cursor.end + 60
                    : typingTexts[random].text.length,
              })
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
