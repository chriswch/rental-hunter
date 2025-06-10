export function Header() {
  return (
    <div className="flex flex-row justify-center gap-2">
      <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
        <span className="text-xl font-bold text-white">FB</span>
      </div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Scraper
      </h1>
    </div>
  );
}
