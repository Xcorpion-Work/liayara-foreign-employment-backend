import { rolePreview } from "./preview";

export const EMAIL_TYPES = {
    ADD_USER: "ADD_USER",
    FORGOT_PASSWORD: "FORGOT_PASSWORD",
    BULK_INVOICE_PAYMENTS: "BULK_INVOICE_PAYMENTS",
};

// Subject line generator
export const createSubjectToEmail = async (type: string, data: any) => {
    try {
        if (type === EMAIL_TYPES.ADD_USER) {
            return `Welcome to Liyara Foreign Employment, ${data.name}!`;
        }
        if (type === EMAIL_TYPES.FORGOT_PASSWORD) {
            return `Reset Your Password - Liyara Foreign Employment`;
        }
        console.error("Email type is not matching");
        return;
    } catch (e: any) {
        console.error("Error generating subject: ", e.message);
        return;
    }
};

// Email body generator
export const createEmailBody = async (type: string, data: any) => {
    try {
        const loginUrl =
            process.env.NODE_ENV === "qa"
                ? "https://qa-lfe-app.xcorpion.xyz/login"
                : "https://lfe-app.xcorpion.xyz/login";
        const pinInputUrl =
            process.env.NODE_ENV === "qa"
                ? `https://qa-lfe-app.xcorpion.xyz/pin-input?uuid=${data.uuid}`
                : `https://lfe-app.xcorpion.xyz/pin-input?uuid=${data.uuid}`;
        const supportEmail =
            process.env.SUPPORT_EMAIL || "support@xcorpion.xyz";
        if (type === EMAIL_TYPES.ADD_USER) {
            const role = await rolePreview(data.role);
            return `
            ${getHeader("Welcome to Liyara Foreign Employment")}
            <tr>
                <td class="body-content">
                    <p>Dear ${data.name},</p>
                    <p>We are excited to welcome you to Liyara Foreign Employment! Your account has been successfully created.</p>
                    <br>
                    <p>Here is your login details</p>
                    <p>Email: ${data.email}</p>
                    <p>Phone: ${data.phone}</p>
                    <p>Role: ${role}</p>
                    <p>Password: ${data.password}</p>
                    <br>
                    <p>Please change your password immediately. Click here to <a href="${loginUrl}" style="color: #1a73e8;">login</a>.</p>
                    <br>
                    <p>If you have any questions, feel free to reach out to our support team at <a href="mailto:${supportEmail}">${supportEmail}</a>.</p>
                    <p>Thank you for joining us!</p>
                    <p>Best regards,</p>
                    <p><strong>The Liyara Foreign Employment Team</strong></p>
                </td>
            </tr>
            ${getFooter()}
            `;
        }
        if (type === EMAIL_TYPES.FORGOT_PASSWORD) {
            return `
    ${getHeader("Password Reset Request")}

    <tr>
      <td class="body-content" style="font-family: Arial, sans-serif; font-size: 14px; color: #333; padding: 20px;">
        <p style="margin-bottom: 16px;">Hi <strong>${data.username}</strong>,</p>

        <p style="margin-bottom: 16px;">We received a request to reset your password. Please use the recovery code below to proceed:</p>

        <div style="background-color: #f4f4f4; padding: 16px; border-radius: 8px; font-size: 18px; font-weight: bold; text-align: center; letter-spacing: 1px; margin-bottom: 24px;">
          ${data.recoveryCode}
        </div>

        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${pinInputUrl}" style="background-color: #1a73e8; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block;">
            Click here to enter recovery code
          </a>
        </div>

        <p style="margin-bottom: 16px;">If you did not request a password reset, you can safely ignore this email or <a href="mailto:support@xcorpion.xyz" style="color: #1a73e8; text-decoration: none;">contact our support team</a>.</p>

        <p style="margin-top: 32px;">Thank you,<br/><strong>The Liyara Foreign Employment Team</strong></p>
      </td>
    </tr>

    ${getFooter()}
  `;
        }
        return null;
    } catch (e: any) {
        console.error("Error generating email body: ", e.message);
        return `<p>An error occurred while generating this email.</p>`;
    }
};

// Header section
const getHeader = (title: string) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <style>
            body, table, td {
                font-family: Arial, sans-serif;
                font-size: 16px;
                color: #333;
            }
            .email-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border: 1px solid #ddd;
            }
            .header {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
            }
            .header img {
                max-width: 100px;
                height: auto;
            }
            .header h1 {
                margin: 10px 0;
                font-size: 24px;
            }
            .body-content {
                padding: 20px;
                margin-left: 20px;
                margin-right: 20px;
                text-align: left;
            }
        </style>
    </head>
    <body>
    <table class="email-container">
        <tr>
            <td class="header">
                <img src="cid:app-logo" alt="Liyara Foreign Employemnt Logo">
                <h1>${title}</h1>
            </td>
        </tr>
    `;
};

// Footer section
const getFooter = () => {
    return `
        <tr>
            <td class="footer" style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                <p>&copy; 2025 Wijekoon Distributors. All rights reserved.</p>
                <img src="cid:developer-logo" alt="Xcorpion Logo" style="max-width: 50px;">
            </td>
        </tr>
    </table>
    </body>
    </html>
    `;
};
