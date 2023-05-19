# Formzillion

The open-source form infrastructure for everyone.

## Technologies Used

1. NextJS - Frontend & Backend Components
2. React - Frontend & Backend Components
3. TailwindCSS - Atomic CSS Framework
4. Postgres - Storage
5. Supabase Auth - Authentication
6. React Hook Form - Forms
7. Zod - Schema Validation
8. Tremor - Charts & Dashboard
9. Stripe - Billing & Invoice
10. Resend - Transactional Mails
11. Convertkit/Sendgrid - Marketing Mails
12. Vercel - Hosting
13. TurboRepo - Mono repository administration

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
pnpm run dev
```
This will start all the apps like website, webapp and docs.
If you wanted to run only one of that use the following command.

```
pnpm run dev --filter=webapp
```
