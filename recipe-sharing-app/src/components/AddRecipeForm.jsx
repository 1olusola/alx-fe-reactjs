import { useState } from 'react'
import useRecipeStore from './recipeStore'

export default function AddRecipeForm() {
  const addRecipe = useRecipeStore((s) => s.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    addRecipe({ id: Date.now(), title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        placeholder="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Short description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Recipe</button>
    </form>
  )
}
