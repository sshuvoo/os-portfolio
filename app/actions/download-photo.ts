'use server'

export const downloadPhoto = async (id: string) => {
  const res = await fetch(
    `${process.env.UNSPLASH_API_URL}/photos/${id}/download/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`,
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
