import { clock_utils } from '@/app/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import author from '@/public/assets/images/author.jpg'

export function LockScreen({ next }: { next: () => void }) {
  const [clock, setClock] = useState<{ date: string; time: string }>({
    date: clock_utils.getLockScreenDate(),
    time: clock_utils.getCurrentTime(),
  })
  const [password, setPassword] = useState('')

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

  return (
    <div className="bg-lock fixed inset-0 z-[9999] flex flex-col items-center justify-between gap-5 bg-black bg-cover bg-center bg-no-repeat py-20">
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
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (password === '1234') {
              next()
            } else setPassword('')
          }}
          className="group relative"
        >
          <input
            className="w-36 rounded-full bg-white/35 px-2 py-1 text-xs placeholder:text-gray-500 focus:outline-none"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => void setPassword(e.target.value)}
          />
          <span className="absolute -right-8 top-1/2 hidden -translate-y-1/2 rounded-md bg-black/50 p-[2px] px-1 text-xs text-white/80 group-hover:inline-block">
            1234
          </span>
          <input type="submit" hidden />
        </form>
        <p className="text-xs text-white/45">Touch ID or Enter Password</p>
      </div>
    </div>
  )
}
