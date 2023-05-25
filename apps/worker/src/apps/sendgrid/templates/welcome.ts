export const welcomeTemplate = ({ formFiller = "", ownerName = "" }) => {
  return `<html lang="en">

  <head></head>
  <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Power up your workflows<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
  </div>
  <table style="background-color:#f6f9fc;padding:10px 0;font-family:&#x27;Open Sans&#x27;, &#x27;HelveticaNeue-Light&#x27;, &#x27;Helvetica Neue Light&#x27;, &#x27;Helvetica Neue&#x27;, Helvetica, Arial, &#x27;Lucida Grande&#x27;, sans-serif" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
    <tbody>
      <tr>
        <td>
          <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;background-color:#ffffff;border:1px solid #f0f0f0;padding:45px">
            <tr style="width:100%">
              <td>
                <img data-id="react-email-img" alt="Formzillion" src="https://zqpkoahtapmwaejzvraa.supabase.co/storage/v1/object/sign/logo/fz_logo_full.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJsb2dvL2Z6X2xvZ29fZnVsbC5wbmciLCJpYXQiOjE2ODIwNjMxMzUsImV4cCI6MTcxMzU5OTEzNX0.Y_7vrkFt7phdqCs6ze17_TP5_JBt9aBq7Qc_-8R8BMU&amp;t=2023-04-21T07%3A45%3A34.945Z" width="150" height="30" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto" />
                <p style="font-size:16px;line-height:24px;margin:16px 0;color:#404040;text-align:left">Hey ${formFiller},</p>
                <p style="font-size:16px;line-height:24px;margin:16px 0;color:#404040;text-align:left">I'm ${ownerName}, from Formzillion.</p>
                <p style="font-size:16px;line-height:24px;margin:16px 0;color:#404040;text-align:left">Our goal is to give developers like you the ability to effortlessly create powerful forms without backend APIs.</p>
                <p style="font-size:16px;line-height:24px;margin:16px 0;color:#404040;text-align:left">Feel free to reply to me if you have any questions. You can also <a target="_blank" style="color:#2754C5;text-decoration:underline;font-size:16px" href="https://cal.com/team/formzillion/call">schedule a call</a> , or join our <a target="_blank" style="color:#2754C5;text-decoration:underline;font-size:16px" href="https://discord.gg/JtBAxBr2m4">Discord server</a> to connect with the community and our team.</p>
                <p style="font-size:16px;line-height:24px;margin:16px 0;color:#404040;text-align:left">We hope you enjoy using Formzillion!</p>
                <p style="font-size:16px;line-height:24px;margin:0;color:#333;text-align:left">Best,</p>
                <p style="font-size:16px;line-height:24px;margin:0;color:#333;text-align:left">${ownerName}</p>
                <p style="font-size:16px;line-height:24px;margin:16px 0;color:#404040;text-align:left">Team, Formzillion</p>
                <p style="font-size:12px;line-height:16px;margin:16px 0;color:#8898aa;font-style:italic">If you don't want me to contact you again, please just let me know and I'll update your preferences.</p>
                <hr data-id="react-email-hr" style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                <p data-id="react-email-text" style="font-size:12px;line-height:24px;margin:16px 0;display:flex;justify-content:center;color:#8898aa">© 2023 Formzillion</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

</html>`;
};

export default welcomeTemplate;
