# GameSunite Dev Deployment

## Local development

1. Start databases:
   ```bash
   pnpm docker:up
   ```
2. Copy env files:
   - `backend/.env.example` -> `backend/.env`
   - `gamers-unite/.env.example` -> `gamers-unite/.env.local`
3. Install and seed:
   ```bash
   pnpm install
   pnpm seed
   ```
4. Run apps:
   ```bash
   pnpm dev
   ```

## Vercel (frontend)

- Root directory: `gamers-unite`
- Set `NEXT_PUBLIC_API_BASE_URL` to your Railway API URL + `/api/v1`
- Set `NEXT_PUBLIC_SITE_URL` to your Vercel URL

## Railway (backend)

- Service root: `backend`
- Add MongoDB and Redis plugins or external URLs
- Set `CLIENT_URL` to your Vercel URL
- Set JWT secrets and optional Cloudinary credentials

## Smoke test

- `GET /api/v1/health` returns `status: ok`
- Register and login from `/register` and `/login`
- `/cafes`, `/search`, and `/reviews` load data from MongoDB
- Authenticated review publish works on `/reviews`
