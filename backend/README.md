# Lifetwin Backend (Azure SQL + Azure OpenAI)

This small backend exposes endpoints to store prompts and responses in Azure SQL and uses Azure OpenAI to generate responses.

## Quick start

1. Copy `.env.example` to `.env` and fill in your Azure SQL connection details and Azure OpenAI keys.
2. Install:
   ```
   cd backend
   npm install
   ```
3. Run in dev:
   ```
   npm run dev
   ```
4. API endpoints:
   - POST /api/messages
     - body: `{ "prompt": "Hello" }`
   - GET /api/messages

## Production notes
- `synchronize: true` is set for convenience. Switch to migrations for production usage.
- Add proper authentication and rate-limiting before exposing publicly.
- Ensure Azure SQL firewall rules allow the app's IP or use private endpoints.
- Store secrets in environment variables or your cloud provider's secret store.
