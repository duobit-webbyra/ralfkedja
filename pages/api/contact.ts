import nodemailer from 'nodemailer';

export default async function ContactAPI(req: any, res: any) {
  const { name, email, message, phone, subject } = req.body;

  const user = process.env.EMAIL_USER;

  const data = {
    name,
    email,
    message,
    phone,
    subject,
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    const mail = await transporter.sendMail({
      from: user,
      to: 'marwinhormiz@gmail.com',
      replyTo: data.email,
      subject: data.subject,
      html: `
      <p> Namn: ${name}</p>
      <p> E-mail: ${email}</p>
      <p> Telefon: ${phone}</p>
      <p> Message: ${message}</p>
      `,
    });
    console.log('Message sent:', mail.messageId);

    return res.status(200).json({ message: 'success' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Kunde inte skicka mejl!' });
  }
}
