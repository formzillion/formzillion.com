# Formzillion

Instant backend for all your forms.

## Technologies Used

1. NextJS - Frontend & Backend Components
2. React - Frontend & Backend Components
3. TailwindCSS - Atomic CSS Framework
4. Postgres - Storage
5. Next Auth - Authentication
6. React Hook Form - Forms
7. Zod - Schema Validation
8. Tremor - Charts & Dashboard
9. Stripe - Billing & Invoice
10. Resend - Transactional Mails
11. Convertkit/Sendgrid - Marketing Mails
12. Framer Motion - Animations
13. Vercel - Hosting
14. TurboRepo - Mono repository administration

## Local Setup

1. Clone the code from the zs-website repository

```
git clone https://github.com/formzillion/formzillion.com.git
```

2. Install node modules using pnpm in the root folder

```
pnpm install
```

3. Add the following envs in .env file

```
SENDGRID_API_KEY=
RESEND_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
LOCAL_AUTH_URL=
```

4. Start the dev server

```
pnpm run dev --filter=formzillion
```
