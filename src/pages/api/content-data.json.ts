export async function POST({params, request}) {
    const data = await request.formData()
    console.log(data)
    return new Response(
      JSON.stringify({
        name: 'Astro',
        url: 'https://astro.build/'
      })
    )
  }