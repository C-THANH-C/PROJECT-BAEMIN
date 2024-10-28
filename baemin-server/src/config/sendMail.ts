import * as nodemailer from "nodemailer"

export const sendMail = (to ,subject, text)=>{
let configMail=nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:"lvthanh1314@gmail.com",
    pass:"bezydevvlqsnangb"
  }
})


let infoMail= {
    from:"lvthanh1314@gmail.com",
    to,
    subject,
    html:text
}
return configMail.sendMail(infoMail,error=>error)
}