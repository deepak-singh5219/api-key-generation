import sendgrid from "@sendgrid/mail";
const SENDGRID_API_KEY = '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'
sendgrid.setApiKey(SENDGRID_API_KEY);

async function sendEmail(req, res) {
    const {email, accessToken} = req.body;
    console.log("Email:",email);

    const msg = {
        to: email,
        from: 'ds038177@gmail.com',
        subject:'API ACCESS KEY',
        html:`<div>Here is your API Access Key : ${accessToken}</div>`
      };

  try {
    await sendgrid.send(msg);
    return res.status(200).json({ error: "" });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

}

export default sendEmail;