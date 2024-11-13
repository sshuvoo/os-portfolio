import { runNode, runPrompt } from '@/app/features/terminal'
import { useDispatch, useSelector } from '@/app/store'
import { IconBrandNodejs, IconTerminal } from '@tabler/icons-react'
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { commandsHelp } from '@/app/features/terminal/terminal-commands'
import { closeFolder, openFolder } from '@/app/features/window-slice'

export function Terminal() {
  const inputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useDispatch()
  const [prompt, setPrompt] = useState('')
  const [nodePrompt, setNodePrompt] = useState('')
  const terminal = useSelector((state) => state.terminal)
  const folders = useSelector((state) => state.windowFrame)

  useEffect(() => {
    if (inputRef.current instanceof HTMLInputElement) {
      inputRef.current.focus()
    }
    if (textareaRef.current instanceof HTMLTextAreaElement) {
      textareaRef.current.focus()
    }
  }, [terminal.mode])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(runPrompt(prompt))
    if (prompt.startsWith('cat ')) {
      const directory = prompt.split(' ')[1]
      if (directory) {
        const isFound = folders.find(({ id }) => id === directory.toLowerCase())
        if (isFound) {
          dispatch(openFolder(isFound.id))
          if (isFound.status === 'minimize' && isFound.onMinimizeRestore) {
            isFound.onMinimizeRestore()
          }
        }
      }
    } else if (prompt.trim() === 'exit') {
      dispatch(closeFolder('terminal'))
    }
    setPrompt('')
  }

  const handleNodeSubmit = async (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      if (e.shiftKey) return
      if (nodePrompt.trim() === 'exit' || nodePrompt.trim() === 'clear') {
        dispatch(runPrompt(nodePrompt))
        setNodePrompt('')
      } else if (nodePrompt) {
        try {
          const res = await fetch('/api/execute', {
            body: JSON.stringify({ code: nodePrompt }),
            method: 'POST',
          })
          const json = await res.json()
          dispatch(
            runNode({
              command: nodePrompt,
              console: json?.console || '',
              error: json?.error
                ? json?.error
                : json?.message
                  ? json?.message
                  : '',
            })
          )
        } catch (error) {
          console.log(error)
        } finally {
          setNodePrompt('')
        }
      }
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (textareaRef.current) {
      textareaRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [terminal])

  return (
    <div className="max-h-full overflow-y-auto p-4">
      {terminal.history.map((command) => {
        return command.mode === 'directory' ? (
          <div key={command.id}>
            <div className="flex gap-2">
              <h2 className="flex items-center gap-2">
                <span>desktop</span>
                <IconTerminal stroke={2} />
              </h2>
              <p className="w-full resize-none overflow-hidden whitespace-pre border-none bg-transparent font-mono leading-normal outline-none">
                {command.command}
              </p>
            </div>
            {command.error && (
              <p className="font-medium text-red-500">{command.error}</p>
            )}
            {command.command === 'pwd' && (
              <p className="font-medium text-green-500">/desktop</p>
            )}
            {command.command === 'ls' && (
              <ul>
                {folders.map((folder) => (
                  <li className="font-medium text-green-500" key={folder.id}>
                    {folder.type === 'folder' && `/${folder.name}`}
                    {folder.type === 'pdf' && `${folder.name}.pdf`}
                  </li>
                ))}
              </ul>
            )}
            {command.command === 'help' && (
              <ul>
                {commandsHelp.map((item) => (
                  <li className="font-medium text-green-500" key={item.command}>
                    {item.command} -{' '}
                    <span className="text-light-text dark:text-dark-text">
                      {item.action}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : (
          <div key={command.id}>
            <div className="flex flex-col gap-2">
              <h2 className="flex items-center gap-2">
                <span>console</span>
                <IconBrandNodejs
                  className="size-5 text-green-500"
                  stroke={1.5}
                />
              </h2>
              <p className="w-full resize-none overflow-hidden whitespace-pre border-none bg-transparent font-mono leading-normal outline-none">
                {command.command}
              </p>
            </div>
            <div>
              {command?.console &&
                command.console.split('\n').map((c, i) => (
                  <p key={i} className="text-green-500">
                    {c}
                  </p>
                ))}
              <p className="text-red-500">{command.error}</p>
            </div>
          </div>
        )
      })}
      <div className={terminal.mode === 'directory' ? 'flex gap-2' : ''}>
        <h2 className="grid grid-cols-[auto,1fr] items-center gap-2">
          <span>{terminal.mode === 'node' ? 'console' : 'desktop'}</span>
          {terminal.mode === 'directory' ? (
            <IconTerminal stroke={2} />
          ) : (
            <IconBrandNodejs className="size-5 text-green-500" stroke={1.5} />
          )}
        </h2>
        {terminal.mode === 'directory' && (
          <form onSubmit={handleSubmit} className="w-full">
            <input
              ref={inputRef}
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value)
              }}
              className="w-full resize-none overflow-hidden whitespace-pre border-none bg-transparent font-mono leading-normal outline-none"
            />
            <input type="submit" hidden />
          </form>
        )}
        {terminal.mode === 'node' && (
          <form className="w-full">
            <textarea
              ref={textareaRef}
              value={nodePrompt}
              onChange={(e) => {
                setNodePrompt(e.target.value)
              }}
              onKeyDown={handleNodeSubmit}
              rows={5}
              className="w-full resize-none overflow-hidden whitespace-pre border-none bg-transparent font-mono leading-normal outline-none"
            />
          </form>
        )}
      </div>
    </div>
  )
}
