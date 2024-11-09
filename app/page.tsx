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
import { useDispatch, useSelector } from './store'
import { Projects } from './components/projects'
import { BrowserFrame } from './components/window-frame/browser-frame'
import { CalculatorFrame } from './components/window-frame/calculator-frame'
import { Settings } from './components/settings'
import { INotes } from './components/inotes'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { ContextMenu } from './components/context-menu'
import { FaApple } from 'react-icons/fa'
import { LockScreen } from './components/lock-screen'
import { setScreenMode } from './features/settings'

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
  const [ctxPosition, setCtxPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const loaderRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()

  const handleContextMenu = (
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    event.preventDefault()
    const coX =
      innerWidth - event.clientX > 256 ? event.clientX : event.clientX - 256
    const coY =
      innerHeight - event.clientY > 294 ? event.clientY : event.clientY - 294
    setCtxPosition({ x: coX, y: coY })
  }

  useEffect(() => {
    const onCloseCtx = (event: globalThis.MouseEvent) => {
      if (bodyRef.current && !bodyRef.current.contains(event.target as Node)) {
        setCtxPosition(null)
      }
    }
    const onReset = () => void setCtxPosition(null)

    document.addEventListener('contextmenu', onCloseCtx)
    document.addEventListener('click', onReset)
    document.addEventListener('dblclick', onReset)
    return () => {
      document.removeEventListener('contextmenu', onCloseCtx)
      document.removeEventListener('click', onReset)
      document.removeEventListener('dblclick', onReset)
    }
  }, [])

  const [screen, setScreen] = useState<'loading' | 'desktop' | 'lock'>(
    'loading'
  )

  useGSAP(() => {
    gsap.to(loaderRef.current, {
      width: '100%',
      duration: 2,
      onComplete: () => {
        setScreen('lock')
      },
    })
  })

  useEffect(() => {
    const onFullscreen = () => {
      if (document.fullscreenElement) {
        dispatch(setScreenMode('fullscreen'))
      } else {
        dispatch(setScreenMode('default'))
      }
    }
    const handleFullscreen = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== 'f') return
      e.preventDefault()
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else if (document.body.requestFullscreen) {
        document.body.requestFullscreen()
      }
    }
    document.addEventListener('fullscreenchange', onFullscreen)
    window.addEventListener('keydown', handleFullscreen)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreen)
      window.removeEventListener('keydown', handleFullscreen)
    }
  }, [dispatch])

  return (
    <>
      {screen === 'loading' && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-black">
          <FaApple className="text-8xl text-white" />
          <div className="h-[5px] w-44 rounded-full bg-[#414141]">
            <div ref={loaderRef} className="h-full w-0 rounded-full bg-white" />
          </div>
        </div>
      )}
      {screen === 'lock' && (
        <LockScreen
          next={() => {
            setScreen('desktop')
          }}
        />
      )}
      {screen === 'desktop' && (
        <div
          ref={bodyRef}
          onContextMenu={handleContextMenu}
          className="h-[calc(100vh-28px)]"
        >
          <div className="flex h-full w-fit flex-col flex-wrap pb-10">
            {destopFolders.map((folder) => (
              <Folder
                status={folder.status}
                onMinimizeRestore={folder.onMinimizeRestore}
                id={folder.id}
                name={folder.name}
                key={folder.name}
                type={folder.type}
              />
            ))}
          </div>
          {ctxPosition && <ContextMenu position={ctxPosition} />}
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
      )}
    </>
  )
}
