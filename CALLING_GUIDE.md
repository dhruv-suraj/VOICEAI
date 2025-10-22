# Vapi Voice Calling Setup Guide

Your application is now fully configured to make phone calls using Vapi AI!

## ✅ Configuration Status

- ✓ Public API Key: Configured
- ✓ Private API Key: Configured
- ✓ Assistant ID: Configured
- ✓ All dependencies installed

## 🚀 How to Make Calls

### Method 1: Manual Phone Number
1. Open the app at `http://localhost:5173/` (or `http://localhost:5174/`)
2. In the "Enter Phone Number" field, type a phone number (e.g., `+1-202-555-0173`)
3. Click the green phone button
4. The app will initiate a call via Vapi Server API

### Method 2: Upload CSV and Select Contact
1. Click "Upload CSV" button
2. Select your CSV file (format: `name,phone`)
3. Click on a contact from the loaded list to select it
4. Click the green phone button to call that contact

### Example CSV Format
```csv
name,phone
John Smith,+1-202-555-0173
Sarah Johnson,+1-202-555-0174
Michael Brown,+1-202-555-0175
```

## 📋 Features Available

### During a Call
- **Mute/Unmute** - Toggle microphone during the call
- **Call Duration** - Timer showing how long the call has been active
- **End Call** - Red phone button to end the call

### After a Call
- **Call Transcript** - View the transcript of the conversation
- **Copy Transcript** - Copy to clipboard with one click
- **Download Transcript** - Save as a `.txt` file
- **Call History** - View all previous calls with timestamps

## 🔑 API Keys Configuration

Your keys are stored in `.env.local`:
```
VITE_VAPI_PUBLIC_KEY=0769fdef-e82c-4ecb-9e7a-ecd17c1c02a9
VITE_VAPI_PRIVATE_KEY=49a00ffc-7d5a-44eb-9daa-a542fc334fcf
VITE_VAPI_ASSISTANT_ID=8bad5911-b649-4d41-b655-f7743afb7ff9
```

**⚠️ Security Notes:**
- Never commit `.env.local` to version control
- Keep your private key secret - it has billing access
- The `.env.local` file should be in `.gitignore`

## 🛠️ Technical Details

### API Endpoints Used
- **Vapi Server API**: `POST https://api.vapi.ai/call`
  - Used for making actual phone calls
  - Requires private API key
  - Supports phone number dialing

### Call Flow
1. User enters phone number or selects contact
2. App sends request to Vapi Server API with:
   - Assistant ID
   - Customer phone number (E.164 format)
3. Vapi initiates outbound call
4. App tracks call status and duration
5. Transcript captured after call ends

### Phone Number Format
Supports E.164 format and common variations:
- `+1-202-555-0173` ✓
- `+14155551234` ✓
- `(415) 555-1234` ✓
- `415-555-1234` ✓

## 📞 Testing the System

### Test Call Flow
1. Enter a valid phone number
2. Click the green phone button
3. Check the browser console (F12) for API responses
4. After call ends, transcript should appear

### Common Issues & Solutions

**Issue**: "Error: API key not configured"
- **Solution**: Ensure `.env.local` file has `VITE_VAPI_PRIVATE_KEY` set

**Issue**: "Error: HTTP 401"
- **Solution**: Check if private API key is correct in `.env.local`

**Issue**: "Error: HTTP 403"
- **Solution**: Verify your account has credits and phone numbers are configured in Vapi

**Issue**: Transcript not appearing
- **Solution**: The transcript appears after the call successfully completes

## 📊 File Structure

```
calling/
├── src/
│   ├── Dashboard.jsx          # Main dashboard component
│   ├── VoiceCall.jsx          # Voice call component with all features
│   ├── App.jsx
│   └── main.jsx
├── .env.local                 # Your API keys (NEVER commit)
├── .env.example               # Template for env vars
├── package.json
└── sample_contacts.csv        # Sample CSV for testing
```

## 🔗 Useful Links

- [Vapi Dashboard](https://dashboard.vapi.ai)
- [Vapi Documentation](https://docs.vapi.ai)
- [API Reference](https://docs.vapi.ai/reference)

---

**You're all set!** Start making calls with your Vapi assistant. 🎉
