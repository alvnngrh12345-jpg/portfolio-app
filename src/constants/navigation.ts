export interface NavItem {
  label: string
  href: string
}

export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Terminal', href: '#terminal' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Contact', href: '#contact' },
]

export const ADMIN_NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Profile & About', href: '/admin/profile', icon: 'User' },
  { label: 'Skills', href: '/admin/skills', icon: 'Code2' },
  { label: 'Experience & Edu', href: '/admin/experience', icon: 'Briefcase' },
  { label: 'Certificates', href: '/admin/certificates', icon: 'Award' },
  { label: 'Messages', href: '/admin/messages', icon: 'Mail' },
  { label: 'Settings', href: '/admin/settings', icon: 'Settings' },
]

