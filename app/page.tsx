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
import { CalculatorFrame } from './components/window-frame/calculator-frame'
import { Settings } from './components/settings'
import { INotes } from './components/inotes'

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
    <div className="h-[calc(100vh-28px)]">
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
      {frames.map((frame) => {
        if (frame.type === 'browser') {
          return (
            <BrowserFrame
              key={frame.id}
              frame_id={frame.id}
              status={frame.status}
            />
          )
        }
        if (frame.type === 'calculator') {
          return (
            <CalculatorFrame
              key={frame.id}
              frame_id={frame.id}
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
            {frame.id === 'inotes' && <INotes />}
            {frame.id === 'settings' && <Settings />}
            {frame.id === 'terminal' && <Terminal />}
            {frame.id === 'projects' && <Projects />}
            {frame.type === 'pdf' && <PDFViewer id={frame.id} />}
          </WindowFrame>
        )
      })}
    </div>
  )
}
