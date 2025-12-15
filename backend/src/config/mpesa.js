import axios from "axios";
import 'dotenv/config';

const getMpesaToken = async () => {
    const consumerKey = process.env.MPESA_CONSUMER_KEY
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;

    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                headers: {
                    Authorization: `Basic ${auth}`
                }
            }
        );

        return response.data.access_token;
    } catch (error) {
        console.log("Mpesa Auth Error:", error.response?.data || error.message);
        throw new Error ("Failed to generate Mpesa access token manze.");
    }
};

export { getMpesaToken };

