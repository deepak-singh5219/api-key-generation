import sendgrid from "@sendgrid/mail";
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

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