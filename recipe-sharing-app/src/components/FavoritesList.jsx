import useRecipeStore from '../store/recipeStore'

export default function FavoritesList() {
  const favs = useRecipeStore((s) =>
    s.favorites
      .map((id) => s.recipes.find((r) => r.id === id))
      .filter(Boolean)
  )

  return (
    <>
      <h2>My Favorites</h2>
      {favs.length === 0 && <p>No favorites yet.</p>}
      {favs.map((r) => (
        <div key={r.id} style={{ border: '1px solid #ccc', padding: 8 }}>
          <h3>{r.title}</h3>
          <p>{r.description}</p>
        </div>
      ))}
    </>
  )
}
