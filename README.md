# DecodeLabs — Cloud Infrastructure & Modern Software Engineering

DecodeLabs is a production-ready, cloud-focused technology web application and digital architectural artifact. It showcases high-availability AWS EC2/S3 infrastructure, Nginx ingress proxy routing, automated delivery pipeline blueprints, and modern full-stack TypeScript/React software engineering practices.

---

## 🚀 Key Features & Capabilities

- **Pipeline Stage Inspector**: In-depth specification inspector detailing technical parameters for each deployment phase.
- **Interactive Code Snippet Modal**: Copyable production configuration templates for `nginx.conf`, `docker-compose.yml`, `aws-s3-sync.yml`, and `server.ts`.
- **Responsive & Accessible UI**: Hand-crafted dark-mode UI with high contrast, focus-visible states, keyboard accessibility, and native `prefers-reduced-motion` support.
- **Route Fallback & Error Handling**: Custom HTTP 404 page styled with Terminal diagnostics.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + TypeScript (Strict Mode)
- **Build Tool**: Vite 6
- **Styling & Design System**: Tailwind CSS v4 + Custom Utility Glass Panels
- **Icons**: Lucide React
- **Animations & Micro-interactions**: Motion (`motion/react`)
- **Web Server Target**: Nginx + Ubuntu 24.04 LTS on AWS EC2
- **Asset Storage Target**: Amazon S3 (Static Web Hosting)

---

## 📂 Project Structure

```text
├── .env.example            # Environment variable template
├── index.html              # HTML entry point with SEO, OpenGraph & Twitter tags
├── metadata.json           # Platform applet metadata & capabilities
├── package.json            # Project dependencies & npm scripts
├── public/
│   ├── robots.txt          # Crawler instructions
│   └── sitemap.xml         # Search engine index sitemap
├── src/
│   ├── App.tsx             # Main application entry & 404 route fallback
│   ├── main.tsx            # React root DOM mount
│   ├── index.css           # Global Tailwind styling, custom scrollbars & grid utility
│   ├── types.ts            # TypeScript interfaces & types
│   ├── data/
│   │   └── content.ts      # Company info, capability cards & code snippets
│   └── components/
│       ├── Navbar.tsx      # Sticky header with active scroll highlighting
│       ├── Hero.tsx        # Animated hero section & dual CTAs
│       ├── About.tsx       # Core engineering pillars
│       ├── Technology.tsx  # Categorized technology capability cards
│       ├── FeaturedProject.tsx # Cloud deployment showcase & pipeline inspector
│       ├── CloudVisualizer.tsx # Terminal mockup & active server visualizer
│       ├── WhyDecodeLabs.tsx # Engineering ethos & principles
│       ├── Contact.tsx     # Form with real-time validation & status states
│       ├── Footer.tsx      # Footer branding & quick links
│       ├── CodeModal.tsx   # Code snippet viewing dialog
│       ├── NotFound.tsx    # Production 404 error page
│       └── ui/
│           ├── Button.tsx  # Micro-interactive button component
│           ├── Badge.tsx   # Status & tech pill badges
│           ├── TechCard.tsx # Animated capability card
│           └── SectionHeading.tsx # Reusable section titles
```

---

## 💻 Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The application runs on `http://localhost:3000`.

3. **Lint & typecheck**:
   ```bash
   npm run lint
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```
   Outputs static assets into the `dist/` directory.

---

## ☁️ Production Deployment Concept (AWS EC2 + Nginx)

For deploying this SPA behind Nginx on Ubuntu 24.04 LTS:

1. **Build Static Assets**:
   ```bash
   npm run build
   ```

2. **Sync to AWS EC2 or S3**:
   ```bash
   aws s3 sync dist/ s3://decodelabs-web-assets/ --delete
   ```

3. **Sample Nginx Configuration (`/etc/nginx/sites-available/decodelabs`)**:
   ```nginx
   server {
       listen 80;
       server_name decodelabs.cloud www.decodelabs.cloud;
       return 301 https://$host$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name decodelabs.cloud www.decodelabs.cloud;

       ssl_certificate /etc/letsencrypt/live/decodelabs.cloud/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/decodelabs.cloud/privkey.pem;

       root /var/www/decodelabs/dist;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
           expires 1y;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

---

## 🔒 Security Notes

- **Zero Hardcoded Credentials**: No secrets or private keys are stored in frontend source code or committed to git.
- **Environment Configuration**: Refer to `.env.example` for required runtime variable names.
- **Security Headers**: Production Nginx configuration includes HSTS, CSP, and X-Frame-Options headers.

---

## 📄 License

© DecodeLabs. All rights reserved.
