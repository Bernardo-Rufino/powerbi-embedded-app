// frontend/scripts/embed.js
async function getEmbedToken(username) {
    const response = await fetch('http://localhost:3000/getEmbedToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    if (!response.ok) {
        throw new Error('Failed to fetch embed token');
    }

    const data = await response.json();
    return data.embedToken;
}

async function getConfig() {
    const response = await fetch('http://localhost:3000/getConfig');
    if (!response.ok) {
        throw new Error('Failed to fetch configuration');
    }
    return response.json();
}

async function embedPowerBIReport(username) {
    try {
        const embedToken = await getEmbedToken(username);
        const config = await getConfig();
        const embedUrl = `https://app.powerbi.com/reportEmbed?reportId=${config.reportId}&groupId=${config.groupId}`;

        const powerBiConfig = {
            type: 'report',
            tokenType: window['powerbi-client'].models.TokenType.Embed,
            accessToken: embedToken,
            embedUrl: embedUrl,
            id: config.reportId,
            permissions: window['powerbi-client'].models.Permissions.All,
            settings: {
                panes: {
                    filters: { visible: false },
                    pageNavigation: { visible: false }
                },
                bars: {
                    statusBar: { visible: false }
                }
            }
        };

        const embedContainer = document.getElementById('embedContainer');
        
        // Explicitly remove the existing report
        if (window.powerbi.embeds.length > 0) {
            window.powerbi.reset(embedContainer);
        }

        // Embed the report with the new config
        const report = window.powerbi.embed(embedContainer, powerBiConfig);

        report.off('loaded');
        report.on('loaded', function () {
            console.log('Report loaded successfully');
        });

        report.off('error');
        report.on('error', function (event) {
            console.error('Error while loading report: ', event.detail);
        });

        report.off('rendered');
        report.on('rendered', function () {
            console.log('Report rendered successfully');
        });

    } catch (error) {
        console.error('Error during embedding process: ', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const visualizeButton = document.getElementById('visualize-button');
    visualizeButton.addEventListener('click', function () {
        const emailInput = document.getElementById('email-input').value;
        if (emailInput) {
            embedPowerBIReport(emailInput);
        } else {
            alert('Please enter an email address');
        }
    });
});
