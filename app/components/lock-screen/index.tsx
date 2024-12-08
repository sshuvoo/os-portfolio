import { clock_utils } from '@/app/utils'
import Image from 'next/image'
import { FormEvent, useEffect, useRef, useState } from 'react'
import author from '@/public/assets/images/author.jpg'
import gsap from 'gsap'

export function LockScreen({ next }: { next: () => void }) {
  const [clock, setClock] = useState<{ date: string; time: string }>({
    date: clock_utils.getLockScreenDate(),
    time: clock_utils.getCurrentTime(),
  })
  const [password, setPassword] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)
  const blankRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const itervalId = setInterval(() => {
      setClock({
        date: clock_utils.getLockScreenDate(),
        time: clock_utils.getCurrentTime(),
      })
    }, 1000)
    return () => {
      clearInterval(itervalId)
    }
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const timeLine = gsap.timeline()
    timeLine.to(bodyRef.current, {
      xPercent: 100,
      duration: 0.5,
      ease: 'expo.in',
    })
    timeLine.to(blankRef.current, {
      xPercent: 100,
      duration: 0.5,
      ease: 'expo.in',
      onComplete: next,
    })
  }

  return (
    <>
      <div
        ref={bodyRef}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-between gap-5 bg-black bg-lock bg-cover bg-center bg-no-repeat py-20"
      >
        <div>
          <p className="text-center text-2xl font-medium text-[#ffffb5]">
            {clock.date}
          </p>
          <p className="text-7xl font-medium text-[#ffffb5]">{clock.time}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Image
            alt=""
            src={author}
            width={40}
            height={40}
            className="rounded-full"
          />
          <form onSubmit={handleSubmit}>
            <input
              className="w-36 rounded-full bg-white/35 px-2 py-1 text-xs placeholder:text-gray-500 focus:outline-none"
              placeholder="Enter Any Password"
              value={password}
              type="password"
              onChange={(e) => void setPassword(e.target.value)}
            />
            <input type="submit" hidden />
          </form>
          <p className="text-xs text-white/45">Touch ID or Enter Password</p>
        </div>
      </div>
      <div
        ref={blankRef}
        className="fixed inset-0 z-[9998] flex flex-col items-center justify-center gap-5 bg-dark-background"
      ></div>
    </>
  )
}
