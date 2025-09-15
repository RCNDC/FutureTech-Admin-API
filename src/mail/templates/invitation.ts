export const Invitation = (email:string, qrcode:string)=>{
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-dismp1ngz-resend.vercel.app/static/vercel-logo.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-dismp1ngz-resend.vercel.app/static/vercel-user.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-dismp1ngz-resend.vercel.app/static/vercel-arrow.png" />
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-dismp1ngz-resend.vercel.app/static/vercel-team.png" />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--$-->
  </head>
  <body
    style='margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;background-color:rgb(255,255,255);padding-left:8px;padding-right:8px;font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'>
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
            style='margin-left:auto;margin-right:auto;margin-top:auto;margin-bottom:auto;background-color:rgb(255,255,255);padding-left:8px;padding-right:8px;font-family:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'>
            <div
              style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"
              data-skip-in-text="true">
              Join Alan on Vercel
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
              style="margin-left:auto;margin-right:auto;margin-top:40px;margin-bottom:40px;max-width:465px;border-radius:0.25rem;border-width:1px;border-color:rgb(234,234,234);border-style:solid;padding:20px">
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
                      style="margin-top:32px">
                      <tbody>
                        <tr>
                          <td>
                            <img
                              alt="Vercel Logo"
                              height="37"
                              src="https://react-email-demo-dismp1ngz-resend.vercel.app/static/vercel-logo.png"
                              style="margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;display:block;outline:none;border:none;text-decoration:none"
                              width="40" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h1
                      style="margin-left:0;margin-right:0;margin-top:30px;margin-bottom:30px;padding:0;text-align:center;font-weight:400;font-size:24px;color:rgb(0,0,0)">
                      Join <strong>Enigma</strong> on <strong>Vercel</strong>
                    </h1>
                    <p
                      style="font-size:14px;color:rgb(0,0,0);line-height:24px;margin-top:16px;margin-bottom:16px">
                      Hello
                      <!-- -->${email}<!-- -->,
                    </p>
                    <p
                      style="font-size:14px;color:rgb(0,0,0);line-height:24px;margin-top:16px;margin-bottom:16px">
                      <strong>Alan</strong> (<a
                        href="mailto:${email}"
                        style="color:rgb(37,99,235);text-decoration-line:none"
                        target="_blank"
                        >alan.turing@example.com</a
                      >) has invited you to the <strong>Future Tech Addis Event</strong>.
                    </p>
                    <table
                      align="center"
                      width="100%"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation">
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
                      style="margin-top:32px;margin-bottom:32px;text-align:center">
                      <tbody>
                        <tr>
                          <td>
                            ${qrcode}
                            
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <hr
                      style="margin-left:0;margin-right:0;margin-top:26px;margin-bottom:26px;width:100%;border-width:1px;border-color:rgb(234,234,234);border-style:solid;border:none;border-top:1px solid #eaeaea" />
                    <p
                      style="color:rgb(102,102,102);font-size:12px;line-height:24px;margin-top:16px;margin-bottom:16px">
                      This invitation was intended for<!-- -->
                      <span style="color:rgb(0,0,0)">${email}</span>. This
                      invite was sent from
                      <span style="color:rgb(0,0,0)">Future Tech Addis</span>
                      If you were not expecting this invitation, you can ignore
                      this email. If you are concerned about your account&#x27;s
                      safety, please reply to this email to get in touch with
                      us.
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
</html>
`
}