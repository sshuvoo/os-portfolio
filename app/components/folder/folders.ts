export type Status = 'close' | 'open' | 'minimize'
export type Frame = 'folder' | 'pdf' | 'browser'
export type Folder = {
  id: string
  name: string
  status: Status
  placement: 'desktop' | 'taskbar'
  type: Frame
}

export const folders: Folder[] = [
  {
    id: 'chrome',
    name: 'Chrome',
    status: 'close',
    placement: 'desktop',
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
    id: 'feedbacks',
    name: 'Feedbacks',
    status: 'close',
    placement: 'desktop',
    type: 'folder',
  },
  {
    id: 'contacts',
    name: 'Contacts',
    status: 'close',
    placement: 'desktop',
    type: 'folder',
  },
  {
    id: 'pricing',
    name: 'Pricing',
    status: 'close',
    placement: 'desktop',
    type: 'folder',
  },
]
