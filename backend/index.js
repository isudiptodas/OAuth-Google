import "dotenv/config"
import { OAuth2Client } from "google-auth-library"
import express from 'express'
import cors from 'cors'

const app = express();
const client = new OAuth2Client(process.env.GCP_CLIENT_ID, process.env.GCP_CLIENT_SECRET, "postmessage");

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST"]
}));

app.post(`/api/auth/google`, async (req, res) => {
    const { credential } = req.body;

    console.log(credential);

    try {
        const tokenResponse = await client.getToken(credential);
        const idToken = tokenResponse.tokens.id_token;
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GCP_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        return res.status(200).json({
            success: true,
            message: "User verified"
        });
    } catch (err) {
        console.log(`Error validating user -> ${err}`)
    }
});

app.listen(5000, () => {
    console.log(`Server started`);
});