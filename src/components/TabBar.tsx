import { NavLink } from 'react-router-dom'
import { useStrings, type Strings } from '../i18n/strings'

const tabs = [
  {
    to: '/',
    label: (s: Strings) => s.tabs.study,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="7" width="14" height="13" rx="2" />
        <path d="M7.5 7V5.5A1.5 1.5 0 0 1 9 4h9.5A1.5 1.5 0 0 1 20 5.5V16a1.5 1.5 0 0 1-1.5 1.5H18" />
      </svg>
    ),
  },
  {
    to: '/reading',
    label: (s: Strings) => s.tabs.reading,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 6.5C10.5 5 8.5 4.5 6 4.5H3v14h3c2.5 0 4.5.5 6 2 1.5-1.5 3.5-2 6-2h3v-14h-3c-2.5 0-4.5.5-6 2Z" />
        <path d="M12 6.5v14" />
      </svg>
    ),
  },
  {
    to: '/reference',
    label: (s: Strings) => s.tabs.reference,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" />
        <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      </svg>
    ),
  },
  {
    to: '/stats',
    label: (s: Strings) => s.tabs.stats,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M5 20V12" />
        <path d="M10.5 20V4" />
        <path d="M16 20v-6" />
        <path d="M21 20H3" />
      </svg>
    ),
  },
  {
    to: '/settings',
    label: (s: Strings) => s.tabs.settings,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.11-1.23l2-1.55-2-3.46-2.36.95a7 7 0 0 0-2.12-1.23L14 3h-4l-.41 2.48a7 7 0 0 0-2.12 1.23l-2.36-.95-2 3.46 2 1.55A7 7 0 0 0 5 12c0 .42.04.83.11 1.23l-2 1.55 2 3.46 2.36-.95c.63.53 1.35.95 2.12 1.23L10 21h4l.41-2.48a7 7 0 0 0 2.12-1.23l2.36.95 2-3.46-2-1.55c.07-.4.11-.81.11-1.23Z" />
      </svg>
    ),
  },
]

export function TabBar() {
  const s = useStrings()
  return (
    <nav className="tabbar">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className={({ isActive }) => (isActive ? 'active' : undefined)}
        >
          {tab.icon}
          {tab.label(s)}
        </NavLink>
      ))}
    </nav>
  )
}
