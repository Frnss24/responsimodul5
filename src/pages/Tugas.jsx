import { useState } from 'react'
import { Check, Pencil, Plus, Search, Trash2, X } from 'lucide-react'

const EMPTY = { title: '', course: '', deadline: '', note: '' }

export default function Tugas({ tasks, addTask, updateTask, deleteTask, toggleTask }) {
  const [form, setForm] = useState(EMPTY)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('all')

  const reset = () => {
    setForm(EMPTY)
    setEditingId(null)
    setError('')
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Judul tugas wajib diisi.')
      return
    }
    const data = { ...form, title: form.title.trim() }
    if (editingId) updateTask(editingId, data)
    else addTask(data)
    reset()
  }

  const startEdit = (t) => {
    setEditingId(t.id)
    setForm({ title: t.title, course: t.course || '', deadline: t.deadline || '', note: t.note || '' })
    setError('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const remove = (t) => {
    if (!window.confirm(`Hapus tugas "${t.title}"?`)) return
    if (editingId === t.id) reset()
    deleteTask(t.id)
  }

  const q = query.toLowerCase()
  const visible = tasks.filter((t) => {
    const matchQ = !q || t.title.toLowerCase().includes(q) || (t.course || '').toLowerCase().includes(q)
    const matchF = filter === 'all' || (filter === 'done' ? t.done : !t.done)
    return matchQ && matchF
  })

  const input =
    'w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  return (
    <div className="space-y-5">
      <form onSubmit={submit} className="space-y-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
        <h2 className="font-semibold text-slate-800">{editingId ? 'Edit tugas' : 'Tambah tugas'}</h2>
        <div>
          <input
            className={input}
            placeholder="Judul tugas *"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            className={input}
            placeholder="Mata kuliah"
            value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
          />
          <input
            type="date"
            className={input}
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />
        </div>
        <textarea
          className={input}
          rows={2}
          placeholder="Catatan (opsional)"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {editingId ? <Check size={16} /> : <Plus size={16} />}
            {editingId ? 'Simpan' : 'Tambah'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1 rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
            >
              <X size={16} /> Batal
            </button>
          )}
        </div>
      </form>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            className={`${input} pl-9`}
            placeholder="Cari tugas atau mata kuliah"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex rounded-lg border border-blue-200 bg-white p-0.5 text-sm">
          {[
            ['all', 'Semua'],
            ['todo', 'Belum'],
            ['done', 'Selesai'],
          ].map(([v, l]) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`flex-1 rounded-md px-3 py-1.5 ${
                filter === v ? 'bg-blue-600 text-white' : 'text-slate-600'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          {tasks.length === 0 ? 'Belum ada tugas. Tambahkan yang pertama!' : 'Tidak ada tugas yang cocok.'}
        </p>
      ) : (
        <ul className="space-y-2">
          {visible.map((t) => (
            <li key={t.id} className="flex items-start gap-3 rounded-xl border border-blue-100 bg-white p-3 shadow-sm">
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTask(t.id)}
                className="mt-1 h-4 w-4 accent-blue-600"
                aria-label="Tandai selesai"
              />
              <div className="min-w-0 flex-1">
                <p className={`font-medium ${t.done ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                  {t.title}
                </p>
                <p className="text-xs text-slate-500">
                  {[t.course, t.deadline && `Deadline ${t.deadline}`].filter(Boolean).join(' • ')}
                </p>
                {t.note && <p className="mt-1 text-sm text-slate-600">{t.note}</p>}
              </div>
              <button onClick={() => startEdit(t)} className="rounded p-1.5 text-blue-600 hover:bg-blue-50" aria-label="Edit">
                <Pencil size={16} />
              </button>
              <button onClick={() => remove(t)} className="rounded p-1.5 text-red-500 hover:bg-red-50" aria-label="Hapus">
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

