import { cookies, headers } from 'next/headers' // Use cookies to fetch the user session
import { NavDefault, NavMobile } from './nav'
import style from './nav.module.scss'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function NavWrapper() {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('payload-token')?.value

  let user = null

  const payload = await getPayload({ config })

  if (authToken) {
    try {
      const { user: me } = await payload.auth({ headers: await headers() })
      user = me
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  return (
    <header className="sticky top-0 z-[500] bg-tertiary-250">
      {/* Render NavDefault for larger screens */}
      <div className={style.navDefault}>
        <NavDefault user={user} />
      </div>

      {/* Render NavMobile for smaller screens */}
      <div className={style.navMobile}>
        <NavMobile user={user} />
      </div>
    </header>
  )
}
