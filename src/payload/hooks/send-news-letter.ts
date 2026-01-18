import payload from 'payload'
import { Resend } from 'resend'
import { convertLexicalToHTML } from '@payloadcms/richtext-lexical/html'

export const sendNewsletterHook = async ({ doc, operation, req }: any): Promise<void> => {
  if (!process.env.RESEND_API_KEY) {
    console.error('[Hook] RESEND_API_KEY not set, skipping newsletter send')
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  if (doc.status !== 'sent') {
    return
  }

  if (!doc.sendTo || doc.sendTo.length === 0) {
    return
  }

  const contentHTML = convertLexicalToHTML({ data: doc.content })

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
  } catch (err) {
    return
  }

  const unsubscribeBase = `${process.env.NEXT_PUBLIC_APP_URL}/nyhetsbrev-avregistrering/`

  for (const sub of subscribers.docs) {
    try {
      await resend.emails.send({
        from: 'Nyhetsbrev - Ralf Kedja <noreply@mail.ralfkedja.se>',
        to: sub.email,
        replyTo: 'Ralf Kedja <ralked@hotmail.com>',
        subject: doc.subject,
        html: `
          ${contentHTML}
          <hr style="margin:20px 0;" />

          <p style="font-size:12px;color:#666;">
            Du får detta mejl eftersom du registrerat dig för mitt nyhetsbrev.
            Om du vill avsluta prenumerationen kan du klicka på länken nedan:
            <br />
            <a href="${unsubscribeBase}${sub.unsubscribeToken}" style="color:#1a73e8;">Avsluta prenumeration</a>
          </p>
        `,
      })
    } catch (err) {}
  }
}
