import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { CheckCircle2, Clock, ListTodo, Quote } from 'lucide-react'

const QUOTE_KEY = 'tugasku:quote'

export default function Beranda({ tasks }) {
  const total = tasks.length
  const done = tasks.filter((t) => t.done).length
  const pending = total - done
  const percent = total ? Math.round((done / total) * 100) : 0

  const [quote, setQuote] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(QUOTE_KEY))
    } catch {
      return null
    }
  })

  // Ambil kutipan motivasi dari REST API; jika offline pakai yang tersimpan.
  useEffect(() => {
    let cancelled = false
    axios
      .get('https://dummyjson.com/quotes/random', { timeout: 5000 })
      .then(({ data }) => {
        if (cancelled) return
        const q = { text: data.quote, author: data.author }
        setQuote(q)
        localStorage.setItem(QUOTE_KEY, JSON.stringify(q))
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const upcoming = tasks
    .filter((t) => !t.done && t.deadline)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 3)

  const stats = [
    { label: 'Total', value: total, icon: ListTodo },
    { label: 'Belum selesai', value: pending, icon: Clock },
    { label: 'Selesai', value: done, icon: CheckCircle2 },
  ]

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-5 text-white shadow-md">
        <p className="text-sm text-blue-100">Selamat datang 👋</p>
        <h2 className="mt-1 text-2xl font-bold">Kelola tugas kuliahmu</h2>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-blue-100">
            <span>Progres</span>
            <span>{percent}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/30">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-blue-100 bg-white p-3 text-center shadow-sm">
            <Icon className="mx-auto text-blue-500" size={20} />
            <p className="mt-1 text-2xl font-bold text-slate-800">{value}</p>
            <p className="text-xs text-slate-500">{label}</p>
          </div>
        ))}
      </section>

      <section className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Deadline terdekat</h3>
          <Link to="/tugas" className="text-sm text-blue-600 hover:underline">
            Lihat semua
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="text-sm text-slate-500">Belum ada tugas dengan deadline.</p>
        ) : (
          <ul className="divide-y divide-blue-50">
            {upcoming.map((t) => (
              <li key={t.id} className="flex justify-between py-2 text-sm">
                <span className="text-slate-700">{t.title}</span>
                <span className="text-slate-500">{t.deadline}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {quote && (
        <section className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-700">
          <Quote size={18} className="mb-1 text-blue-400" />
          <p className="italic">“{quote.text}”</p>
          <p className="mt-1 text-xs text-slate-500">— {quote.author}</p>
        </section>
      )}
    </div>
  )
}

