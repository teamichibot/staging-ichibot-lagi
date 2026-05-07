'use client'

import { useEffect, useState } from 'react'
import { AdminShell } from '../AdminShell'
import { TeamMember } from '@/lib/server-data'

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<TeamMember | null>(null)

  useEffect(() => {
    fetch('/api/admin/team')
      .then((r) => r.json())
      .then((d) => {
        setTeam(d)
        setLoading(false)
      })
  }, [])

  async function handleSave() {
    setSaving(true)
    const res = await fetch('/api/admin/team', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(team),
    })
    if (res.ok) alert('Berhasil disimpan!')
    setSaving(false)
  }

  function startEdit(index: number) {
    setEditingIndex(index)
    setEditForm({ ...team[index] })
  }

  function saveEdit() {
    if (editingIndex !== null && editForm) {
      const newTeam = [...team]
      newTeam[editingIndex] = editForm
      setTeam(newTeam)
      setEditingIndex(null)
      setEditForm(null)
    }
  }

  function addMember() {
    const newMember: TeamMember = {
      name: 'Nama Baru',
      role: 'Jabatan',
      bio: 'Deskripsi singkat...',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    }
    setTeam([...team, newMember])
    startEdit(team.length)
  }

  function removeMember(index: number) {
    if (!confirm('Hapus anggota tim ini?')) return
    const newTeam = team.filter((_, i) => i !== index)
    setTeam(newTeam)
  }

  function moveMember(index: number, direction: 'up' | 'down') {
    const newTeam = [...team]
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newTeam.length) return
    const temp = newTeam[index]
    newTeam[index] = newTeam[targetIndex]
    newTeam[targetIndex] = temp
    setTeam(newTeam)
  }

  return (
    <AdminShell>
      <div className="p-6 md:p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-ink">Manajemen Tim</h1>
            <p className="text-ink/55 text-sm mt-1">Atur profil tim yang muncul di halaman Tentang Kami.</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={addMember}
              className="flex items-center gap-2 bg-white hover:bg-off-white text-ink/85 border border-black/8 font-semibold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Tambah Anggota
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-brand hover:bg-brand-dark text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Simpan Semua'}
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-ink/55 text-sm">Memuat data...</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {team.map((person, i) => (
              <div key={i} className="bg-white rounded-2xl border border-black/8 p-5 flex gap-5 items-start">
                <div className="relative group shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={person.image} alt={person.name} className="w-24 h-24 object-cover rounded-xl border border-black/8" />
                </div>
                
                <div className="flex-1">
                  {editingIndex === i && editForm ? (
                    <div className="space-y-4 bg-off-white p-4 rounded-xl border border-black/8">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-ink/40 uppercase mb-1">Nama</label>
                          <input 
                            className="w-full px-3 py-2 bg-white border border-black/8 rounded-lg text-sm focus:ring-2 focus:ring-teal/20 focus:border-brand outline-none"
                            value={editForm.name}
                            onChange={e => setEditForm({...editForm, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-ink/40 uppercase mb-1">Jabatan</label>
                          <input 
                            className="w-full px-3 py-2 bg-white border border-black/8 rounded-lg text-sm focus:ring-2 focus:ring-teal/20 focus:border-brand outline-none"
                            value={editForm.role}
                            onChange={e => setEditForm({...editForm, role: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-ink/40 uppercase mb-1">URL Foto</label>
                        <input 
                          className="w-full px-3 py-2 bg-white border border-black/8 rounded-lg text-sm focus:ring-2 focus:ring-teal/20 focus:border-brand outline-none"
                          value={editForm.image}
                          onChange={e => setEditForm({...editForm, image: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-ink/40 uppercase mb-1">Bio / Deskripsi</label>
                        <textarea 
                          rows={3}
                          className="w-full px-3 py-2 bg-white border border-black/8 rounded-lg text-sm focus:ring-2 focus:ring-teal/20 focus:border-brand outline-none resize-none"
                          value={editForm.bio}
                          onChange={e => setEditForm({...editForm, bio: e.target.value})}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setEditingIndex(null)} className="px-4 py-2 text-sm font-medium text-ink/65 hover:bg-black/8 rounded-lg transition-colors">Batal</button>
                        <button onClick={saveEdit} className="px-4 py-2 text-sm font-bold bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors">Terapkan</button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-ink text-lg">{person.name}</h3>
                        <p className="text-brand font-semibold text-xs uppercase mb-2">{person.role}</p>
                        <p className="text-ink/55 text-sm leading-relaxed line-clamp-2 max-w-2xl">{person.bio}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 ml-4">
                        <button onClick={() => moveMember(i, 'up')} className="p-2 text-ink/40 hover:text-ink transition-colors">↑</button>
                        <button onClick={() => moveMember(i, 'down')} className="p-2 text-ink/40 hover:text-ink transition-colors">↓</button>
                        <div className="w-px h-4 bg-black/8 mx-1" />
                        <button 
                          onClick={() => startEdit(i)}
                          className="px-3 py-1.5 text-sm font-medium text-ink/65 hover:text-brand hover:bg-black/5 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => removeMember(i)}
                          className="px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && team.length === 0 && (
          <div className="bg-off-white border-2 border-dashed border-black/8 rounded-2xl p-12 text-center">
            <p className="text-ink/55 mb-4">Belum ada anggota tim.</p>
            <button onClick={addMember} className="text-brand font-bold hover:underline">Tambah anggota pertama</button>
          </div>
        )}
      </div>
    </AdminShell>
  )
}
