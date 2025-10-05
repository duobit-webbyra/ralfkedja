interface CourseInquiryEmailProps {
  name: string
  email: string
  phone: string
  options: string[]
  preferred_location: string
  message: string
}

export function generateContactEmail({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}) {
  return `<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ny Kundkontakt</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px;">
  <h2>Ny Kundkontakt</h2>
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
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Ämne:</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">${subject}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border: 1px solid #ddd;"><strong>Meddelande:</strong></td>
      <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
    </tr>
  </table>
</body>
</html>`
}

export function generateCourseInquiryEmail({
  name,
  email,
  phone,
  options,
  preferred_location,
  message,
}: CourseInquiryEmailProps) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>Ny intresseanmälan för kurser</h2>
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
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Intresserad av:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${options.join('<br>')}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Plats:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${preferred_location}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Övrigt meddelande:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${message}</td>
        </tr>
      </table>
    </div>
  `
}
