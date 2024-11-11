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
import { useTheme } from 'next-themes'
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
  const wallpaper = useSelector((state) => state.settings.wallpaper)
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <div className="p-4">
      <div className="border-light-border flex gap-8 border-b pb-10 dark:border-[#4b4b4b]">
        <div className="relative h-28 w-60">
          {wallpaper && (
            <Image
              className="object-cover object-center"
              alt="walpaper"
              fill
              src={resolvedTheme === 'dark' ? wallpaper.dark : wallpaper.light}
              sizes="(max-width: 100px) 100vw"
            />
          )}
        </div>
        <div className="flex h-fit items-center justify-start gap-3 font-medium">
          <h3>Theme Mode</h3>
          <select
            onChange={(e) => {
              setTheme(e.target.value)
            }}
            value={theme}
            className="bg-light-background dark:bg-dark-background px-2 py-[2px] focus:outline-none"
          >
            <option value="system">Automatic</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>
      </div>
      <h2 className="my-4 text-lg font-medium">Sequoia-Monterey-Ventura</h2>
      <div className="mb-8 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {mixWallpaper.map((wp, i) => (
          <button
            onClick={() => {
              dispatch(setWallpaper({ dark: wp[0], light: wp[1] }))
            }}
            className="relative h-28"
            key={i}
          >
            <Image
              className="object-cover object-center"
              alt="walpaper"
              fill
              src={resolvedTheme === 'light' ? wp[1] : wp[0]}
              sizes="(max-width: 100px) 100vw"
            />
          </button>
        ))}
      </div>
      <h2 className="mb-4 text-lg font-medium">Macintosh</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        {macintosh.map((wp, i) => (
          <button
            onClick={() => {
              dispatch(setWallpaper({ dark: wp[0], light: wp[1] }))
            }}
            className="relative h-28"
            key={i}
          >
            <Image
              className="object-cover object-center"
              alt="walpaper"
              fill
              src={resolvedTheme === 'light' ? wp[1] : wp[0]}
              sizes="(max-width: 100px) 100vw"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
