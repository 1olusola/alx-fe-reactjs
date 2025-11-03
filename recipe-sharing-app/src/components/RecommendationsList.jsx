import { useEffect } from 'react'
import useRecipeStore from '../store/recipeStore'

export default function RecommendationsList() {
  const generate = useRecipeStore((s) => s.generateRecommendations)
  const recs = useRecipeStore((s) => s.recommendations)

  useEffect(() => {
    generate()
  }, [generate])

  return (
    <>
      <h2>Recommended for you</h2>
      {recs.length === 0 && <p>Mark some recipes as favorite to see suggestions.</p>}
      {recs.map((r) => (
        <div key={r.id} style={{ border: '1px solid #ccc', padding: 8 }}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
        </div>
      ))}
    </>
  )
}
