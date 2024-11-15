export type Status = 'close' | 'open' | 'minimize'
export type Frame = 'folder' | 'pdf' | 'browser' | 'calculator'
export type Folder = {
  id: string
  name: string
  status: Status
  placement: 'desktop' | 'taskbar'
  type: Frame
}

export const folders: Folder[] = [
  {
    id: 'contact',
    name: 'Contact',
    status: 'close',
    placement: 'taskbar',
    type: 'folder',
  },
  {
    id: 'gallery',
    name: 'Gallery',
    status: 'close',
    placement: 'taskbar',
    type: 'folder',
  },
  {
    id: 'inotes',
    name: 'iNotes',
    status: 'close',
    placement: 'taskbar',
    type: 'folder',
  },
  {
    id: 'chrome',
    name: 'Chrome',
    status: 'close',
    placement: 'taskbar',
    type: 'browser',
  },
  {
    id: 'resume',
    name: 'Resume',
    status: 'close',
    placement: 'desktop',
    type: 'pdf',
  },
  {
    id: 'calculator',
    name: 'Calculator',
    status: 'close',
    placement: 'taskbar',
    type: 'calculator',
  },
  {
    id: 'projects',
    name: 'Projects',
    status: 'close',
    placement: 'desktop',
    type: 'folder',
  },
  {
    id: 'skills',
    name: 'Skills',
    status: 'close',
    placement: 'desktop',
    type: 'folder',
  },
  {
    id: 'typing-master',
    name: 'Typing Master',
    status: 'close',
    placement: 'desktop',
    type: 'folder',
  },
  {
    id: 'terminal',
    name: 'Terminal',
    status: 'close',
    placement: 'taskbar',
    type: 'folder',
  },
  {
    id: 'settings',
    name: 'Settings',
    status: 'close',
    placement: 'taskbar',
    type: 'folder',
  },
  {
    id: 'trash',
    name: 'Trash',
    status: 'close',
    placement: 'taskbar',
    type: 'folder',
  },
]
