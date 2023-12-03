const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST || "smtp-relay.brevo.com",
            port: process.env.BREVO_PORT || 587,
            auth: {
                user: process.env.USER || "202101237@daiict.ac.in",
                pass: process.env.PASS || "T0QRcXEg6dhf3wIC",
            },
        });

        const mailOptions = {
            from: 'NewsAggregator<admin@test.com>',
            cc: "202101237@daiict.ac.in",
            to: email,
            subject: subject,
            html: body
        };

        await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email not sent:", error);
    }
};

module.exports = sendEmail;