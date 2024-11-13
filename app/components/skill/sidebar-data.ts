import {
  Icon,
  IconBrandDjango,
  IconBrandVue,
  IconCode,
  IconDatabase,
  IconProps,
  IconTool,
} from '@tabler/icons-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

interface SidebarData {
  id: string
  label: string
  Icon: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>
}

export const sidebarData: SidebarData[] = [
  {
    id: 'languages',
    label: 'Languages',
    Icon: IconCode,
  },
  {
    id: 'frontend',
    label: 'Frontend',
    Icon: IconBrandVue,
  },
  {
    id: 'backend',
    label: 'Backend',
    Icon: IconBrandDjango,
  },
  {
    id: 'databases',
    label: 'Databases',
    Icon: IconDatabase,
  },
  {
    id: 'tools',
    label: 'Tools',
    Icon: IconTool,
  },
]
