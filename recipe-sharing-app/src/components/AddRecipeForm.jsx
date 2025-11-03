import { useState } from 'react'
import useRecipeStore from './recipeStore'

export default function AddRecipeForm() {
  const add = useRecipeStore((s) => s.addRecipe)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  const handle = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    add({ id: Date.now(), title, description: desc })
    setTitle('')
    setDesc('')
  }

  return (
    <form onSubmit={handle} style={{ marginBottom: 20 }}>
      <input
        placeholder="Recipe title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Short description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit">Add Recipe</button>
    </form>
  )
}
