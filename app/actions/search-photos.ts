'use server'

export const searchPhotos = async (query: string) => {
  const res = await fetch(
    `${process.env.UNSPLASH_API_URL}/search/photos/?query=${query}&per_page=40&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
    {
      headers: {
        'Accept-Version': 'v1',
      },
    }
  )
  const json = await res.json()
  if (!res.ok) throw json
  return json
}
