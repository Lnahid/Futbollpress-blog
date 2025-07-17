const categories = [
  'Hamısı',
  'La Liga',
  'Premier League',
  'UEFA',
  'Transferlər',
  'Dünya Çempionatı',
];

function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`px-4 py-1 rounded-full border text-sm font-medium transition ${selected === cat ? 'bg-sky text-white' : 'bg-light text-navy border-sky hover:bg-sky/10'}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter; 