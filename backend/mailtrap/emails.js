import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.log("Error sending verification", error.message);
    throw new Error(`Error sending verification email:${error}`);
  }
};

export const sendWelcomeEmail = async (name, email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "5e371ed7-06a9-49d8-be70-88d174b3c301",
      template_variables: {
        company_info_name: "Auth Company",
        name: name,
      },
    });
    console.log("Email Sent Successfully", response);
  } catch (error) {
    console.log("Error Sending Email", error);
    throw new Error("Error Sending the email", error);
  }
};

export const sendforgotPasswordEmail = async (email, resetLink) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetLink),
      category: "Password Reset",
    });
  } catch (error) {
    console.log("Error Sending password reset email", error);
    throw new Error(`Error sending password reset email:${error}`);
  }
};

export const sendResetSuccessfullEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfull",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
  } catch (error) {
    console.log("Error in resetPassword", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
