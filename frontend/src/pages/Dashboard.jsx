import { UserButton, useUser } from '@clerk/clerk-react'

export default function Dashboard() {
  const { user } = useUser()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">AI Tutor</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
        <p className="text-gray-600">Welcome, {user?.firstName}! Your sessions will appear here.</p>
      </div>
    </div>
  )
}