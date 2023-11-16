import nodemailer from "nodemailer"

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "f633e59dba7a94",
    pass: "7ff8ab35e86c20"
  }
});


export const emailRegistro = async ({nombre,email,token}) => {
  await transport.sendMail({
    from: "APV",
    to: email,
    subject: "Comprueba tu cuenta en APV",
    html: `
        <p>Hola ${nombre}, comprueba tu cuenta, ingresa al siguiente enlace: </p>
        <a href="http://127.0.0.1:5173/confirmar-cuenta/${token}">Comprueba tu cuenta aqui</a>
        <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `
  })
}


export const emailOlvidePassword = async ({nombre,email,token}) => {
  await transport.sendMail({
    from: "APV",
    to: email,
    subject: "Comprueba tu cuenta en APV",
    html: `
        <p>Hola ${nombre}, reestablece tu password a travez del siguiente enlace: </p>
        <a href="http://127.0.0.1:5173/nuevo-password/${token}">Reestablece tu password aqui</a>
        <p>Si tu no solicitaste esto, puedes ignorar este mensaje</p>
    `
  })
}