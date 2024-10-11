export type Status = 'close' | 'open' | 'minimize'
export type Folder = {
  id: string
  name: string
  status: Status
}

export const folders: Folder[] = [
  {
    id: 'projects',
    name: 'Projects',
    status: 'close',
  },
  {
    id: 'skills',
    name: 'Skills',
    status: 'close',
  },
  {
    id: 'feedback',
    name: 'Feedbacks',
    status: 'close',
  },
  {
    id: 'contact',
    name: 'Contacts',
    status: 'close',
  },
  {
    id: 'services',
    name: 'services',
    status: 'close',
  },
  {
    id: 'pricing',
    name: 'Pricing',
    status: 'close',
  },
]
