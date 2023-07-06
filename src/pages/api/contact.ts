import { marked } from 'marked';
import { dateTime } from '../../utils/utils';
import nodemailer from 'nodemailer';
import type { APIRoute } from 'astro';

export const post: APIRoute = async ({ request }) => {
    const data = await request.formData();
    const name = data.get('name');
    const email = data.get('email');
    const message = data.get('message');

    //@ts-ignore
    const marked_data = marked.parse(message);

    const mailContent = `
    <style>
      body {
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        border: 3px solid #000;
        font-size: 1.5rem;
        padding: 1rem;
        margin: 1rem;
      }
    </style>
    <h1>${name} sent you a mail!</h1>
    <p>
      This Mail was given to Noob Mailer at ${dateTime()}.
    </p>
    <p>You can contact ${name} at ${email}</p>
    <p>
      This is the message:
    </p>
    ${marked_data}
    <p>
      Always checking for new mails,
      <br />
      Noob Mailer
    </p>
  `;

    if (!name || !email || !message) {
        return new Response(
            JSON.stringify({
                message: 'Missing required fields',
            }),
            { status: 400 }
        );
    }

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: import.meta.env.MAIL_EMAIL,
            pass: import.meta.env.MAIL_PASSWORD,
        },
    });

    const mailData = {
        from: import.meta.env.MAIL_EMAIL,
        to: 'noobscience123@gmail.com', // This is my public email address
        subject: `Hey Noob! You've got mail from ${name}`,
        html: mailContent,
    };

    try {
        await transporter.sendMail(mailData);
        return new Response(
            JSON.stringify({
                message: 'Your Mail was sent successfully! Ishan will get back to you soon! You will get a email from noobscience@duck.com',
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({
                message: 'Error sending mail',
            }),
            { status: 500 }
        );
    }
};
