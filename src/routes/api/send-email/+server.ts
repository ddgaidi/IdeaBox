import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';

interface Attachment {
  name: string;
  type: string;
  data: string;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'itisgame.site@gmail.com',
    pass: 'uqao sbax gaoe vszi',
  },
});

export const POST: RequestHandler = async ({ request }) => {
  const { pseudo, email, message, attachments } = await request.json();

  const emailContent = `
    Pseudo : ${pseudo}
    E-mail : ${email}

    Message :
    ${message}
  `;

  const mailOptions: nodemailer.SendMailOptions = {
    from: 'itisgame.site@gmail.com',
    to: 'Support@itisgame.fr',
    subject: 'Email du Support',
    text: emailContent,
  };

  if (attachments && attachments.length > 0) {
    mailOptions.attachments = attachments.map((attachment: Attachment) => {
      const base64Data = attachment.data.split(';base64,').pop();
      
      return {
        filename: attachment.name,
        content: base64Data,
        encoding: 'base64'
      };
    });
  }

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
};