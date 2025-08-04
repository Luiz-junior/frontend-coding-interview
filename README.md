


https://github.com/user-attachments/assets/b73b456d-c266-4071-978c-3682b0d5c716


# Clever Pexels App
A Next.js application that allows users to log in and view photos from the Pexels API, with a "like" or "dislike" feature.

### How to Run

Clone the repository.
Install dependencies: npm install.
Create a .env.local file with your Pexels API key: NEXT_PUBLIC_PEXELS_API_KEY=Mz0iC21IFLz9HuN8ypIbJ54l8OuGnpW2IsVoQrYBEyagQXt1YeBEA7H0

Start the development server: npm run dev.
Access the app at http://localhost:3000.

### Features

Login: Fake authentication with email (user@email.com) and password (123).
All Photos: Displays 10 photos from the Pexels API with "like" or "dislike" options.
Responsiveness: Mobile-friendly layout using Tailwind CSS.
Unit Tests: Basic unit tests with Jest and React Testing Library.

### Project Structure

/components: Reusable React components.
/lib: Authentication logic and Pexels API integration.
/tests: Unit tests.
/context: Authentication context management.
/types: TypeScript definitions.

### Testing
Run tests with: npm test.

Coverage can be checked with: npm run test:coverage.

Tests cover key components SignInForm, PhotoCard, and PhotoList.

## For Production
To make this app production-ready, I would:

Real Authentication: Integrate with JWT or Firebase for secure authentication.
API Caching: Implement caching with next/cache for Pexels API calls.
Security: Add CSRF protection and cookie validation.
Image Optimization: Use next/image with dynamic sizes for better performance.
Accessibility: Ensure WCAG compliance (e.g., ARIA labels).
CI/CD: Set up GitHub Actions pipelines for automated testing and deployment on Vercel.

#### Note: 
I couldn't access dev mode in Figma so the spaces won't be exactly the same but I tried to make it as close as possible.
