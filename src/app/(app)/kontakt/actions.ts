'use server';

import nodemailer from 'nodemailer';

import  config  from '@payload-config';
import { getPayloadHMR } from '@payloadcms/next/utilities';

export async function sendEmail(formData: FormData) {
  const payload = await getPayloadHMR({ config });
  const data = await payload.findGlobal({
    slug: 'contact',
  });

  if (!data || !data.email) throw new Error('Failed to get contact information');

  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const subject = formData.get('subject');
  const message = formData.get('message');

  if (!email || !subject) return false;

  const user = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASS;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: password,
    },
  });

  try {
    transporter.sendMail({
      from: user,
      to: data.email,
      replyTo: email.toString(),
      subject: subject.toString(),
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Kontaktinformation</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Namn:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>E-mail:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Telefon:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;"><strong>Meddelande:</strong></td>
            <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
          </tr>
        </table>
      </div>
    `,
    });
  } catch (e) {
    throw new Error('Failed to send email');
  }
}
