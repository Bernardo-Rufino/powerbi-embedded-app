# Power BI Embedded Project

## Overview

This project demonstrates how to embed a Power BI report in a web application using Node.js for the backend and a simple frontend served with `http-server`. The backend handles generating the embed token required to authenticate and render the Power BI report.

## Project Structure

```
project-root/
├── backend/
│ ├── node_modules/
│ ├── package.json
│ ├── server.js
│ ├── .env
├── frontend/
│ ├── index.html
│ ├── scripts/
│ │ └── embed.js
└── README.md
```

## Prerequisites

- Node.js installed
- Power BI report and dataset
- Tenant ID, Client ID, and Client Secret for Azure AD app registration

## Setup

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Navigate to the `backend` directory and install dependencies:

    ```sh
    cd backend
    npm install
    ```

3. Create a `.env` file in the `backend` directory with the following content:

    ```plaintext
    TENANT_ID=<your-tenant-id>
    CLIENT_ID=<your-client-id>
    CLIENT_SECRET=<your-client-secret>
    GROUP_ID=<your-group-id>
    REPORT_ID=<your-report-id>
    DATASET_ID=<your-dataset-id>
    ROLES=Manager
    REPORT_NAME=<your-report-name>
    ```

4. Start the backend server:

    ```sh
    node server.js
    ```

5. Open the `index.html` file in a web browser to view the embedded Power BI report.

## Usage

1. Open the web application in a browser.
2. Enter a user email address in the provided text box.
3. Click the "Visualize" button to load the Power BI report for the specified user.

## Environment Variables

The following environment variables need to be set in the `.env` file located in the `backend` directory:

- `TENANT_ID`: Your Azure AD tenant ID.
- `CLIENT_ID`: The client ID of your Azure AD app.
- `CLIENT_SECRET`: The client secret of your Azure AD app.
- `GROUP_ID`: The ID of the Power BI workspace (group) containing the report.
- `REPORT_ID`: The ID of the Power BI report to embed.
- `DATASET_ID`: The ID of the dataset used by the report.
- `ROLES`: A comma-separated list of roles (e.g., `Region,Country` or just `Region`, without quotes).
- `REPORT_NAME`: The name of the report to be displayed as the title on the page.

## Notes

- Ensure that CORS is enabled if you encounter any cross-origin issues.
- The frontend is a simple HTML file with embedded JavaScript and can be extended as needed.
