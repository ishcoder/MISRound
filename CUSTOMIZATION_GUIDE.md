# 🎨 Customization Guide

## Questions Kaise Change Karein?

### File Location:
```
src/constants.ts
```

### Example - Naya Question Add Karna:

**File kholo:** `src/constants.ts`

**Last question ke baad add karo:**

```typescript
{
  id: 25,  // Increment karo last number se
  category: Category.GOOGLE_SHEETS,  // Category choose karo
  text: "Aapka question yahan likhein?",  // Question text
  options: [
    { label: "A", text: "Pehla option" },
    { label: "B", text: "Doosra option" },
    { label: "C", text: "Teesra option" },
    { label: "D", text: "Chautha option" }
  ],
  correctAnswer: "B"  // Correct answer ka label
}
```

**Note:** Don't forget comma (`,`) before closing `]`

---

## Available Categories:

```typescript
Category.SYSTEMS_THINKING    // FMS/IMS/PMS questions
Category.GOOGLE_SHEETS       // Sheets formulas, functions
Category.APPS_SCRIPT         // Apps Script coding
Category.APPSHEET           // AppSheet app building
Category.INTEGRATION        // System integration
```

---

## Colors Change Karein?

### Blue → Green Change Karna Hai?

**File:** `src/App.tsx`

**Search for:** `from-blue-600`

**Replace with:** `from-green-600`

**Common Colors:**
```
Blue:    from-blue-600 to-indigo-600
Green:   from-green-600 to-emerald-600
Red:     from-red-600 to-rose-600
Purple:  from-purple-600 to-violet-600
Orange:  from-orange-600 to-amber-600
```

---

## Title Change Karein?

### Welcome Screen Title:

**File:** `src/App.tsx`

**Line ~142:** 
```typescript
<h1 className="text-3xl font-bold">
  Your Custom Title Here
</h1>
```

---

## Logo Add Karein?

### Company Logo Lagana Hai?

**File:** `src/App.tsx`

**Line ~137 ke around:**

Replace existing SVG with:

```typescript
<img 
  src="/logo.png" 
  alt="Company Logo" 
  className="w-16 h-16 rounded-2xl"
/>
```

**Logo file:** Public folder mein rakhein (`public/logo.png`)

---

## Passing Score Change Karein?

**File:** `src/App.tsx`

**Line ~23 ke around** dekhein:

```typescript
if (percentage >= 85) {
  // Exceptional
} else if (percentage >= 75) {
  // HIRE threshold - yahan change karo
} else if (percentage >= 60) {
  // Train Further
}
```

**Example:** 75% → 70% karna hai hiring ke liye:

```typescript
} else if (percentage >= 70) {
  // Strong - HIRE
```

---

## Email Domain Validate Karein?

Sirf company email accept karna hai?

**File:** `src/App.tsx`

**Line ~148 ke around** `<input type="email">` ke baad add karo:

```typescript
pattern=".*@yourcompany\.com$"
title="Please use your company email"
```

---

## Time Limit Add Karein?

Assessment mein timer lagana hai?

**File:** `src/App.tsx`

**Top mein** add karo:

```typescript
const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds

useEffect(() => {
  if (timeLeft > 0 && !state.isSubmitted) {
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  } else if (timeLeft === 0) {
    handleSubmit(); // Auto-submit
  }
}, [timeLeft, state.isSubmitted]);
```

**Display timer:**
```typescript
<div>Time Left: {Math.floor(timeLeft/60)}:{(timeLeft%60).toString().padStart(2,'0')}</div>
```

---

## Testing Changes

Har change ke baad test karo:

```bash
npm run dev
```

Browser mein dekho: `http://localhost:5173`

---

## Deploy Changes

Changes deploy karne ke liye:

### Method A: GitHub Web
1. File edit karo GitHub pe directly
2. "Commit changes" button click karo
3. Automatically deploy ho jayega

### Method B: Local Upload
1. Files change karo locally
2. GitHub pe upload karo (drag & drop)
3. "Commit changes" click karo

---

## Common Customizations Checklist

```
□ Questions customize kiye
□ Company name updated
□ Colors changed (optional)
□ Passing threshold set
□ Logo added (optional)
□ Email validation added (optional)
□ Timer added (optional)
□ Tested locally (npm run dev)
□ Deployed to GitHub
```

---

## Quick Reference

| What to Change | File | Line Range |
|---------------|------|------------|
| Questions | src/constants.ts | Anywhere |
| Colors | src/App.tsx | Search "from-blue" |
| Title | src/App.tsx | ~142 |
| Logo | src/App.tsx | ~137 |
| Scoring | src/App.tsx | ~23-77 |
| Categories | src/types.ts | Line 2-7 |

---

## Need More Help?

Koi specific customization chahiye?
Batao, main exact code de dunga! 🚀
