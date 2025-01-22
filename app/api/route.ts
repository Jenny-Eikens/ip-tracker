export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const ipAddress = searchParams.get('ipAddress')
  const domain = searchParams.get('domain')

  const apiKey = process.env.IPIFY_API_KEY

  if (!apiKey) {
    return new Response('API key is missing', { status: 500 })
  }

  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}${ipAddress ? `&ipAddress=${ipAddress}` : ''}${domain ? `&domain=${domain}` : ''}`

  try {
    const res = await fetch(url)
    if (!res.ok) {
      return new Response('Failed to fetch data', { status: res.status })
    }
    const data = await res.json()
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching data:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
