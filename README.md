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

- Node.js (version 14.x or later)
- npm (Node package manager)

## Setup

### Backend

1. Navigate to the backend directory and install dependencies:

    ```bash
    cd backend
    npm install
    ```

2. Create a `.env` file in the `backend` directory and add the following environment variables:

    ```plaintext
    TENANT_ID=your-tenant-id
    CLIENT_ID=your-client-id
    CLIENT_SECRET=your-client-secret
    GROUP_ID=your-group-id
    REPORT_ID=your-report-id
    DATASET_ID=your-dataset-id
    ROLES=Role1,Role2,AnotherRole
    ```

3. Start the backend server:

    ```bash
    npm start
    ```

### Frontend

1. Navigate to the frontend directory and serve the files using `http-server`:

    ```bash
    cd frontend
    npx http-server -p 8000
    ```

2. Open a web browser and navigate to:

    ```
    http://localhost:8000
    ```

## Code Details

### Backend (`server.js`)

- The backend uses Express.js to create a simple server.
- It includes routes to generate the Power BI embed token using Azure AD credentials.
- It uses `node-fetch` to make HTTP requests to Azure AD and Power BI APIs.
- CORS is enabled to allow requests from the frontend.
- Environment variables are loaded from a `.env` file using `dotenv`.
- Roles for Power BI embedded token are configured through the `ROLES` environment variable.
- A `/getConfig` endpoint provides `reportId` and `groupId` to the frontend.

### Frontend (`embed.js`)

- The frontend JavaScript fetches the embed token from the backend and uses it to embed the Power BI report.
- It fetches the `reportId` and `groupId` from the backend `/getConfig` endpoint.
- It uses the Power BI JavaScript client library to handle the embedding process.
- Users can input their email address and click "Visualize" to render the report.

## Common Issues

### CORS Errors

If you encounter CORS errors, ensure that the backend server is properly configured to allow requests from your frontend origin. The provided code uses the `cors` middleware to handle this.

### Access Token Issues

Ensure that your Azure AD credentials and Power BI workspace details are correctly set. Verify the tokens and IDs being used.

## License

This project is licensed under the MIT License.
