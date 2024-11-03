import { setWallpaper } from '@/app/features/settings'
import { useDispatch, useSelector } from '@/app/store'
import ad from '@/public/assets/background/accent-dark.jpg'
import al from '@/public/assets/background/accent-light.jpg'
import bd from '@/public/assets/background/blue-dark.jpg'
import bl from '@/public/assets/background/blue-light.jpg'
import dgd from '@/public/assets/background/darker-gray-dark.jpg'
import dgl from '@/public/assets/background/darker-gray-light.jpg'
import gd from '@/public/assets/background/gray-dark.jpg'
import gl from '@/public/assets/background/gray-light.jpg'
import grd from '@/public/assets/background/green-dark.jpg'
import grl from '@/public/assets/background/green-light.jpg'
import hd from '@/public/assets/background/helios-dark.jpg'
import hl from '@/public/assets/background/helios-light.jpg'
import md from '@/public/assets/background/monterey-dark.jpg'
import ml from '@/public/assets/background/monterey-light.jpg'
import od from '@/public/assets/background/orange-dark.jpg'
import ol from '@/public/assets/background/orange-light.jpg'
import pd from '@/public/assets/background/purple-dark.jpg'
import pl from '@/public/assets/background/purple-light.jpg'
import rd from '@/public/assets/background/red-dark.jpg'
import rl from '@/public/assets/background/red-light.jpg'
import sd from '@/public/assets/background/spectrum-dark.jpg'
import sl from '@/public/assets/background/spectrum-light.jpg'
import vd from '@/public/assets/background/ventura-dark.jpg'
import vl from '@/public/assets/background/ventura-light.jpg'
import yd from '@/public/assets/background/yellow-dark.jpg'
import yl from '@/public/assets/background/yellow-light.jpg'
import Image from 'next/image'

const mixWallpaper = [
  [hd, hl],
  [md, ml],
  [vd, vl],
]

const macintosh = [
  [ad, al],
  [bd, bl],
  [gd, gl],
  [grd, grl],
  [dgd, dgl],
  [od, ol],
  [pd, pl],
  [rd, rl],
  [yd, yl],
  [sd, sl],
]

export function Wallpaper() {
  const dispatch = useDispatch()
  const current = useSelector((state) => state.settings.current)

  return (
    <div className="p-4">
      <div className="flex gap-8 border-b border-[#5f5f5f] pb-10">
        <div className="relative h-28 w-60">
          <Image
            className="object-cover object-center"
            alt="walpaper"
            fill
            src={current}
            sizes="(max-width: 100px) 100vw"
          />
        </div>
        <div className="flex items-start gap-3 text-white">
          <h3>Theme Mode</h3>
          <select className="bg-[#212121] px-2 py-[2px] focus:outline-none">
            <option>Automatic</option>
            <option>Dark</option>
            <option>Light</option>
          </select>
        </div>
      </div>
      <h2 className="my-4 text-xl font-medium text-white">
        Sequoia-Monterey-Ventura
      </h2>
      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {mixWallpaper.map((wp, i) => (
          <button
            onClick={() => {
              dispatch(setWallpaper(wp[1]))
            }}
            className="relative h-28"
            key={i}
          >
            <Image
              className="object-cover object-center"
              alt="walpaper"
              fill
              src={wp[1]}
              sizes="(max-width: 100px) 100vw"
            />
          </button>
        ))}
      </div>
      <h2 className="mb-4 text-xl font-medium text-white">Macintosh</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {macintosh.map((wp, i) => (
          <button
            onClick={() => {
              dispatch(setWallpaper(wp[1]))
            }}
            className="relative h-28"
            key={i}
          >
            <Image
              className="object-cover object-center"
              alt="walpaper"
              fill
              src={wp[1]}
              sizes="(max-width: 100px) 100vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
