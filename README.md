# ⚡ wokovn — Software Engineer Portfolio

Personal Developer Portfolio of **Nguyễn Anh Khoa (@wokovn)**, Software Engineer specializing in Full-Stack Distributed Systems, Multi-Agent AI, and High-Throughput Backends.

🌐 **Live URL**: [wokovn.id.vn](https://wokovn.id.vn) (or [wokovn.github.io](https://wokovn.github.io))

---

## 🚀 Core Architectural Highlights

- **ArkNet: Scalable Distributed Social Platform**
  - High-concurrency microservices backend benchmarked under **350 concurrent VUs** (87.2 RPS peak throughput).
  - Time-decayed trending algorithm with atomic Redis Lua scripts.
  - 9 BullMQ background worker queues with Kubernetes HPA auto-scaling.
- **News Summary & Vietnamese Regional TTS System**
  - Multi-service pipeline with Brave Scraper, Gemini LLM summarization, and GPU-accelerated PyTorch vnTTS neural inference.
  - Regional dialect adaptability (Bắc - Hà Nội, Trung - Huế, Nam - Sài Gòn).
- **Enterprise Multi-Agent & Security Systems (@ ISB Vietnam)**
  - Lead/Helper Multi-Agent decomposition engine (5.8x data rows analyzed).
  - HashiCorp Vault wrapped DEK encryption with HMAC blind indexing.
  - ReDoS mitigation cutting regex parsing latency from 3-18s down to <200ms.
- **Interactive Developer Terminal HUD**
  - Integrated `Cmd+K` command-line palette with real-time commands (`projects`, `metrics`, `skills`, `hire`).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Styling**: Cyber-refined dark theme, glassmorphism, responsive grid layout.
- **CI/CD & Deployment**: GitHub Actions automated pipeline to GitHub Pages with custom domain support.

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/wokovn/wokovn.github.io.git
cd wokovn.github.io

# Install dependencies
npm install

# Start local development server
npm run dev
```

Build for production:
```bash
npm run build
```

---

## 📬 Contact

- **Email**: [anhkhoa.nguyen4405@gmail.com](mailto:anhkhoa.nguyen4405@gmail.com)
- **LinkedIn**: [linkedin.com/in/ng-anh-khoa/](https://www.linkedin.com/in/ng-anh-khoa/)
- **GitHub**: [@wokovn](https://github.com/wokovn)
