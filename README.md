# Login Application - Next.js

A modern, responsive login application built with Next.js, React, and Tailwind CSS. This application features email/password authentication, password recovery, sign-up functionality, and Google OAuth integration support.

## Features

- ✅ **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices
- ✅ **Email & Password Login**: Secure login form with validation
- ✅ **Remember Me**: Checkbox to remember user credentials
- ✅ **Forgot Password**: Password reset flow
- ✅ **Sign Up**: New account creation
- ✅ **Google OAuth**: Integration-ready for Google authentication
- ✅ **Modern UI**: Beautiful gradient design with smooth transitions
- ✅ **Form Validation**: Email and password validation on the client side
- ✅ **Error Handling**: User-friendly error messages
- ✅ **TypeScript**: Fully typed for type safety

## Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios (optional, for API calls)
- **Icons**: React Icons (optional)

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment variables (optional):
Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Project Structure

```
intershipcode/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── globals.css         # Global styles and Tailwind imports
│   ├── page.tsx            # Login page
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard page (after login)
│   ├── forgot-password/
│   │   └── page.tsx        # Password reset page
│   └── signup/
│       └── page.tsx        # Sign up page
├── components/
│   └── LoginForm.tsx       # Reusable login form component
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
└── next.config.js         # Next.js configuration
```

## Features Overview

### Login Page
- Email/Mobile input field
- Password input field
- Remember Me checkbox
- Forgot Password link
- Login button with loading state
- Google OAuth button
- Sign Up link

### Form Validation
- Email format validation
- Password presence validation
- Field requirement validation

### Responsiveness
- Mobile-first design
- Tablet and desktop optimization
- Flexible layout with proper spacing
- Touch-friendly button sizes

## API Integration

To connect the login form to your backend, modify the `handleSubmit` function in [components/LoginForm.tsx](components/LoginForm.tsx):

```typescript
const response = await fetch('/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});

const data = await response.json();
if (data.success) {
  // Handle successful login
  window.location.href = '/dashboard';
}
```

## Google OAuth Setup

To enable Google OAuth:

1. Create a Google OAuth application in [Google Cloud Console](https://console.cloud.google.com/)
2. Add your client ID to environment variables
3. Implement Google OAuth logic in the `handleGoogleLogin` function

## Customization

### Change Logo
Update the logo placeholder in [components/LoginForm.tsx](components/LoginForm.tsx):
```tsx
<span className="text-2xl font-bold text-blue-600">Your Logo</span>
```

### Change Color Scheme
Modify Tailwind classes in the components (currently uses blue color scheme):
- Primary: `blue-500`, `blue-600`
- Replace with your desired colors (e.g., `purple-500`, `red-500`)

### Change Redirect URLs
Update redirect URLs in form handlers:
- After login: `/dashboard`
- After signup: `/`
- Password reset: `/forgot-password`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

MIT

## Support

For any issues or questions, please create an issue in the repository.

---

**Happy coding!** 🚀
