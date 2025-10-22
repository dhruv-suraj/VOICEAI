# Debugging Phone Calls - Troubleshooting Guide

## 🔍 How to Check for Errors

### Step 1: Open Browser Developer Tools
1. Open your app: `http://localhost:5173/`
2. Press **F12** or **Right-click → Inspect** to open Developer Tools
3. Go to the **Console** tab

### Step 2: Try to Make a Call
1. Enter a phone number (e.g., `+1-202-555-0173`)
2. Click the green phone button
3. Look at the console for detailed logs

## 📋 What You Should See

### Success Flow
```
Starting call with:
Assistant ID: 8bad5911-b649-4d41-b655-f7743afb7ff9
Phone Number: +1-202-555-0173
API Key: 49a00ffc7d...

Call payload: {
  "assistantId": "8bad5911-b649-4d41-b655-f7743afb7ff9",
  "customer": {
    "number": "+1-202-555-0173"
  }
}

Response status: 200
Response data: { "id": "call-123...", "status": "queued", ... }
Call initiated! Connecting...
```

### Common Errors & Solutions

## ❌ Error 1: "API key not configured"
**Problem**: No API key found

**Solution**:
1. Check `.env.local` file exists with:
   ```
   VITE_VAPI_PRIVATE_KEY=your_key_here
   VITE_VAPI_ASSISTANT_ID=your_assistant_id
   ```
2. Restart the dev server (Ctrl+C and npm run dev)
3. Refresh browser (Ctrl+R)

---

## ❌ Error 2: "HTTP 401: Unauthorized"
**Problem**: API key is invalid or expired

**Solution**:
1. Go to https://dashboard.vapi.ai
2. Check your API Keys section
3. Copy your **Private Key** (not public key)
4. Update `.env.local` with correct key:
   ```
   VITE_VAPI_PRIVATE_KEY=correct_key_here
   ```
5. Restart dev server and refresh browser

---

## ❌ Error 3: "HTTP 400: Bad Request"
**Problem**: Missing required fields in API request

**Solution**:
This could mean:
1. **Missing Phone Number**: Make sure `customer.number` is set
   - Check console shows: `Phone Number: +1-202-555-0173`
2. **Invalid Assistant ID**: Verify assistant exists in Vapi dashboard
   - Go to https://dashboard.vapi.ai/assistants
   - Copy correct ID

---

## ❌ Error 4: "HTTP 403: Forbidden"
**Problem**: Your account doesn't have permission or credits

**Solution**:
1. Check your Vapi account has **credits**
   - Go to https://dashboard.vapi.ai
   - Check "Credits" or "Billing" section
2. Ensure you have **phone numbers configured**
   - Go to Phone Numbers section
   - Should have at least one outbound number
3. Verify assistant is **published/active**

---

## ❌ Error 5: "Phone Number Invalid"
**Problem**: Phone number format is incorrect

**Solution**:
Use **E.164 format** (international standard):
- ✅ `+1-202-555-0173`
- ✅ `+14155551234`
- ✅ `+44-20-7946-0958`
- ❌ `202-555-0173` (missing country code)
- ❌ `15551234` (missing +1)

**Check Vapi Dashboard for Valid Number Format**

---

## ✅ Verification Checklist

Use this checklist to verify everything is set up:

- [ ] **API Key Valid**
  - Console log shows: `API Key: 49a00ffc7d...`
  - Not empty or undefined

- [ ] **Assistant ID Valid**
  - Console log shows: `Assistant ID: 8bad5911-b649-4d41-b655-f7743afb7ff9`
  - Matches one in https://dashboard.vapi.ai/assistants

- [ ] **Phone Number Format Correct**
  - Console log shows: `Phone Number: +1-202-555-0173` (with country code)
  - Is not empty

- [ ] **Vapi Account Has Credits**
  - Check https://dashboard.vapi.ai/billing
  - Should show available credits

- [ ] **Phone Number Configured**
  - Check https://dashboard.vapi.ai/phone-numbers
  - Should have at least one number
  - Should support outbound calls

- [ ] **Assistant Published**
  - Check https://dashboard.vapi.ai/assistants
  - Your assistant should be active/published
  - Should have voice configured

---

## 🔧 Advanced Debugging

### Check Network Tab
1. Open DevTools → **Network** tab
2. Try to make a call
3. Look for request to `api.vapi.ai/call`
4. Click on it to see:
   - **Request Headers**: Should have `Authorization: Bearer your_key`
   - **Request Body**: Should have assistantId and customer.number
   - **Response**: Should show 200 status or error details

### Log Raw Response
The console will show the full response from Vapi. Example error responses:

```javascript
// Missing credits
{
  "message": "Insufficient credits",
  "code": "INSUFFICIENT_CREDITS"
}

// Invalid assistant
{
  "message": "Assistant not found",
  "code": "ASSISTANT_NOT_FOUND"
}

// No phone number configured
{
  "message": "No outbound phone number configured",
  "code": "NO_PHONE_NUMBER"
}
```

---

## 📞 Test Different Phone Numbers

Try these test numbers:
```
+1-202-555-0173
+1-415-555-1234
+44-20-7946-0958
```

If calls work with one but not others, the issue is likely phone number format.

---

## 🆘 Still Not Working?

If you're still getting errors after checking everything:

1. **Take a screenshot** of the console error
2. **Check these in Vapi dashboard**:
   - Your private API key is correct
   - Your assistant ID exists
   - You have phone numbers configured
   - Your account has credits
   - Your assistant is published

3. **Try from Vapi Dashboard** directly to verify:
   - Go to https://dashboard.vapi.ai/test
   - Try making a test call
   - If it works there, the issue is in your UI code
   - If it fails there, the issue is in your Vapi account setup

4. **Common Vapi Setup Issues**:
   - Account not verified
   - No payment method on file
   - Phone numbers not in correct region
   - Assistant not properly configured with voice

---

## 💡 Pro Tips

### 1. Use Console Logging
The updated code logs everything. Check console for:
- ✅ API key format
- ✅ Request payload
- ✅ Response status
- ✅ Error details

### 2. Test with Simple Number
Start with a basic format:
```
+1-202-555-0173
```

Not:
```
(202) 555-0173
202-555-0173
2025550173
```

### 3. Check Vapi Credits
Even if everything else is correct, you need active credits to make calls.

### 4. Restart After Changes
- Change `.env.local`?
- Kill dev server (Ctrl+C)
- Run `npm run dev`
- Refresh browser

---

## 📊 Status Codes Reference

| Code | Meaning | Solution |
|------|---------|----------|
| 200 | Success | Call initiated |
| 400 | Bad Request | Check phone number format & fields |
| 401 | Unauthorized | Check API key validity |
| 403 | Forbidden | Check credits & permissions |
| 404 | Not Found | Check assistant ID exists |
| 429 | Rate Limited | Wait and retry |
| 500 | Server Error | Try again later |

---

**Need more help? Check the browser console first - that's where the real error details are!** 🔍
