import rythmify from '@/app/components/projects/assets/thumb_rythmify.jpg'
import opensub from '@/app/components/projects/assets/thumb-opensub.jpg'
import shadhinshop from '@/app/components/projects/assets/thumb-shadhin-shop.jpg'
import squidGame from '@/app/components/projects/assets/thumb_squid-game.jpg'

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
    thumbnail: rythmify,
  },
  {
    id: 2,
    title: 'OpenSub',
    description:
      'A subtitle-sharing platform designed to enhance the movie-watching experience. Beyond offering extensive subtitle contributions and downloads, it allows users to search for movies, view detailed information including ratings, trailers, and related movie suggestions',
    live_url: 'https://open-sub.vercel.app',
    github: 'https://github.com/sshuvoo/open-subtitle',
    thumbnail: opensub,
  },
  {
    id: 3,
    title: 'Shadhin-Shop',
    description:
      'An e-commerce platform features a powerful search engine, advanced filtering. The platform supports social authentication and automatically sends invoice emails upon purchase. Customers can view detailed product pages, rate items, and utilize the wishlist features',
    live_url: 'https://shadhin-shop.vercel.app',
    github: 'https://github.com/sshuvoo/shadhin-shop',
    thumbnail: shadhinshop,
  },
  {
    id: 3,
    title: 'Pursuit of Card',
    description:
      'A multiplayer online card game built with Socket.IO for real-time gameplay. Features include seamless in-game chat, live interaction with players, and competitive card passing mechanics. Players can join games and experience dynamic rounds with an engaging, interactive interface',
    live_url: 'https://pursuit-of-card.vercel.app',
    github: 'https://github.com/sshuvoo/pursuit-of-card',
    thumbnail: squidGame,
  },
]
