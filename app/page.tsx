'use client'

import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { EaselPlugin } from 'gsap/EaselPlugin'
import { ExpoScaleEase, RoughEase, SlowMo } from 'gsap/EasePack'
import { Flip } from 'gsap/Flip'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { Observer } from 'gsap/Observer'
import { PixiPlugin } from 'gsap/PixiPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import { Folder } from './components/folder'
import { PDFViewer } from './components/pdf-viewer'
import { Skill } from './components/skill'
import { Terminal } from './components/terminal'
import { WindowFrame } from './components/window-frame'
import { useSelector } from './store'
import { Projects } from './components/projects'
import { BrowserFrame } from './components/window-frame/browser-frame'

gsap.registerPlugin(
  useGSAP,
  Flip,
  ScrollTrigger,
  Observer,
  ScrollToPlugin,
  Draggable,
  MotionPathPlugin,
  EaselPlugin,
  PixiPlugin,
  TextPlugin,
  RoughEase,
  ExpoScaleEase,
  SlowMo
)

export default function Home() {
  const folders = useSelector((state) => state.windowFrame)
  const destopFolders = folders.filter((f) => f.placement === 'desktop')
  const frames = folders.filter((folder) => folder.status !== 'close')

  return (
    <div className="h-[calc(100vh-24px)]">
      <div className="flex h-full w-fit flex-col flex-wrap pb-10">
        {destopFolders.map((folder) => (
          <Folder
            status={folder.status}
            onMinimizeRestore={folder.onMinimizeRestore}
            id={folder.id}
            name={folder.name}
            key={folder.id}
            type={folder.type}
          />
        ))}
      </div>
      <h1 className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 text-5xl text-white">
        Under Developing...
      </h1>
      {frames.map((frame) => {
        if (frame.type === 'browser') {
          return (
            <BrowserFrame
              frame_id={frame.id}
              frameName={frame.name}
              status={frame.status}
            />
          )
        }
        return (
          <WindowFrame
            frame_id={frame.id}
            status={frame.status}
            frameName={frame.name}
            key={frame.id}
          >
            {frame.id === 'skills' && <Skill />}
            {frame.id === 'terminal' && <Terminal />}
            {frame.id === 'projects' && <Projects />}
            {frame.type === 'pdf' && <PDFViewer id={frame.id} />}
          </WindowFrame>
        )
      })}
    </div>
  )
}
