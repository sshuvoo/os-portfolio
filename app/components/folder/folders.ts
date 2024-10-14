export type Status = 'close' | 'open' | 'minimize'
export type Folder = {
  id: string
  name: string
  status: Status
  placement: 'desktop' | 'taskbar'
}

export const folders: Folder[] = [
  {
    id: 'projects',
    name: 'Projects',
    status: 'close',
    placement: 'desktop',
  },
  {
    id: 'skills',
    name: 'Skills',
    status: 'close',
    placement: 'desktop',
  },
  {
    id: 'feedbacks',
    name: 'Feedbacks',
    status: 'close',
    placement: 'desktop',
  },
  {
    id: 'contacts',
    name: 'Contacts',
    status: 'close',
    placement: 'desktop',
  },
  {
    id: 'services',
    name: 'Services',
    status: 'close',
    placement: 'desktop',
  },
  {
    id: 'pricing',
    name: 'Pricing',
    status: 'close',
    placement: 'desktop',
  },
]
