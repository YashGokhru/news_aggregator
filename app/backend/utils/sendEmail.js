const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.BREVO_PORT,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
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