const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	host: "live.smtp.mailtrap.io", //"smtp.aruba.it",
	port: 587,
	secure: false, // Use `true` for port 465, `false` for all other ports
	auth: {
		user: "api",
		pass: "87559aeca4b4e3836406711dd67e0a89",
	},
	tls: {
		rejectUnauthorized: false, // Optional, depending on Aruba.it's configuration
	}
});

exports.sendEmail = async (email) => {

	try {
		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: 'info@audasynth.com',
			to: email,
			subject: "Verify Account!",
			text: "Verify Account!",
			html: "<p>Hello,<br>Thank you for choosing Audasynth! Please verify your email by clicking the link below.<br>\
					<button onClick='https://app.audasynth.com/login'>Verify Email</button></p>"
		});
		console.log("Message sent: %s", info.messageId);
		return { status: 'success', 'messageId': info.messageId }
	} catch (err) {
		console.log(err);
		return err;
	}
}