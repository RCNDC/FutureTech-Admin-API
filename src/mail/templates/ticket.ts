export default function TicketTemplate(fullName:string, email:string, phone:string){
    return `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; border-collapse: separate; border-radius: 12px; border: 1px solid #d1d5db; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);">
                    <tr>
                        <td bgcolor="#a855f7" style="padding: 20px 25px; border-radius: 12px 12px 0 0;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td valign="middle" style="padding-right: 12px;">
                                        <img src="https://futuretechaddis.com/wp-content/uploads/2025/04/logo-future-.png" alt="Future Tech Addis Logo" width="48" height="48" style="display: block; border: none;" />
                                    </td>
                                    <td valign="middle">
                                        <span style="color: #ffffff; font-size: 18px; font-weight: 800; line-height: 1.2;">Future Tech Addis Invitation Ticket</span>
                                        <br/>
                                        <span style="color: #d8b4fe; font-size: 14px; font-weight: 600; text-transform: uppercase;">November 28 - November 30</span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 25px 25px 15px;">
                            <p style="margin: 0; padding: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Your QR Code</p>
                            <img src="cid:qrcode.png" alt="QR Code" width="180" style="display: block; margin: 0 auto; max-width: 100%; height: auto; border: 1px solid #d1d5db; padding: 5px; border-radius: 4px;" />
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding: 0 25px;">
                            <div style="height: 1px; background-color: #e5e7eb; margin: 10px 0 20px;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 0 25px 25px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="width: 80px; font-size: 14px; font-weight: 100; text-transform: uppercase; color: #6b7280;">Name:</td>
                                                <td style="font-size: 14px; font-weight: 400; color: #1f2937; border-bottom: 1px dotted #d1d5db; padding-left: 8px;">${fullName}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="width: 80px; font-size: 14px; font-weight: 100; text-transform: uppercase; color: #6b7280;">Email:</td>
                                                <td style="font-size: 14px; font-weight: 400; color: #1f2937; border-bottom: 1px solid #d1d5db; padding-left: 8px;">${email}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="width: 80px; font-size: 14px; font-weight: 100; text-transform: uppercase; color: #6b7280;">Phone:</td>
                                                <td style="font-size: 14px; font-weight: 400; color: #1f2937; border-bottom: 1px solid #d1d5db; padding-left: 8px;">${phone}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>`

}