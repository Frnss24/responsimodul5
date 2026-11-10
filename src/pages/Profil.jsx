import { useState } from 'react'
import { BadgeInfo, GraduationCap, Pencil, Save, Trash2, UserRound, Users, X } from 'lucide-react'
import useProfile from '../hooks/useProfile'

const EMPTY = { nama: '', nim: '', kelompok: '' }

export default function Profil() {
  const { profile, saveProfile, deleteProfile } = useProfile()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const showForm = editing || !profile

  const startEdit = () => {
    setForm(profile || EMPTY)
    setErrors({})
    setEditing(true)
  }

  const cancel = () => {
    setEditing(false)
    setErrors({})
  }

  const submit = (e) => {
    e.preventDefault()
    const clean = {
      nama: form.nama.trim(),
      nim: form.nim.trim(),
      kelompok: form.kelompok.trim(),
    }
    const err = {}
    if (!clean.nama) err.nama = 'Nama wajib diisi.'
    if (!clean.nim) err.nim = 'NIM wajib diisi.'
    if (!clean.kelompok) err.kelompok = 'Kelompok wajib diisi.'
    setErrors(err)
    if (Object.keys(err).length) return
    saveProfile(clean)
    setEditing(false)
  }

  const remove = () => {
    if (!window.confirm('Hapus data profil?')) return
    deleteProfile()
    setForm(EMPTY)
    setEditing(false)
  }

  const input =
    'w-full rounded-lg border border-blue-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'

  const rows = profile
    ? [
        { label: 'Nama', value: profile.nama, icon: UserRound },
        { label: 'NIM', value: profile.nim, icon: GraduationCap },
        { label: 'Kelompok', value: profile.kelompok, icon: Users },
      ]
    : []

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-center text-white shadow-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-blue-600">
          <UserRound size={40} />
        </div>
        <h2 className="mt-3 text-xl font-bold">{profile ? profile.nama : 'Profil belum diisi'}</h2>
        <p className="text-sm text-blue-100">Praktikum PPB 2026 Ganjil</p>
      </section>

      {showForm ? (
        <form onSubmit={submit} className="space-y-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
          <h3 className="font-semibold text-slate-800">{profile ? 'Edit profil' : 'Buat profil'}</h3>
          {[
            ['nama', 'Nama lengkap'],
            ['nim', 'NIM'],
            ['kelompok', 'Kelompok'],
          ].map(([key, label]) => (
            <div key={key}>
              <label className="mb-1 block text-xs text-slate-500">{label}</label>
              <input
                className={input}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              />
              {errors[key] && <p className="mt-1 text-xs text-red-600">{errors[key]}</p>}
            </div>
          ))}
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Save size={16} /> Simpan
            </button>
            {profile && (
              <button
                type="button"
                onClick={cancel}
                className="flex items-center gap-1 rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
              >
                <X size={16} /> Batal
              </button>
            )}
          </div>
        </form>
      ) : (
        <>
          <section className="divide-y divide-blue-50 rounded-xl border border-blue-100 bg-white shadow-sm">
            {rows.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3 p-4">
                <Icon className="text-blue-500" size={20} />
                <div>
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="font-medium text-slate-800">{value}</p>
                </div>
              </div>
            ))}
          </section>
          <div className="flex gap-2">
            <button
              onClick={startEdit}
              className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              onClick={remove}
              className="flex items-center gap-1 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100"
            >
              <Trash2 size={16} /> Hapus
            </button>
          </div>
        </>
      )}

      <section className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-600">
        <BadgeInfo className="shrink-0 text-blue-500" size={20} />
        <p>
          Tugasku adalah PWA (React + Vite + Tailwind) untuk mencatat tugas kuliah. Data tersimpan di
          perangkat sehingga tetap bisa dipakai tanpa internet.
        </p>
      </section>
    </div>
  )
}
