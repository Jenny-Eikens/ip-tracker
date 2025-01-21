export async function GET(ipAddress: string | null) {
  const apiKey = 'at_G48npurWzNfjLru1HJ1OIcFYE6THY'
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipAddress}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      alert('Failed to fetch data')
      throw new Error('Failed to fetch data')
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}
