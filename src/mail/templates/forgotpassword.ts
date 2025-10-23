export default function forgotEmailTemplate(email:string, content:any){
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-gdrzm5pdu-resend.vercel.app/static/twitch-logo.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-gdrzm5pdu-resend.vercel.app/static/twitch-icon-twitter.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-gdrzm5pdu-resend.vercel.app/static/twitch-icon-facebook.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <body style="background-color:#efeef1">
    <table
      border="0"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      align="center">
      <tbody>
        <tr>
          <td
            style="background-color:#efeef1;font-family:HelveticaNeue,Helvetica,Arial,sans-serif">
            <div
              style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
              data-skip-in-text="true">
              You updated the password for your FTA account
              <div>
              </div>
            </div>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="max-width:580px;margin:30px auto;background-color:#ffffff">
              <tbody>
                <tr style="width:100%">
                  <td>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding:30px">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              alt="Future Tech Addis"
                              src="https://futuretechaddis.com/wp-content/uploads/2025/04/logo-future-.png"
                              style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"
                              width="114" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="width:100%">
                      <tbody>
                        <tr>
                          <td>
                            <table
                              align="center"
                              width="100%"
                              border="0"
                              cellpadding="0"
                              cellspacing="0"
                              role="presentation">
                              <tbody style="width:100%">
                                <tr style="width:100%">
                                  <td
                                    data-id="__react-email-column"
                                    style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                                  <td
                                    data-id="__react-email-column"
                                    style="border-bottom:1px solid rgb(145,71,255);width:102px"></td>
                                  <td
                                    data-id="__react-email-column"
                                    style="border-bottom:1px solid rgb(238,238,238);width:249px"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="padding:5px 20px 10px 20px">
                      <tbody>
                        <tr>
                          <td>
                            <p
                              style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                              Hi
                              <!-- -->${email}<!-- -->,
                            </p>
                            <p
                              style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                              We received a request to reset the password for your account on <!-- -->
                              <!-- -->${new Date().toLocaleString()}<!-- -->. If this
                            </p>
                            <p
                              style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                              
                              <a
                                href=${content}
                                style="color:#067df7;text-decoration-line:none;text-decoration:underline"
                                target="_blank"
                                >reset your account password</a
                              >
                              
                            </p>
                            <p
                              style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                              This link is valid for 24 hours. If you did not request a password reset, please ignore this email. 
                              Your password will remain unchanged.<!-- -->
                              
                            <p
                              style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                              Still have questions? Please contact<!-- -->
                              <a
                                href="https://futuretechaddis.com/"
                                style="color:#067df7;text-decoration-line:none;text-decoration:underline"
                                target="_blank"
                                >Future Tech Addis Support</a
                              >
                            </p>
                            <p
                              style="font-size:14px;line-height:1.5;margin-top:16px;margin-bottom:16px">
                              Thanks,<br />Future Tech Addis Support Team
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
           
    <!--/$-->
  </body>
</html>`
}