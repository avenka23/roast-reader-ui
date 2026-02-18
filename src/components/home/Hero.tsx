export function Hero() {
  const scrollToRoasts = () => {
    document.getElementById('roasts')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="text-center py-16 relative overflow-hidden">
      {/* Background fire emoji */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-[20rem] opacity-[0.03] select-none">
          Fire
        </span>
      </div>

      <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-br from-white to-fire bg-clip-text text-transparent relative">
        Roast Reader
      </h1>
      <p className="text-xl text-gray-400 mb-8 relative">
        Where movies get the honest treatment they deserve
      </p>
      <button
        onClick={scrollToRoasts}
        className="inline-block px-10 py-4 bg-gradient-to-br from-fire to-fire-700 text-white rounded-full font-semibold text-lg transition-all hover:-translate-y-0.5 shadow-[0_10px_30px_rgba(255,87,34,0.3)] hover:shadow-[0_15px_40px_rgba(255,87,34,0.4)] relative"
      >
        Read Today's Roasts
      </button>
    </section>
  );
}
