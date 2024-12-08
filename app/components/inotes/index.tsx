import {
  addNewNote,
  deleteNote,
  INote,
  loadNotes,
  updateNote,
} from '@/app/features/notes'
import { useDispatch, useSelector } from '@/app/store'
import { IconNotes, IconPlus } from '@tabler/icons-react'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import { FiEdit } from 'react-icons/fi'

export function INotes() {
  const inotes = useSelector((state) => state.iNotes.notes)
  const [tab, setTab] = useState<string>('')
  const activeNote = inotes.find((note) => note.id === tab)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const dispatch = useDispatch()
  const [mode, setMode] = useState<'readonly' | 'edit'>('readonly')

  useEffect(() => {
    if (textareaRef.current instanceof HTMLTextAreaElement) {
      textareaRef.current.focus()
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
  }, [tab])

  useEffect(() => {
    const localNotes = localStorage.getItem('iNotes')
    const parseNotes: INote[] | null = JSON.parse(localNotes || 'null')
    if (parseNotes) {
      dispatch(loadNotes(parseNotes))
    }
  }, [dispatch])

  const onDelete = (id: string) => {
    dispatch(deleteNote(id))
    const updatedNotes = inotes.filter((note) => note.id !== id)
    localStorage.setItem('iNotes', JSON.stringify(updatedNotes))
    setMode('readonly')
  }

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

  const onEdit = () => {
    if (textareaRef.current instanceof HTMLTextAreaElement) {
      textareaRef.current.focus()
      const length = textareaRef.current.value.length
      textareaRef.current.setSelectionRange(length, length)
    }
    if (mode === 'edit') return
    setMode('edit')
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      updateNote({
        id: tab,
        content: e.target.value,
        updatedAt: new Date().toISOString(),
      })
    )
    const updatedNotes = inotes.map((note) => {
      if (note.id === tab) {
        return {
          id: tab,
          content: e.target.value,
          updatedAt: new Date().toISOString(),
        }
      } else return note
    })
    localStorage.setItem('iNotes', JSON.stringify(updatedNotes))
  }

  return (
    <div className="grid h-full grid-cols-[250px,1fr]">
      <div className="max-h-full overflow-y-auto bg-light-foreground p-4 dark:bg-dark-foreground">
        <div className="mb-3">
          <button
            onClick={onNewNote}
            className="flex w-full items-center gap-2 rounded-md bg-white px-4 py-1 text-sm font-medium dark:bg-white/10"
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
                setMode('readonly')
              }}
              className={`grid w-full grid-cols-[auto,1fr] gap-2 rounded-md px-2 py-1 ${tab === note.id ? 'bg-white dark:bg-dark-hover-bg' : 'hover:bg-white dark:hover:bg-dark-hover-bg'}`}
            >
              <div className="size-6">
                <IconNotes
                  stroke={2}
                  className="size-full translate-y-[2px] text-emerald-500"
                />
              </div>
              <div className="flex flex-col text-start">
                <h2 className="line-clamp-1 text-sm font-medium">
                  {note.content.trim().length > 2
                    ? note.content.trim().length <= 40
                      ? note.content.trim()
                      : note.content.trim().slice(0, 37) + '...'
                    : 'My New Note'}
                </h2>
                <h2 className="text-[10px]">
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
      <div className="max-h-full overflow-y-auto p-4">
        {activeNote ? (
          <>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={onDelete.bind(null, activeNote.id)}
                type="button"
              >
                <FaRegTrashCan />
              </button>
              <button onClick={onEdit} type="button">
                <FiEdit />
              </button>
            </div>
            <textarea
              title="Double Click To Edit"
              onDoubleClick={onEdit}
              readOnly={mode === 'readonly'}
              ref={textareaRef}
              className="h-[calc(100%-22px)] w-full resize-none bg-inherit focus:outline-none"
              value={activeNote.content}
              onChange={handleChange}
            />
          </>
        ) : (
          <div className="flex size-full items-center justify-center">
            <button
              onClick={onNewNote}
              className="flex items-center gap-2 rounded-md bg-light-foreground px-4 py-2 text-sm font-medium dark:bg-white/10"
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
