import { Routes, Route, Navigate } from 'react-router-dom'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Dashboard from './pages/Dashboard'
import NewSession from './pages/NewSession'
import Session from './pages/Session'

// Wrap any route that requires auth
function ProtectedRoute({ children }) {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut><RedirectToSignIn /></SignedOut>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path="/sessions/new" element={
        <ProtectedRoute><NewSession /></ProtectedRoute>
      } />
      <Route path="/sessions/:id" element={
        <ProtectedRoute><Session /></ProtectedRoute>
      } />
    </Routes>
  )
}