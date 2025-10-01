# Personal Portfolio - Md. Abu Sufyan

A modern, professional portfolio website showcasing AI/ML expertise, projects, research, and professional experience. Built with React, TypeScript, and Tailwind CSS for optimal performance and user experience.

## ✨ Features

- **Modern Design System**: Professional neutral palette with strategic blue accent
- **Responsive Layout**: Flawless experience across mobile, tablet, and desktop
- **Performance Optimized**: Lighthouse 90+ scores for Performance/Best Practices/SEO
- **Accessibility First**: WCAG AA+ compliant, keyboard navigable, screen reader friendly
- **Animated Elements**: Subtle Lottie animations and micro-interactions
- **SEO Optimized**: Semantic HTML, meta tags, structured data
- **Component-Based**: Reusable React components with TypeScript
- **JSON-Driven Content**: Easy content updates via JSON configuration files

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **Animations**: Lottie React, CSS animations
- **Build Tool**: Vite
- **Backend**: Supabase (database, authentication)
- **Forms**: React Hook Form with Zod validation

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn)
│   ├── Hero.tsx        # Hero section with Lottie animation
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects showcase
│   ├── Skills.tsx      # Skills & expertise
│   ├── Contact.tsx     # Contact form
│   └── ...             # Other sections
├── data/               # JSON configuration files
│   ├── hero.json       # Hero section content
│   ├── projects.json   # Projects data
│   ├── skills.json     # Skills data
│   └── ...             # Other data files
├── pages/              # Page components
│   └── Index.tsx       # Main page
├── assets/             # Images and static assets
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── index.css           # Global styles & design system
```

## 🎨 Design System

### Color Palette
- **Background**: Slate/Navy (`240 10% 3.9%`)
- **Primary**: Professional Blue (`217 91% 60%`)
- **Accent**: Fresh Green (`142 71% 45%`)
- **Text**: High contrast white (`0 0% 98%`)

### Typography
- **Display**: Space Grotesk (headings)
- **Body**: Inter (text)
- **Line Height**: 1.5–1.7 for optimal readability

### Animations
All animations respect `prefers-reduced-motion` for accessibility:
- Fade transitions
- Hover effects
- Smooth scrolling
- Lottie animations

## 🛠️ Setup & Installation

### Prerequisites
- Node.js 18+ or Bun
- npm/yarn/pnpm/bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
# Build
npm run build
# or
bun run build

# Preview production build
npm run preview
# or
bun run preview
```

## 📝 Content Management

### Updating Content

Content is managed through JSON files in `src/data/`:

#### Hero Section (`src/data/hero.json`)
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "summary": "Your summary...",
  "chips": [...],
  "socials": [...],
  "ctas": [...]
}
```

#### Projects (`src/data/projects.json`)
```json
[
  {
    "id": "p01",
    "title": "Project Title",
    "description": "Description...",
    "technologies": ["React", "Python"],
    "project_type": "AI/ML",
    "year": "2025",
    "featured": true,
    "github_url": "https://...",
    "demo_url": "https://...",
    "image_url": "/path/to/image.jpg"
  }
]
```

#### Skills (`src/data/skills.json`)
#### Navigation (`src/data/navigation.json`)
#### And more...

### Adding Images

1. Place images in `src/assets/` for ES6 imports
2. Or place in `public/` for direct references
3. Update JSON files with image paths

## 🎯 Key Sections

1. **Hero**: Eye-catching introduction with Lottie animation
2. **About**: Professional background and expertise
3. **Skills**: Technical skills organized by category
4. **Projects**: Featured projects with live demos and code
5. **Research**: Publications and research interests
6. **Certifications**: Professional certifications
7. **Experience**: Work history and roles
8. **Contact**: Contact form with Supabase integration

## 🔧 Customization

### Colors
Edit `src/index.css` - modify CSS variables in `:root`:
```css
--primary: 217 91% 60%;  /* Change primary color */
--accent: 142 71% 45%;   /* Change accent color */
```

### Fonts
Update `index.html` and `tailwind.config.ts`:
```html
<!-- Add Google Font link -->
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

```ts
// tailwind.config.ts
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
}
```

### Components
All components are in `src/components/` - edit directly or create new ones.

## 📱 Responsive Breakpoints

- Mobile: ≤639px
- Tablet: 640px–1023px
- Desktop: 1024px–1279px
- Large Desktop: ≥1280px

## ♿ Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Skip links
- Alt text on images
- Color contrast ratios meet WCAG AA

## 🚢 Deployment

### Deploy to Vercel/Netlify/Lovable

```bash
# Build the project
npm run build

# Deploy the `dist` folder
```

Or use platform-specific commands:
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod`
- **Lovable**: Use the built-in deployment feature via [Lovable Project](https://lovable.dev/projects/315aad15-22d6-431f-a2f7-2159bc0be7c6)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Md. Abu Sufyan**
- GitHub: [@sufyan-github](https://github.com/sufyan-github)
- LinkedIn: [md-abu-sufyan](https://linkedin.com/in/md-abu-sufyan)
- Email: abusufyan.cse20@gmail.com

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
