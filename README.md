# 🎯 MIS Executive Assessment Tool

A comprehensive MCQ assessment platform for evaluating MIS Executive candidates on Systems Thinking, Google Sheets, Apps Script, and AppSheet automation skills.

## ✨ Features

- **24 Comprehensive Questions** across 5 categories
- **Real-time Progress Tracking**
- **Instant Results & Feedback**
- **Category-wise Performance Analytics**
- **Visual Charts & Breakdowns**
- **Question-by-Question Review**
- **Professional UI/UX**
- **100% Client-Side** - No backend required
- **Zero API Costs** - No external dependencies
- **Print-Friendly Results**

## 📊 Assessment Categories

1. **Systems Thinking (FMS/IMS/PMS)** - 3 questions
2. **Advanced Google Sheets** - 8 questions
3. **Google Apps Script + Web Apps** - 8 questions
4. **AppSheet** - 4 questions
5. **Integration & Data Model** - 1 question

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- Git installed

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/mis-executive-assessment.git
cd mis-executive-assessment

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📦 Deployment to GitHub Pages

### Step 1: Prepare Your Repository

1. Create a new repository on GitHub named `mis-executive-assessment`
2. **Important:** In `vite.config.ts`, update the `base` path:
   ```typescript
   base: '/mis-executive-assessment/', // Must match your repo name
   ```

### Step 2: Deploy

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/yourusername/mis-executive-assessment.git

# Push to GitHub
git branch -M main
git push -u origin main

# Deploy to GitHub Pages
npm run deploy
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select `gh-pages` branch
4. Click **Save**
5. Your site will be live at: `https://yourusername.github.io/mis-executive-assessment/`

## 🎨 Customization

### Modify Questions

Edit `src/constants.ts` to add/modify questions:

```typescript
{
  id: 25,
  category: Category.SYSTEMS_THINKING,
  text: "Your question here?",
  options: [
    { label: "A", text: "Option 1" },
    { label: "B", text: "Option 2" },
    { label: "C", text: "Option 3" },
    { label: "D", text: "Option 4" }
  ],
  correctAnswer: "B"
}
```

### Update Branding

- **Title**: Edit `index.html` (line 8)
- **Colors**: Modify Tailwind classes in `src/App.tsx`
- **Logo**: Add your logo image and update the SVG in the welcome screen

### Scoring Thresholds

Edit feedback logic in `src/App.tsx` (line 23-77):

```typescript
if (percentage >= 85) {
  // Exceptional
} else if (percentage >= 75) {
  // Strong - HIRE
} else if (percentage >= 60) {
  // Train Further
}
```

## 🏗️ Project Structure

```
mis-executive-assessment/
├── src/
│   ├── App.tsx              # Main application component
│   ├── constants.ts         # Questions database
│   ├── types.ts             # TypeScript interfaces
│   ├── main.tsx            # Entry point
│   └── index.css           # Styles
├── index.html              # HTML template
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## 🔧 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **GitHub Pages** - Hosting

## 📱 Features in Detail

### Smart Feedback System

The assessment provides intelligent, rule-based feedback that:
- Identifies strengths and weaknesses
- Provides specific improvement recommendations
- Gives hire/train recommendations based on performance
- Analyzes category-wise performance

### Performance Thresholds

| Score | Rating | Recommendation |
|-------|--------|----------------|
| 85%+ | Exceptional | ✅ Hire (Senior Level) |
| 75-84% | Strong | ✅ Hire (Ready) |
| 60-74% | Developing | ⚠️ Train Further (2-3 months) |
| 50-59% | Foundational | ❌ Train Further (3-6 months) |
| <50% | Beginning | ❌ Not Ready |

### Visual Analytics

- **Bar Chart**: Category-wise performance comparison
- **Progress Bars**: Individual category scores
- **Overall Score**: Large percentage display
- **Color-Coded Results**: Green/Yellow/Red indicators

## 🎯 Use Cases

- **Recruitment**: Screen MIS Executive candidates
- **Training**: Assess employee skill levels
- **Self-Assessment**: Allow candidates to self-evaluate
- **Team Building**: Identify training needs
- **Onboarding**: Evaluate new hire capabilities

## 🔐 Privacy & Data

- All data processing happens client-side
- No data is sent to external servers
- No cookies or tracking
- Results are not stored (unless user prints/saves)
- Fully GDPR compliant

## 🤝 Contributing

Want to improve the assessment? Contributions welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/improvement`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/improvement`
5. Submit a Pull Request

## 📝 License

This project is open source and available under the MIT License.

## 🆘 Troubleshooting

### Blank Page on GitHub Pages

Check that `base` in `vite.config.ts` matches your repository name:
```typescript
base: '/your-exact-repo-name/'
```

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Deployment Issues

```bash
# Redeploy
npm run deploy
```

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: your.email@example.com

## 🎉 Credits

Developed for **FinTrust Capital** IT Development Team
- Systems Thinking Framework
- Google Workspace Expertise
- Automation Best Practices

---

Made with ❤️ for MIS Excellence
