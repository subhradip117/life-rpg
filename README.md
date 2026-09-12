LIFE//RPG

TURN YOUR LIFE INTO A GAME.

LIFE//RPG is a full-stack gamification platform that transforms real-life activities into RPG-style quests, progression, attributes, traits, rewards, and achievements.

Your character is not manually chosen — your real-life behavior shapes who you become.

🎮 Core Concept

Complete real-life quests to earn:

⚡ XP
🪙 Credits
📈 Attributes
🔥 Streaks
🧬 Behavioral Traits
🏆 Levels
🎁 Rewards and Inventory Items
Core Loop
QUEST
  ↓
COMPLETE
  ↓
EARN XP + CREDITS
  ↓
BUILD ATTRIBUTES
  ↓
UNLOCK TRAITS
  ↓
LEVEL UP
  ↓
SPEND REWARDS
  ↓
REPEAT
🧬 Behavioral Character System

LIFE//RPG connects real-world actions to character attributes.

Real-Life Action	Attribute
Studying / Coding	🧠 Intellect
Workout / Training	💪 Strength
Meditation / Routines	🎯 Discipline
Running / Endurance	🔥 Stamina

Your behavior can unlock traits such as:

🧠 Curious — frequently learning and exploring
🎯 Consistent — maintaining habits over time
🔥 Focused — regularly completing quests

Your behavior builds your character.

✨ Features
🔐 User authentication
🎯 Real-life quest management
⚡ XP and level progression
🔥 Streak tracking
📊 Character attributes
🧬 Behavioral traits
🪙 Credits/reward economy
🛒 In-game shop
🎒 Player inventory
👤 Character profile
⚙️ Player settings
📱 Responsive interface
🎨 Cyberpunk-inspired RPG interface
💾 Persistent backend data with Supabase
🖥️ Pages
/                  → Landing Page
/signup            → Create Player
/login             → Sign In
/onboarding        → Character Initialization
/dashboard         → Player Dashboard
/quests            → Quest Management
/character         → Character Profile
/shop              → Reward Shop
/inventory         → Player Inventory
/settings          → Account Settings
🎨 Design

LIFE//RPG uses a premium cyberpunk RPG interface with:

Dark HUD-style panels
Cyan and violet highlights
Angular/hexagonal UI elements
Animated Player Core
XP progression bars
RPG-style statistics
Micro-interactions and motion
Responsive layouts

The interface is designed to feel like a living player system, rather than a traditional CRUD application.

🛠️ Tech Stack
Frontend
Next.js
TypeScript
Tailwind CSS
Framer Motion
Lucide React
Backend / Database
Supabase
PostgreSQL
Supabase Authentication
Row Level Security
Deployment
Vercel
📁 Project Structure
life-rpg/
│
├── app/
│   ├── login/
│   ├── signup/
│   ├── onboarding/
│   ├── dashboard/
│   ├── quests/
│   ├── character/
│   ├── shop/
│   ├── inventory/
│   ├── settings/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│
├── lib/
│   └── supabase.ts
│
├── public/
│
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
🚀 Getting Started
1. Clone the repository
git clone YOUR_REPOSITORY_URL
cd life-rpg
2. Install dependencies
npm install
3. Create environment file

Create:

.env.local

Add:

NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
4. Run the development server
npm run dev

Open:

http://localhost:3000
🔒 Environment Variables

Never commit .env.local or Supabase secret/service-role keys.

Required variables:

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
👥 Team
Member 1 — Frontend / UI/UX

Responsible for:

Frontend architecture
UI/UX design
Responsive interface
Landing page
Dashboard
Quest interface
Character interface
Shop
Inventory
Settings
Frontend integration
Member 2 — Backend / Database

Responsible for:

Supabase setup
Authentication
PostgreSQL database
Row Level Security
Backend logic
XP/reward calculations
Quest persistence
Character progression
Shop/inventory persistence
Security
🎯 Project Goal

LIFE//RPG turns everyday actions into meaningful progression.

Instead of simply tracking what you did, the system shows who those actions are making you become.

YOUR LIFE
    ↓
YOUR ACTIONS
    ↓
YOUR PROGRESS
    ↓
YOUR CHARACTER
🏆 Hackathon

Built for the 24-Hour Web Hackathon at IIT Bhubaneswar.

LIFE//RPG — Turn Your Life Into a Game.