import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY!)

export const sendEmail = async(to:string, from: string, subject: string, body: string) => {
    try {
        const data = await resend.emails.send({
            from: from,
            to: to,
            subject: subject,
            html: body,
          });
          return data
    } catch (error) {
        return error
    }
}