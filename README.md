# PhotoToSTL Pro

**Turn images into print-ready 3D sculptures.**

By ESWARAN A/L Padmanathan | Eshan Creations

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Setup

1. Copy `.env.example` to `.env.local` and fill in your API keys
2. Set up Supabase: paste `supabase/schema.sql` into your Supabase SQL Editor
3. Install backend Python deps: `cd backend-python && pip install -r requirements.txt`

## AI Integration

Connect these APIs in the `/api` routes:
- **Meshy API** (`/api/generate-3d`) – Image to 3D generation
- **Tripo API** – Alternative 3D generation
- **Hunyuan3D / TripoSR** – Self-hosted generation
- **Blender Python** (`backend-python/`) – Mesh repair + export

## Disclaimer

AI-generated models may need manual review. Printability repair reduces errors but cannot guarantee every printer result. Use front, side, and back images for best accuracy.
