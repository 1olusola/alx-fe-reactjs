import { useState, useEffect } from 'react'
import useRecipeStore from './recipeStore'

export default function EditRecipeForm({ recipe }) {
  const updateRecipe = useRecipeStore((s) => s.updateRecipe)
  const [title, setTitle] = useState(recipe.title)
  const [description, setDescription] = useState(recipe.description)

  useEffect(() => {
    setTitle(recipe.title)
    setDescription(recipe.description)
  }, [recipe])

  const handleSubmit = (event) => {
    event.preventDefault() // <-- now present
    updateRecipe({ ...recipe, title, description })
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Save changes</button>
    </form>
  )
}
