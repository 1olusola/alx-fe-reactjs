import Search from './components/Search';

export default function App() {
  return (
    <main className="min-h-screen bg-gray-50">
      <h1 className="text-center text-3xl font-bold pt-10">
        GitHub User Search
      </h1>
      <Search />
    </main>
  );
}