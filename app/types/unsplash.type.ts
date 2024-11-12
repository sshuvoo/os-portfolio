export interface IPhoto {
  id: string
  slug: string
  alternative_slugs?: Record<string, string>
  created_at: string
  updated_at: string
  promoted_at?: string | null
  width: number
  height: number
  color: string
  blur_hash: string
  description?: string | null
  alt_description: string
  breadcrumbs?: string[]
  urls: PhotoUrls
  links: PhotoLinks
  likes: number
  liked_by_user: boolean
  topic_submissions?: Record<string, unknown>
  asset_type: string
}

interface PhotoUrls {
  raw: string
  full: string
  regular: string
  small: string
  thumb: string
  small_s3?: string
}

interface PhotoLinks {
  self: string
  html: string
  download: string
  download_location: string
}
