# Backend Deployment to Vercel

This guide explains how to deploy the LMS backend to Vercel.

## Prerequisites

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

## Deployment Steps

1. Navigate to the backend directory:
```bash
cd backend
```

2. Deploy to Vercel:
```bash
vercel
```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N** (for first deployment)
   - What's your project's name? `lms-backend` (or your preferred name)
   - In which directory is your code located? `./`

## Environment Variables

After deployment, you need to set environment variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add the following variables:

```
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production
```

## Important Notes

- The backend is configured as a serverless function
- Database connections are handled efficiently for serverless environments
- All routes are accessible via the Vercel domain
- CORS is configured to allow frontend requests

## API Endpoints

After deployment, your API will be available at:
- `https://your-project.vercel.app/health` - Health check
- `https://your-project.vercel.app/api/auth/*` - Authentication routes
- `https://your-project.vercel.app/api/courses/*` - Course routes

## Update Frontend Configuration

Update your frontend's `NEXT_PUBLIC_API_BASE_URL` environment variable to point to your Vercel deployment URL.

## Redeployment

For subsequent deployments, simply run:
```bash
vercel --prod
```

This will deploy directly to production.
