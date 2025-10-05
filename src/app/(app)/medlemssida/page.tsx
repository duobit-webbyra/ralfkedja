import { redirect } from 'next/navigation'
import { getUser } from '@/app/providers/getUser'
import VideosList from '@/app/components/members-page/video_list'
import Container from '@/app/components/essentials/Container'
import NewsServer from '@/app/components/members-page/news_server'
import DefaultHero from '@/app/components/hero/default-hero'

export default async function Page() {
  const user = await getUser()

  if (!user) {
    redirect('/logga-in')
  }

  return (
    <div className="relative ">
      <DefaultHero
        title="Medlemssida"
        description="Välkommen till medlemssidan där du kan hitta exklusiva videos och nyheter!"
      />

      <section>
        <Container className="py-16 flex flex-col gap-12">
          <h1>Hej, {user.name}! </h1>
          <VideosList sliceList={true} />
        </Container>
      </section>
      <section className="bg-[#F9f9f9]">
        <Container className="py-16 flex flex-col gap-8 ">
          <NewsServer sliceList />
        </Container>
      </section>
    </div>
  )
}
