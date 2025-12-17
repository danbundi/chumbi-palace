import { Buffer } from "buffer";

export const generatePassword = () => {
  const now = new Date();

  const timestamp =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0") +
    String(now.getHours()).padStart(2, "0") +
    String(now.getMinutes()).padStart(2, "0") +
    String(now.getSeconds()).padStart(2, "0");

  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;

  const password = Buffer.from(
    `${shortcode}${passkey}${timestamp}`
  ).toString('base64');

  return { password, timestamp };
};
