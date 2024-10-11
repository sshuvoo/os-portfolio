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
import { WindowFrame } from './components/window-frame'
import { useDispatch, useSelector } from './store'
import { closeFolder, minimizeFolder } from './features/window-slice'
import { Skill } from './components/skill'

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
  const frames = folders.filter((folder) => folder.status !== 'close')
  const dispatch = useDispatch()

  return (
    <div className="h-screen">
      {folders.map((folder) => (
        <Folder id={folder.id} name={folder.name} key={folder.id} />
      ))}
      {frames.map((frame) => (
        <WindowFrame
          status={frame.status}
          frameName={frame.name}
          key={frame.id}
          onClose={() => {
            dispatch(closeFolder(frame.id))
          }}
          onFullScreen={() => {}}
          onMinimize={() => {
            dispatch(minimizeFolder(frame.id))
          }}
        >
          {frame.id === 'skills' && <Skill />}
        </WindowFrame>
      ))}
    </div>
  )
}
