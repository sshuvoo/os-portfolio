'use server'

export const getPhotos = async () => {
  const res = await fetch(
    `${process.env.UNSPLASH_API_URL}/photos/?per_page=40&client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
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
