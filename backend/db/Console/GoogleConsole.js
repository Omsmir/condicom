import { google } from 'googleapis'
import dotenv from "dotenv"
import {writeFile} from "fs/promises"
dotenv.config()

const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:8080/oauth2callback"
// Redirect URI
);

export const GenerateGoogleToken = async (req, res) => {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: ['https://mail.google.com/'],
    });
    console.log(authUrl);
    res.send(`<a href="${authUrl}">Authorize App</a>`);
}




export const GetGoogleToken = async  (req, res) => {
    const code = req.query.code ;
    if (code) {
        const { tokens } = await oAuth2Client.getToken(code);
        oAuth2Client.setCredentials(tokens);
        console.log('Tokens:', tokens.refresh_token);
        res.send('Authorization successful! Check your terminal for tokens.');

        const filePath = './backend/db/Console/credentials.json';
        await writeFile(filePath, JSON.stringify(tokens, null, 2));
    } else {
        res.send('No authorization code found.');
    }
}




