import { BadgeInfo, GraduationCap, UserRound, Users } from 'lucide-react'
import { PROFILE } from '../config/profile'

export default function Profil() {
  const rows = [
    { label: 'Nama', value: PROFILE.nama, icon: UserRound },
    { label: 'NIM', value: PROFILE.nim, icon: GraduationCap },
    { label: 'Kelompok', value: PROFILE.kelompok, icon: Users },
  ]

  return (
    <div className="space-y-5">
      <section className="rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-center text-white shadow-md">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-blue-600">
          <UserRound size={40} />
        </div>
        <h2 className="mt-3 text-xl font-bold">{PROFILE.nama}</h2>
        <p className="text-sm text-blue-100">Praktikum PPB 2026 Ganjil</p>
      </section>

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

