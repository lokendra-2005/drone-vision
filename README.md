 HEAD
# VillageVision AI - Drone Feature Extraction

AI-powered feature extraction from drone imagery for village infrastructure mapping.

## 🎯 What It Does

Upload drone images and automatically detect:
- 🏠 Building footprints (RCC, Tiled, Tin, Others)
- 🛣️ Road networks
- 💧 Water bodies
- ⚡ Key infrastructure (transformers, tanks, wells)

## 🚀 Quick Start

### 1. Install Dependencies

**Windows (Easy):**
```bash
install-backend.bat
install-frontend.bat
```

**Manual:**
```bash
cd backend && pip install -r requirements.txt && cd ..
cd frontend && npm install && cd ..
```

### 2. Start Application

**Windows (Easy):**
```bash
start-backend.bat    # Terminal 1
start-frontend.bat   # Terminal 2
```

**Manual:**
```bash
# Terminal 1
cd backend
python -m uvicorn main:app --reload --port 8000

# Terminal 2
cd frontend
npm run dev
```

### 3. Open Browser

```
http://localhost:5173
```

## 📋 Requirements

- Python 3.8+
- Node.js 16+
- 2GB RAM minimum
- Windows/Linux/Mac

## 🔧 Troubleshooting

**Installation issues?**
```bash
python diagnose.py
```

**Need help?** See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

## 📚 Documentation

- **[QUICK-START.md](QUICK-START.md)** - Get started in 5 minutes
- **[README-SETUP.md](README-SETUP.md)** - Detailed setup guide
- **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues and solutions
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture

## 🏗️ Architecture

```
Frontend (React)  →  Backend (FastAPI)  →  AI Model (PyTorch)
  Port 5173            Port 8000              Segmentation
```

- **Frontend**: React + Vite + Leaflet for interactive maps
- **Backend**: FastAPI REST API with image processing
- **AI**: PyTorch segmentation model (demo version included)

## 📁 Project Structure

```
project/
├── backend/              # Python FastAPI backend
│   ├── main.py          # API server entry point
│   ├── routes/          # API endpoints
│   ├── models/          # PyTorch models
│   ├── utils/           # Helper functions
│   └── data/            # Storage (auto-created)
├── frontend/            # React frontend
│   ├── src/
│   │   ├── pages/      # Page components
│   │   ├── components/ # UI components
│   │   └── api/        # API client
│   └── package.json
├── start-backend.bat    # Start backend (Windows)
├── start-frontend.bat   # Start frontend (Windows)
├── diagnose.py         # Diagnostic tool
└── README.md           # This file
```

## 🎨 Features

- ✅ Drag-and-drop image upload
- ✅ Real-time AI inference
- ✅ Interactive map viewer with toggleable layers
- ✅ Color-coded segmentation masks
- ✅ Bounding box detection
- ✅ Area measurements (square meters)
- ✅ Confidence scores
- ✅ Accuracy reports
- ✅ Export-ready results

## 🔬 How It Works

1. **Upload**: User uploads drone image via web interface
2. **Process**: Backend receives image and runs PyTorch inference
3. **Detect**: AI model segments image into feature classes
4. **Analyze**: System generates masks, bounding boxes, and statistics
5. **Display**: Frontend shows interactive map with color-coded overlays

## 📊 Current Accuracy

- **Demo Model**: 70-75% semantic accuracy (area-based)
- **Strengths**: Road area mapping (90%), building area (75%)
- **Weaknesses**: Object counting (40%), water detection (shadows)
- **Target**: 95% with trained model on labeled data

## 🚧 Roadmap

- [ ] Train custom model on labeled village imagery
- [ ] Improve object counting accuracy
- [ ] Add GeoJSON export
- [ ] Support for larger images (tiling)
- [ ] Batch processing
- [ ] Cloud deployment

## 🛠️ Development

**Backend:**
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**API Docs:**
```
http://localhost:8000/docs
```

## 📝 API Endpoints

- `POST /api/images` - Upload image
- `POST /api/images/{id}/infer` - Run inference
- `GET /api/images/{id}/results` - Get results
- `GET /api/report/{id}` - Get report

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

- **Issues**: Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Setup**: See [README-SETUP.md](README-SETUP.md)
- **Architecture**: See [ARCHITECTURE.md](ARCHITECTURE.md)

## 🎓 Credits

Built with:
- FastAPI (backend)
- React + Vite (frontend)
- PyTorch (AI model)
- Leaflet (maps)
- Tailwind CSS (styling)

---

**Ready to start?** Run `install-backend.bat` and `install-frontend.bat`, then `start-backend.bat` and `start-frontend.bat`!
=======
# 🛰 Drone Vision AI

Computer vision system for extracting features from drone imagery and aerial footage.

---

## 🚀 Overview
Drone Vision AI is a project focused on analyzing aerial images captured by drones to detect objects, features, and patterns using computer vision and AI.

This project is part of my AI & Robotics portfolio.

---

## 🧠 Features
- Aerial image processing  
- Object detection from drone view  
- Feature extraction  
- Image analysis pipeline  
- Real-time processing (planned)

---

## 🛠 Tech Stack
- Python  
- OpenCV  
- NumPy  
- Computer Vision  
- AI/ML (future integration)

---

## 📂 Project Structure
>>>>>>> 23f1650f6a06e052a7d8fae7d48243062b0c93b9
