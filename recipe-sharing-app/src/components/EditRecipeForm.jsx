import { useState, useEffect } from 'react'
import useRecipeStore from './recipeStore'

export default function EditRecipeForm({ recipe }) {
  const update = useRecipeStore((s) => s.updateRecipe)
  const [title, setTitle] = useState(recipe.title)
  const [desc, setDesc] = useState(recipe.description)

  useEffect(() => {
    setTitle(recipe.title)
    setDesc(recipe.description)
  }, [recipe])

  const handle = (e) => {
    e.preventDefault()
    update({ ...recipe, title, description: desc })
  }

  return (
    <form onSubmit={handle} style={{ marginTop: 12 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
      <button type="submit">Save changes</button>
    </form>
  )
}
