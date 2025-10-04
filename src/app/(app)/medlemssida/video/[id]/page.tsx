import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound, redirect } from 'next/navigation'
import { getUser } from '@/app/providers/getUser'
import Container from '@/app/components/essentials/Container'

type Params = Promise<{ id: string }>

export default async function VideoPage({ params }: { params: Params }) {
  const { id } = await params

  const user = await getUser()
  if (!user) {
    redirect('/logga-in')
  }

  const payload = await getPayload({ config })
  const video = await payload.findByID({
    collection: 'videos',
    id,
  })

  if (!video) {
    notFound()
  }

  const isValidUrl = (url: string) => {
    if (!url) return false
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const getYoutubeEmbedLink = (url: string) => {
    if (!isValidUrl(url)) return ''
    try {
      const urlObj = new URL(url)
      const videoId = urlObj.searchParams.get('v')
      if (!videoId) throw new Error('Invalid YouTube URL')
      return `https://www.youtube.com/embed/${videoId}`
    } catch {
      return ''
    }
  }

  return (
    <Container className="py-16">
      <div className="flex flex-col pb-6 gap-4">
        <h1 className="text-3xl! md:text-5xl!">{video.title}</h1>
        <p className="text-gray-700">{video.description}</p>
      </div>
      {isValidUrl(video.url) && getYoutubeEmbedLink(video.url) ? (
        <div className="w-full aspect-video relative rounded overflow-hidden shadow-lg">
          <iframe
            src={getYoutubeEmbedLink(video.url)}
            className="absolute inset-0 w-full h-full"
            title={video.title}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center aspect-video relative rounded overflow-hidden shadow-lg bg-black">
          <h3 className="text-white!">Videon är ej tillgänglig.</h3>
        </div>
      )}
    </Container>
  )
}
