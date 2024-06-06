// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const tenantId = process.env.TENANT_ID;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const groupId = process.env.GROUP_ID;
const datasetId = process.env.DATASET_ID;
const reportId = process.env.REPORT_ID;
const roles = process.env.ROLES.split(',');

async function getApiAccessToken() {
    const fetch = (await import('node-fetch')).default;
    const tokenResponse = await fetch(`https://login.microsoftonline.com/${tenantId}/oauth2/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: clientId,
            client_secret: clientSecret,
            resource: 'https://analysis.windows.net/powerbi/api'
        })
    });
    const tokenData = await tokenResponse.json();
    return tokenData.access_token;
}

async function generateEmbedToken(apiAccessToken, username) {
    const fetch = (await import('node-fetch')).default;
    const embedTokenResponse = await fetch(`https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports/${reportId}/GenerateToken`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiAccessToken}`
        },
        body: JSON.stringify({
            accessLevel: 'View',
            identities: [
                {
                    username: username,
                    roles: roles,
                    datasets: [datasetId]
                }
            ]
        })
    });
    const embedTokenData = await embedTokenResponse.json();
    return embedTokenData.token;
}

app.post('/getEmbedToken', async (req, res) => {
    const username = req.body.username;

    try {
        const apiAccessToken = await getApiAccessToken();
        const embedToken = await generateEmbedToken(apiAccessToken, username);
        res.json({ embedToken });
    } catch (error) {
        console.error('Error generating embed token:', error);
        res.status(500).send('Error generating embed token');
    }
});

app.get('/getConfig', (req, res) => {
    res.json({ reportId, groupId });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
