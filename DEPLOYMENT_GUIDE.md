# Email System Deployment Guide

## Overview
The contact form uses a Vercel Serverless Function for sending emails via Gmail SMTP.

## Environment Variables Setup

### Local Development
Your `.env` file is already configured:
```
MAIL_USER=cheturshankar2002@gmail.com
MAIL_PASS=aupubqlsjvyplmph
```

### Vercel Deployment
1. Go to your Vercel Project Dashboard
2. Navigate to **Settings → Environment Variables**
3. Add these two variables:
   - Key: `MAIL_USER` | Value: `cheturshankar2002@gmail.com`
   - Key: `MAIL_PASS` | Value: `aupubqlsjvyplmph`

4. Make sure variables are available in:
   - Production
   - Preview
   - Development

## How It Works

### API Endpoint: `/api/contact`
- **Method**: POST
- **Location**: `api/contact.ts`
- **Required Fields**:
  - `fullName` (string)
  - `email` (string)
  - `phone` (string)
  - `message` (string)

### Response
**Success (200)**:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error (400/500)**:
```json
{
  "error": "Missing required fields" | "Failed to send email"
}
```

## Frontend Implementation
- Located in: `src/components/home/Contact.tsx`
- Form fields: Name, Email, Phone, Message
- Uses native toast notifications for feedback
- Loading state prevents duplicate submissions
- Clears form after successful submission

## Gmail Security Notes
1. **App Password**: The `MAIL_PASS` is a 16-character Gmail App Password (not your actual Gmail password)
2. **Two-Factor Authentication**: Must be enabled on Gmail account
3. **Less Secure Apps**: Not needed with App Password method
4. **Important**: Never commit `.env` to git. The file is already in `.gitignore`

## Testing
1. Locally: `npm run dev` → Test form submission
2. Preview: Deploy to preview branch on Vercel
3. Production: Normal deployment will use environment variables

## Troubleshooting

### Email Not Sending
1. Verify environment variables are set in Vercel Dashboard
2. Check email credentials are correct
3. Ensure Gmail account has 2FA enabled
4. Review server logs in Vercel Dashboard

### 500 Error
- Likely Gmail authentication failure
- Verify MAIL_USER and MAIL_PASS in Vercel env vars
- Check Gmail account for "Suspicious activity" blocks

## Architecture Benefits
✅ No client-side email libraries  
✅ No secrets exposed to frontend  
✅ Vercel Serverless compatible  
✅ Automatic scaling  
✅ No server maintenance needed  
✅ Built-in error handling  
