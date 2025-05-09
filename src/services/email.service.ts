import {
    createEmailBody,
    createSubjectToEmail,
    EMAIL_TYPES,
} from "../helpers/emailHandler";
import nodemailer from "nodemailer";

export const sendEmail = async (type: any, to: any, data: any) => {
    try {
        const emailBody = await createEmailBody(type, data);
        const subject = await createSubjectToEmail(type, data);

        if (!emailBody) {
            console.error("Email body is empty");
            return;
        }

        const transporter = nodemailer.createTransport({
            host: process.env.ZOHO_HOST,
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: process.env.ZOHO_USER,
                pass: process.env.ZOHO_PASS,
            },
            tls: {
                rejectUnauthorized: false, // Temporary fix for SSL
            },
        });

        const mailOptions = {
            from: `Xcorpion <${process.env.ZOHO_USER}>`,
            to: to,
            subject: subject,
            html: emailBody,
            attachments: [
                {
                    filename: "wd.png",
                    path: "https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/lfe%2Flfe-removebg-preview.png?alt=media&token=09f9197d-2c45-4fef-b406-38e2d2b6cb9c",
                    cid: "app-logo", // Make sure to match this in <img src="cid:app-logo">
                },
                {
                    filename: "xcorpion.png",
                    path: "https://firebasestorage.googleapis.com/v0/b/wijekoon-distributors.appspot.com/o/lfe%2Fxcorpion.png?alt=media&token=c95e036b-8af5-4815-b18f-44ba11a408ec",
                    cid: "developer-logo", // Match this in <img src="cid:developer-logo">
                },
            ],
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.messageId);
    } catch (e: any) {
        console.error("Error sending email:", e.message);
    }
};

export const createNotificationsForNewUserAdding = async (data: any) => {
    try {
        const to = data.email;
        const type = EMAIL_TYPES.ADD_USER;
        const emailData = {
            name: data.username,
            email: data.email,
            phone: data.phone,
            role: data.role,
            password: data.mailPw,
        };
        return await sendEmail(type, to, emailData);
    } catch (e: any) {
        console.error(e.message);
    }
};

export const createNotificationsForBulkInvoicesPayments = async (data: any) => {
    try {
        const emails = [data.supplierData.email, ...data.additionalEmails];
        const type = EMAIL_TYPES.BULK_INVOICE_PAYMENTS;
        const emailPromises = emails.map(async (e: any) => {
            return await sendEmail(type, e, data);
        });

        await Promise.all(emailPromises);
    } catch (e: any) {
        console.error(e.message);
    }
};
