'use client'

import md from '@/public/assets/background/monterey-dark.jpg'
import ml from '@/public/assets/background/monterey-light.jpg'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
// import { EaselPlugin } from 'gsap/EaselPlugin'
// import { ExpoScaleEase, RoughEase, SlowMo } from 'gsap/EasePack'
// import { Flip } from 'gsap/Flip'
// import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
// import { Observer } from 'gsap/Observer'
// import { PixiPlugin } from 'gsap/PixiPlugin'
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { TextPlugin } from 'gsap/TextPlugin'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import { FaApple } from 'react-icons/fa'
import { Contact } from './components/contact'
import { ContextMenu } from './components/context-menu'
import { Folder } from './components/folder'
import { Gallery } from './components/gallery'
import { INotes } from './components/inotes'
import { LockScreen } from './components/lock-screen'
import { PDFViewer } from './components/pdf-viewer'
import { Projects } from './components/projects'
import { Settings } from './components/settings'
import { Skill } from './components/skill'
import { Terminal } from './components/terminal'
import { TrashBin } from './components/trash-bin'
import { TypingMaster } from './components/typing-master'
import { WindowFrame } from './components/window-frame'
import { BrowserFrame } from './components/window-frame/browser-frame'
import { CalculatorFrame } from './components/window-frame/calculator-frame'
import { setScreenMode, setWallpaper } from './features/settings'
import { useDispatch, useSelector } from './store'

gsap.registerPlugin(useGSAP, Draggable)

export default function Home() {
  const folders = useSelector((state) => state.windowFrame)
  const destopFolders = folders.filter((f) => f.placement === 'desktop')
  const frames = folders.filter((folder) => folder.status !== 'close')
  const [screenSize, setScreenSize] = useState<{ w: number; h: number } | null>(
    null
  )
  const { desktop } = useSelector((state) => state.settings)

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
    document.addEventListener('fullscreenchange', onFullscreen)
    dispatch(setWallpaper({ dark: md, light: ml }))
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreen)
    }
  }, [dispatch])

  useEffect(() => {
    const trackSize = () => {
      setScreenSize({ w: innerWidth, h: innerHeight })
    }
    window.addEventListener('resize', trackSize)
    trackSize()
    return () => {
      window.removeEventListener('resize', trackSize)
    }
  }, [])

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
      {screen === 'desktop' &&
        screenSize &&
        screenSize.w >= 900 &&
        screenSize.h >= 600 && (
          <div
            ref={bodyRef}
            onContextMenu={handleContextMenu}
            className="h-[calc(100vh-28px)]"
          >
            <div
              className={`flex flex-wrap ${desktop.view === 'vertical' ? 'h-full w-fit flex-col pb-10' : 'h-fit w-full'}`}
            >
              {destopFolders
                .slice()
                .sort((a, b) => {
                  if (desktop.sort === 'name') {
                    const name1 = a.name.toLowerCase()
                    const name2 = b.name.toLowerCase()
                    if (name1 < name2) return -1
                    else if (name1 > name2) return 1
                    return 0
                  } else return 0
                })
                .map((folder) => (
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
                    frameName={frame.name}
                  />
                )
              }
              if (frame.type === 'calculator') {
                return (
                  <CalculatorFrame
                    key={frame.id}
                    frame_id={frame.id}
                    status={frame.status}
                    frameName={frame.name}
                  />
                )
              }
              return (
                <WindowFrame
                  enableSidebar={
                    frame.id === 'skills' ||
                    frame.id === 'trash' ||
                    frame.id === 'inotes' ||
                    frame.id === 'settings' ||
                    frame.id === 'gallery'
                  }
                  frame_id={frame.id}
                  status={frame.status}
                  frameName={frame.name}
                  key={frame.id}
                >
                  {frame.id === 'skills' && <Skill />}
                  {frame.id === 'trash' && <TrashBin />}
                  {frame.id === 'inotes' && <INotes />}
                  {frame.id === 'settings' && <Settings />}
                  {frame.id === 'gallery' && <Gallery />}
                  {frame.id === 'terminal' && <Terminal />}
                  {frame.id === 'projects' && <Projects />}
                  {frame.id === 'typing-master' && <TypingMaster />}
                  {frame.id === 'contact' && <Contact />}
                  {frame.type === 'pdf' && <PDFViewer id={frame.id} />}
                </WindowFrame>
              )
            })}
          </div>
        )}
      {screen === 'desktop' &&
        screenSize &&
        (screenSize.w < 900 || screenSize.h < 600) && (
          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-5 bg-black">
            <h1 className="text-2xl font-medium text-white">
              Required Screen Size 900 x 600
            </h1>
            <h1 className="text-2xl font-medium text-rose-400">
              Current Screen Size {screenSize.w} x {screenSize.h}
            </h1>
          </div>
        )}
    </>
  )
}
