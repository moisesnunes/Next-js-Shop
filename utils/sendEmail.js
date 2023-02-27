import nodemailer from "nodemailer";
import { google } from "googleapis";

const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const {
  CLIENT_ID_EMAIL,
  CLIENT_SECRET_EMAIL,
  CLIENT_SECRET_EMAIL_TOKEN,
  SENDER_EMAIL_ADDRESS,
} = process.env;

const oauth2Client = new OAuth2(
  CLIENT_ID_EMAIL,
  CLIENT_SECRET_EMAIL,
  CLIENT_SECRET_EMAIL_TOKEN,
  OAUTH_PLAYGROUND
);

// send email
export const sendEmail = (to, url, txt, subject) => {
  oauth2Client.setCredentials({
    token: CLIENT_SECRET_EMAIL_TOKEN,
  });
  const accessToken = oauth2Client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: SENDER_EMAIL_ADDRESS,
      clientId: CLIENT_ID_EMAIL,
      clientSecret: CLIENT_SECRET_EMAIL,
      refreshToken: CLIENT_SECRET_EMAIL_TOKEN,
      accessToken,
    },
  });
  const mailOptions = {
    from: SENDER_EMAIL_ADDRESS,
    to: to,
    subject: subject,
    html: "",
  };
  smtpTransport.sendMmail(mailOptions, (err, infos) => {
    if(err) return err;
    return infos;
  });
};
