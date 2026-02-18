export function Header() {
  return (
    <header className="py-8 border-b border-fire/10">
      <div className="logo text-3xl font-extrabold tracking-tight">
        <span className="text-white">Plot</span>
        <span className="text-fire drop-shadow-[0_0_20px_rgba(255,87,34,0.5)]">Burn</span>
      </div>
      <p className="text-gray-500 text-sm mt-2 italic">
        Facts stay real. Reactions don't.
      </p>
    </header>
  );
}
