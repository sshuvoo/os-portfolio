export type Folder = {
  id: string
  name: string
  status: 'close' | 'open' | 'minimize'
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
]
