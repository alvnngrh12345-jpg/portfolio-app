import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage } from '../pages/public/HomePage'
import { ProtectedRoute } from './ProtectedRoute'

// Lazy-loaded Admin and Secondary Routes
const LoginPage = React.lazy(() =>
  import('../pages/admin/LoginPage').then((m) => ({ default: m.LoginPage }))
)
const DashboardOverviewPage = React.lazy(() =>
  import('../pages/admin/DashboardOverviewPage').then((m) => ({
    default: m.DashboardOverviewPage,
  }))
)
const ProfileManagePage = React.lazy(() =>
  import('../pages/admin/ProfileManagePage').then((m) => ({
    default: m.ProfileManagePage,
  }))
)
const SkillsManagePage = React.lazy(() =>
  import('../pages/admin/SkillsManagePage').then((m) => ({
    default: m.SkillsManagePage,
  }))
)
const ExperienceManagePage = React.lazy(() =>
  import('../pages/admin/ExperienceManagePage').then((m) => ({
    default: m.ExperienceManagePage,
  }))
)
const CertificatesManagePage = React.lazy(() =>
  import('../pages/admin/CertificatesManagePage').then((m) => ({
    default: m.CertificatesManagePage,
  }))
)
const MessagesManagePage = React.lazy(() =>
  import('../pages/admin/MessagesManagePage').then((m) => ({
    default: m.MessagesManagePage,
  }))
)
const SettingsManagePage = React.lazy(() =>
  import('../pages/admin/SettingsManagePage').then((m) => ({
    default: m.SettingsManagePage,
  }))
)
const NotFoundPage = React.lazy(() =>
  import('../pages/public/NotFoundPage').then((m) => ({
    default: m.NotFoundPage,
  }))
)

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <div className="h-9 w-9 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DashboardOverviewPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <ProfileManagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/skills"
          element={
            <ProtectedRoute>
              <SkillsManagePage />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/projects" element={<Navigate to="/admin" replace />} />
        <Route
          path="/admin/experience"
          element={
            <ProtectedRoute>
              <ExperienceManagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/certificates"
          element={
            <ProtectedRoute>
              <CertificatesManagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <ProtectedRoute>
              <MessagesManagePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute>
              <SettingsManagePage />
            </ProtectedRoute>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
