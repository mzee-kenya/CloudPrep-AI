# CloudPrep AI

Understand the Cloud. Master the Concepts. Build Your Confidence.

## Overview

CloudPrep AI is an unofficial, independent learning tool built for the Power Learn Project Africa #1MillionDevs Vibe Coding Hackathon (AZ-900 Exam Prep Edition). It helps beginners prepare for the Microsoft Azure Fundamentals (AZ-900) exam through a connected learning loop: **DIAGNOSE → UNDERSTAND → PRACTISE → REMEMBER → APPLY → REVIEW → MEASURE PROGRESS**.

**Disclaimer:** This is not affiliated with, endorsed by, or sponsored by Microsoft. It uses original practice content only and does not reproduce actual exam questions, exam dumps, or recalled exam items.

## Features

- **Dashboard** - Personalized overview with XP, streak, next steps, recent activity, and achievements
- **Learn** - AZ-900 curriculum with clear explanations, African-context analogies, common misconceptions, and memory aids
- **Practice** - Original multiple-choice quiz engine with instant feedback, distractor explanations, and review of mistakes
- **Flashcards** - Active recall with simplified spaced repetition (intervals grow when remembered)
- **Cloud Quest** - Game-like scenario challenges based on African examples (university portal, online shop) with decision explanations
- **AI Study Buddy** - Tutor that follows a structured teaching pattern (explain → analogy → Azure example → common mistake → check understanding). Uses a secure provider abstraction with honest fallback when not configured
- **Study Planner** - Generates a realistic schedule from exam date/availability, prioritizes weak topics detected from quiz history, supports marking sessions complete/skip with XP rewards
- **Progress/Readiness** - Evidence-based topic performance and transparent readiness indicators (no official pass probability)

## Tech Stack

- React 19 + TypeScript + Vite
- React Router
- Bootstrap 5 + Bootstrap Icons + custom CSS design system
- LocalStorage persistence with data abstraction
- Domain logic extracted for testability (quiz scoring, spaced repetition, planner)

## Getting Started

```bash
npm install
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Type-check and build for production
- `npm run lint` - Run Oxlint
- `npm run preview` - Preview production build

## Configuration

Copy `.env.example` to `.env` if you want to enable a live AI tutor:

```env
VITE_TUTOR_ENDPOINT=
VITE_TUTOR_API_KEY=
```

If not configured, the AI Study Buddy runs in honest fallback mode with curated AZ-900 content.

## Project Structure

```
src/
├── components/     # App layout
├── context/        # Progress state management
├── data/           # Curriculum, questions, flashcards, quests
├── pages/          # Route pages
├── services/       # AI tutor service abstraction
├── styles/         # Design system
├── types/          # TypeScript types
└── utils/          # Quiz scoring, spaced repetition, planner, storage
```

## Known Limitations

- LocalStorage only (no cross-device sync)
- Question bank is a curated starter set (not exhaustive coverage of all AZ-900 topics)
- Spaced repetition is simplified (documented as non-validated)
- Readiness indicators are based on practice performance only, not official pass prediction
- AI tutor requires external endpoint configuration for live responses

## Curriculum Reference

Based on the publicly available Microsoft AZ-900 skills outline: https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/
