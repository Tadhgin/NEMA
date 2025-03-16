import nodemailer from "nodemailer";



const transporter = nodemailer.createTransport({

    service: "gmail",

    auth: {

        user: "your-email@gmail.com",

        pass: "your-password",

    },

});



export const sendEmail = async (to, subject, text) => {

    try {

        await transporter.sendMail({ from: "your-email@gmail.com", to, subject, text });

        console.log("Email sent successfully!");

    } catch (error) {

        console.error("Error sending email:", error);

    }

};