# Modern Admin Dashboard

A clean, responsive admin dashboard built with modern web technologies. This project features a simple but powerful interface with two main pages: Dashboard and Settings.

## How to Run the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Access the dashboard at http://localhost:3000
```

## Technology Stack

- **Next.js 15.3.2** - Modern React framework with routing and optimization
- **React 19.0.0** - UI library for building component-based interfaces
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **shadcn/ui** - Beautiful, customizable component library
- **Recharts** - Simple charting library for data visualization
- **React Hook Form + Zod** - Form handling with schema validation
- **Zustand** - Lightweight state management with persistent storage

## Features

### Dashboard Page
- Stats Cards showing key metrics
- Activity Overview with interactive charts
- Pending Suppliers list with approval actions
- Pending Events with approve/reject options
- Reported Posts with detailed view options
- Interactive dialogs for all actions

### Settings Page
- User profile management
- Theme customization options
- Notification preferences
- Form validation with instant feedback
- Persistent settings across sessions

### General Features
- Dark Mode / Light Mode toggle
- Fully responsive design (mobile and desktop)
- Collapsible sidebar navigation
- Real-time state updates across components

## Design Decisions and Assumptions

### Architecture Choices
- **Component-Based Structure**: I divided the UI into small, reusable components to improve maintainability and reduce code duplication.
- **Separation of Concerns**: UI components are separated from business logic, making the codebase easier to understand and extend.
- **Client-Side State Management**: I chose Zustand over more complex solutions like Redux because it provides persistence without the boilerplate code, ideal for a dashboard that needs to remember user preferences.

### Design Shortcuts
- **Mock Data**: Instead of connecting to a real backend, I used static data to demonstrate the UI capabilities. This allowed faster development while still showing the potential for API integration.
- **Limited Form Validation**: The validation focuses on common patterns rather than complex business rules, assuming these would be defined in a real project.
- **No Authentication**: Authentication was omitted to simplify the demo, assuming it would be implemented with NextAuth or a similar solution in production.

### Performance Considerations
- Used React's client components for interactive elements
- Implemented responsive design practices for all screen sizes
- Added transitions and animations selectively to enhance UX without hurting performance

## Future Improvements

- Add authentication and user management
- Integrate with a real API for dynamic data
- Expand dashboard analytics capabilities
- Add comprehensive testing
- Optimize with Next.js Server Components
