import thumb from '@/app/components/projects/assets/thumbnail_rythmify.jpg'
import { StaticImageData } from 'next/image'

export type Projects = {
  id: number | string
  title: string
  description: string
  live_url: string
  github: string
  thumbnail: StaticImageData
}

export const projects: Projects[] = [
  {
    id: 1,
    title: 'Rythmify',
    description:
      'A sleek and intuitive music platform built using the Spotify Free Developer API. Rythmify showcases popular artists, offers detailed artist pages with albums and top tracks, and suggests related artists. Users can create and manage playlists, search for tracks and albums, and personalize their music experience.',
    live_url: 'https://rythmify.vercel.app/',
    github: 'https://github.com/sshuvoo/rythmify',
    thumbnail: thumb,
  },
]
