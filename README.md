# School Website Frontend

This is the frontend for the School Website built with React and Vite.

## Deployment to Render

### Prerequisites
- Your backend is already deployed on Render at `https://schoolwebsiteback.onrender.com`
- You have a GitHub repository for this frontend project

### Steps to Deploy

1. **Build the Project for Production**
   ```bash
   npm run build
   ```

2. **Create a New Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Choose the branch you want to deploy

3. **Configure Build Settings**
   - **Runtime**: Node
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: 18 or latest LTS

4. **Set Environment Variables**
   In Render's Environment section, add:
   ```
   VITE_BACKEND_URL=https://schoolwebsiteback.onrender.com
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy your frontend
   - Once deployed, you'll get a URL like `https://your-frontend-name.onrender.com`

### Alternative: Deploy as Static Site

If you prefer to deploy as a static site (recommended for pure frontend):

1. **Create Static Site on Render**
   - Click "New" → "Static Site"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

3. **Set Environment Variables**
   ```
   VITE_BACKEND_URL=https://schoolwebsiteback.onrender.com
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Render will build and deploy your site

### Local Development

To run locally:
```bash
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` and connect to the backend via the environment variable.

### Environment Variables

- `VITE_BACKEND_URL`: URL of the deployed backend (defaults to `http://localhost:5000` for local development)

### Features

- Responsive design
- Contact form integration
- Gallery with image upload/delete
- User authentication
- Theme support

### API Integration

The frontend communicates with the backend through the following endpoints:
- `/api/users/login` - User login
- `/api/users/contact` - Contact form submission
- `/api/gallery/` - Gallery operations (GET, POST, DELETE)
