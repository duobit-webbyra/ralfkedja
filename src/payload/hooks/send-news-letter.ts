import payload from 'payload'
import { Resend } from 'resend'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

const resend = new Resend(process.env.RESEND_API_KEY!)

export const sendNewsletterHook = async ({ doc, operation, req }: any): Promise<void> => {
  console.log(
    '[Hook] Triggas för nyhetsbrev, doc:',
    doc.id,
    'status:',
    doc.status,
    'operation:',
    operation,
  )

  if (doc.status !== 'sent') {
    console.log('[Hook] Avbryter, inte update eller status inte sent')
    return
  }

  if (!doc.sendTo || doc.sendTo.length === 0) {
    console.log('[Hook] Ingen kategori vald, avbryter')
    return
  }

  const contentHTML = convertLexicalToHTML({ data: doc.content })

  console.log(
    '[Hook] Hämtar prenumeranter för kategorier:',
    doc.sendTo.map((cat: any) => cat.id || cat),
  )

  // Hämta prenumeranter som matchar valda kategorier
  let subscribers
  try {
    subscribers = await req.payload.find({
      collection: 'subscribers',
      where: {
        and: [{ categories: { in: doc.sendTo.map((cat: any) => cat.id || cat) } }],
      },
      limit: 1000,
    })
    console.log('[Hook] Hittade prenumeranter:', subscribers.totalDocs)
  } catch (err) {
    console.error('[Hook] Fel vid hämtning av prenumeranter:', err)
    return
  }

  const unsubscribeBase = `${process.env.NEXT_PUBLIC_APP_URL}/nyhetsbrev-avregistrering/`

  for (const sub of subscribers.docs) {
    console.log('[Hook] Skickar mejl till:', sub.email)
    try {
      await resend.emails.send({
        from: process.env.EMAIL_USER!,
        to: sub.email,
        subject: doc.subject,
        html: `
          ${contentHTML}
          <hr />
          <p style="font-size:12px;">Du får detta mejl eftersom du är prenumerant.
          <a href="${unsubscribeBase}${sub.unsubscribeToken}">Avsluta prenumeration</a></p>
        `,
      })
      console.log('[Hook] Skickat till:', sub.email)
    } catch (err) {
      console.error('[Hook] Fel vid skick av mejl till', sub.email, err)
    }
  }

  console.log('[Hook] Klart med utskick')
}
