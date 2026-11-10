import { useEffect, useState } from 'react'

const KEY = 'tugasku:profile'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY))
  } catch {
    return null
  }
}

// CRUD profil: null = belum ada profil (Create), objek = Read/Update, null lagi = Delete.
export default function useProfile() {
  const [profile, setProfile] = useState(load)

  useEffect(() => {
    if (profile) localStorage.setItem(KEY, JSON.stringify(profile))
    else localStorage.removeItem(KEY)
  }, [profile])

  const saveProfile = (data) => setProfile(data)
  const deleteProfile = () => setProfile(null)

  return { profile, saveProfile, deleteProfile }
}
