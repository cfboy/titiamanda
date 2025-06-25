# Titi Amanda - Babysitter Services Website

Professional babysitter services website built with Tailwind CSS.

## 🚀 Development Setup

### Prerequisites
- Node.js installed on your computer
- npm (comes with Node.js)

### Installation
1. Install dependencies:
```bash
npm install
```

### 🔧 Development Commands

#### For Development (Auto-rebuild on changes):
```bash
npm run dev
```
**OR**
```bash
npm start
```

This will:
- Watch your HTML and CSS files for changes
- Automatically rebuild `assets/css/tailwind.css` when you save changes
- Keep running in the background

#### For Production Build:
```bash
npm run build
```

This will:
- Build and minify the CSS for production
- Create an optimized version for deployment

## 📁 Project Structure

```
titiamanda/
├── src/
│   └── input.css          # Tailwind CSS source file
├── assets/
│   └── css/
│       └── tailwind.css   # Generated CSS (auto-created)
├── index.html             # Main HTML file
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Project dependencies and scripts
```

## 🛠️ Usage Instructions

1. **Start development mode:**
   ```bash
   npm run dev
   ```

2. **Make changes to your HTML or CSS**

3. **The CSS will automatically rebuild** - no need to manually run build commands!

4. **For production deployment:**
   ```bash
   npm run build
   ```

## ✨ Features

- ✅ Automatic CSS rebuilding during development
- ✅ Production-ready minified CSS
- ✅ Custom color palette and styling
- ✅ Responsive design with Tailwind CSS
- ✅ Modern build process

---

**Happy coding! 🎉**