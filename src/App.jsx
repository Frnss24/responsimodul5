import { NavLink, Route, Routes } from 'react-router-dom'
import { Download, Home, ListChecks, User, WifiOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import useTasks from './hooks/useTasks'
import useInstallPrompt from './hooks/useInstallPrompt'
import Beranda from './pages/Beranda'
import Tugas from './pages/Tugas'
import Profil from './pages/Profil'

const links = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/tugas', label: 'Tugas', icon: ListChecks },
  { to: '/profil', label: 'Profil', icon: User },
]

export default function App() {
  const taskState = useTasks()
  const { canInstall, install } = useInstallPrompt()
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col">
      <header className="sticky top-0 z-10 border-b border-blue-100 bg-white/80 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold text-blue-700">Tugasku</h1>
          <div className="flex items-center gap-2">
            {!online && (
              <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                <WifiOff size={14} /> Offline
              </span>
            )}
            {canInstall && (
              <button
                onClick={install}
                className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
              >
                <Download size={14} /> Install
              </button>
            )}
          </div>
        </div>
        <nav className="hidden gap-1 px-4 pb-2 sm:flex">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-blue-50'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1 p-4 pb-24 sm:pb-8">
        <Routes>
          <Route path="/" element={<Beranda tasks={taskState.tasks} />} />
          <Route path="/tugas" element={<Tugas {...taskState} />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="*" element={<Beranda tasks={taskState.tasks} />} />
        </Routes>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-10 border-t border-blue-100 bg-white/90 backdrop-blur sm:hidden">
        <div className="mx-auto flex max-w-3xl">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs ${
                  isActive ? 'font-semibold text-blue-600' : 'text-slate-500'
                }`
              }
            >
              <Icon size={20} /> {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  )
}
