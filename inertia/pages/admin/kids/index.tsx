import { Link } from '@adonisjs/inertia/react'
import { router } from '@inertiajs/react'
import { useState } from 'react'

export type Kid = {
  id: number
  firstName: string
  lastName: string
  age: number | null
}

export default function KidsIndex({ kids }: { kids: Kid[] }) {
  const [recherche, setRecherche] = useState('')

  const kidsFiltres = kids.filter((kid) => {
    const q = recherche.toLowerCase()
    return (
      kid.firstName.toLowerCase().includes(q) ||
      kid.lastName.toLowerCase().includes(q)
    )
  })

  function supprimerEnfant(id: number) {
    router.delete(`/admin/kids/${id}`)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Enfants</h1>
        <Link route="kids.create">
          <span className="btn-primary">+ Ajouter un enfant</span>
        </Link>
      </div>

      {kids.length > 0 && (
        <div className="search-bar">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
          <input
            type="search"
            placeholder="Rechercher par prénom ou nom…"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
        </div>
      )}

      {kids.length === 0 ? (
        <div className="empty-state">
          <p>Aucun enfant pour l'instant.</p>
          <p className="empty-hint">Commencez par en ajouter un.</p>
        </div>
      ) : kidsFiltres.length === 0 ? (
        <div className="empty-state">
          <p>Aucun résultat pour « {recherche} ».</p>
        </div>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Nom</th>
              <th>Âge</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {kidsFiltres.map((kid) => (
              <tr key={kid.id}>
                <td>
                  <img
                    src={`/api/kid/${kid.firstName}/${kid.lastName}`}
                    alt={`${kid.firstName} ${kid.lastName}`}
                    className="avatar"
                  />
                </td>
                <td className="name-cell">
                  {kid.firstName} {kid.lastName}
                </td>
                <td className="muted">{kid.age != null ? `${kid.age} ans` : '—'}</td>
                <td className="action-cell">
                  <button onClick={() => supprimerEnfant(kid.id)} className="btn-danger">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
