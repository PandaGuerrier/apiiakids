import { Link } from '@adonisjs/inertia/react'
import { useForm } from '@inertiajs/react'
import { useRef, useState, DragEvent, ChangeEvent, FormEvent } from 'react'

export default function KidsCreate() {
  const form = useForm<{
    firstName: string
    lastName: string
    age: string
    avatar: File | null
  }>({
    firstName: '',
    lastName: '',
    age: '',
    avatar: null,
  })

  const [preview, setPreview] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function pickFile(file: File | undefined) {
    if (!file) return
    form.setData('avatar', file)
    setPreview(URL.createObjectURL(file))
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    pickFile(e.target.files?.[0])
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(false)
    pickFile(e.dataTransfer.files?.[0])
  }

  function onDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault()
    setDragging(true)
  }

  function onDragLeave() {
    setDragging(false)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    form.post('/admin/kids')
  }

  return (
    <div className="page page--narrow">
      <div className="back-link">
        <Link route="kids.index">← Retour à la liste</Link>
      </div>

      <h1>Ajouter un enfant</h1>

      <form onSubmit={handleSubmit} className="form-fields">
        <div>
          <label htmlFor="firstName">Prénom</label>
          <input
            type="text"
            id="firstName"
            placeholder="Léa"
            value={form.data.firstName}
            onChange={(e) => form.setData('firstName', e.target.value)}
            data-invalid={form.errors.firstName ? 'true' : undefined}
          />
          {form.errors.firstName && <div>{form.errors.firstName}</div>}
        </div>

        <div>
          <label htmlFor="lastName">Nom de famille</label>
          <input
            type="text"
            id="lastName"
            placeholder="Martin"
            value={form.data.lastName}
            onChange={(e) => form.setData('lastName', e.target.value)}
            data-invalid={form.errors.lastName ? 'true' : undefined}
          />
          {form.errors.lastName && <div>{form.errors.lastName}</div>}
        </div>

        <div>
          <label>Photo</label>
          <div
            className={['dropzone', dragging ? 'dropzone--active' : '', form.errors.avatar ? 'dropzone--error' : ''].filter(Boolean).join(' ')}
            onClick={() => inputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
          >
            {preview ? (
              <img src={preview} alt="Aperçu" className="dropzone-preview" />
            ) : (
              <>
                <svg className="dropzone-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="dropzone-label">Glissez une image ici, ou <strong>parcourir</strong></p>
                <p className="dropzone-hint">JPG, PNG, GIF</p>
              </>
            )}
          </div>

          {preview && (
            <button
              type="button"
              className="btn-ghost-danger"
              onClick={() => {
                form.setData('avatar', null)
                setPreview(null)
                if (inputRef.current) inputRef.current.value = ''
              }}
            >
              Retirer la photo
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/jpg,image/jpeg,image/png,image/gif"
            onChange={onFileChange}
            style={{ display: 'none' }}
          />

          {form.errors.avatar && <div className="field-error">{form.errors.avatar}</div>}
        </div>

        <div>
          <label htmlFor="age">Âge <span className="label-optional">(optionnel)</span></label>
          <input
            type="number"
            id="age"
            placeholder="7"
            min={0}
            max={18}
            value={form.data.age}
            onChange={(e) => form.setData('age', e.target.value)}
            data-invalid={form.errors.age ? 'true' : undefined}
          />
          {form.errors.age && <div>{form.errors.age}</div>}
        </div>

        <div>
          <button type="submit" disabled={form.processing}>
            {form.processing ? 'Enregistrement…' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  )
}
