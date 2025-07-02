# 🌿 EcoLoop – Refill. Return. Reduce.

EcoLoop is a React-based Single Page Application (SPA) designed to promote sustainable shopping. It empowers users to reduce plastic waste and CO₂ emissions through refillable packaging, scheduled returns, and gamified rewards.

## 🚀 Features

### 🏠 Home Page
- Eco mission statement and stats
- CTA buttons: Find Refill Station, Start Return

### 📍 Refill Station Finder
- Mock station list (Walmart locations)
- QR code generation for refill products
- Select refill type and location

### 🔁 Return Scheduler
- Input packaging ID or barcode
- Group pickup calendar (with Sunday bonus points)
- Earn LoopPoints for every return

### 📦 PackLite Checkout
- Choose eco-packaging options (minimal, reusable, grouped)
- Emissions comparison chart (Coming Soon)

### 📊 My Loop Dashboard
- Bar chart: Plastic saved, CO₂ saved, Points
- Earned badges and milestones

### 👤 Profile Page
- User preferences and mock leaderboard

---

## 💻 Tech Stack

| Layer        | Tools                             |
|--------------|-----------------------------------|
| Frontend     | React.js, React Router            |
| Styling      | Tailwind CSS                      |
| Animation    | Framer Motion                     |
| Charts       | Chart.js                          |
| QR Codes     | qrcode.react                      |
| Calendar     | react-calendar                    |
| Data         | Static JSON mock data             |
| Deployment   | Netlify or GitHub Pages           |

---

## 📁 Folder Structure

```
ecoloop/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── data/
│   ├── styles/
│   ├── App.jsx
│   └── index.js
├── tailwind.config.js
└── README.md
```

---

## 📦 Setup Instructions

### 1. Clone or Unzip the Project
```bash
cd ecoloop
npm install
```

### 2. Start the App
```bash
npm start
```

### 3. Optional – Tailwind Setup
Ensure Tailwind is configured in `tailwind.config.js` and included via `@tailwind` directives in `src/styles/tailwind.css`.

---

## ✅ TODO / Future Improvements

- Leaflet map for refill stations
- Real-time leaderboard and auth
- Responsive mobile layout
- API integration for real data

---

## 🧑 Author

Made with ❤️ for sustainability and learning.

---

## 📄 License

MIT – Free to use and modify.
