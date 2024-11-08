import { addNewNote, INote, loadNotes, updateNote } from '@/app/features/notes'
import { useDispatch, useSelector } from '@/app/store'
import { IconNotes, IconPlus } from '@tabler/icons-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

export function INotes() {
  const inotes = useSelector((state) => state.iNotes.notes)
  const [tab, setTab] = useState<string>('')
  const activeNote = inotes.find((note) => note.id === tab)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (textareaRef.current instanceof HTMLTextAreaElement) {
      textareaRef.current.focus()
    }
  }, [tab])

  useEffect(() => {
    const localNotes = localStorage.getItem('iNotes')
    const parseNotes: INote[] | null = JSON.parse(localNotes || 'null')
    if (parseNotes) {
      dispatch(loadNotes(parseNotes))
    }
  }, [dispatch])

  const onNewNote = () => {
    const id = crypto.randomUUID()
    dispatch(
      addNewNote({
        id,
        content: 'Hurray! This is my new note',
        updatedAt: new Date().toISOString(),
      })
    )
    setTab(id)
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      updateNote({
        id: tab,
        content: e.target.value,
        updatedAt: new Date().toISOString(),
      })
    )
  }

  return (
    <div className="grid h-full grid-cols-[250px,1fr]">
      <div className="h-full bg-[#282828] p-4">
        <div className="mb-3">
          <button
            onClick={onNewNote}
            className="flex w-full items-center gap-2 rounded-md bg-white/10 px-4 py-1 text-sm font-medium text-[#e0e0e0]"
          >
            <IconPlus className="size-4" stroke={2} />
            <span>Write a new note</span>
          </button>
        </div>
        <h3 className="text-sm font-medium text-[#9a9a9a]">On your iCloud</h3>
        <div className="mt-2 space-y-2">
          {inotes.map((note) => (
            <button
              key={note.id}
              onClick={() => {
                setTab(note.id)
              }}
              className={`grid w-full grid-cols-[auto,1fr] gap-2 rounded-md px-2 py-1 ${tab === note.id ? 'bg-[#383838]' : 'hover:bg-[#383838]'}`}
            >
              <div className='size-6'>
                <IconNotes
                  stroke={2}
                  className="translate-y-[2px] text-emerald-500 size-full"
                />
              </div>
              <div className="flex flex-col text-start">
                <h2 className="line-clamp-1 font-medium text-[#c6c6c6] text-sm">
                  {note.content.trim().length > 2
                    ? note.content.trim()
                    : 'My New Note'}
                </h2>
                <h2 className="text-[10px] text-[#c6c6c6]">
                  {new Date(note.updatedAt).toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'short',
                    year: '2-digit',
                  })}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="bg-[#212121] p-4">
        {activeNote ? (
          <textarea
            ref={textareaRef}
            className="h-full w-full resize-none bg-inherit text-[#e5e5e5] focus:outline-none"
            value={activeNote.content}
            onChange={handleChange}
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <button
              onClick={onNewNote}
              className="flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-[#e0e0e0]"
            >
              <IconPlus className="size-4" stroke={2} />
              <span>Write a new note</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
