# Login page — `/login`

**As a** viewer, **I want to** sign in, **so that** I can watch movies and see my own history.

## On this page
- Logo and a dark, centered sign-in card
- Email input and password input (both labeled)
- **Sign In** (primary, red, full-width) → `/`
- Show/hide password toggle

## Rules & errors
- Both fields required. Empty field → inline message under it ("Enter your email" / "Enter your password").
- Wrong credentials → "Incorrect email or password" above the button. The email stays filled in; the password is cleared.
- Logged-out users who open any other page are redirected here. After login, permissions end: the user can watch movies and see their history.

## Done when
- [ ] Valid login goes to Home without a full page reload
- [ ] Wrong credentials show the error and keep the email
- [ ] Opening `/history` while logged out redirects to `/login`
