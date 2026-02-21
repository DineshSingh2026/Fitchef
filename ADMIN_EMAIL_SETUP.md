# Admin email notification (early access signups)

When someone submits an email on the "Be Among the First" form, the admin can receive an email at **bodybank.fit369@gmail.com**.

## Enable it on Render

1. Open your **Fitchef** Web Service → **Environment**.
2. Add these variables (use your own Gmail and app password):

| Key | Value |
|-----|--------|
| `MAIL_USER` | Your Gmail address (e.g. `yourname@gmail.com`) |
| `MAIL_APP_PASSWORD` | Gmail App Password (not your normal password) |

### How to get a Gmail App Password

1. Go to [Google Account](https://myaccount.google.com) → **Security**.
2. Turn on **2-Step Verification** if it’s off.
3. Under **2-Step Verification**, open **App passwords**.
4. Create an app password for "Mail" and copy the 16-character password.
5. Paste that value into `MAIL_APP_PASSWORD` on Render.

3. **Save** (Render will redeploy). After that, each new early access signup will trigger an email to **bodybank.fit369@gmail.com**.

---

**Note:** To change the recipient address, edit `NOTIFY_EMAIL` in `server/lib/mail.js` and redeploy.
