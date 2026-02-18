
interface NavbarProps {
    onSearchChange: (query: string) => void;
    onAboutClick: () => void;
    onHomeClick: () => void;
}

export default function Navbar({ onSearchChange, onAboutClick, onHomeClick }: NavbarProps) {
    return (
        <header className="sticky top-0 z-40 border-b border-zinc-900 bg-black/85 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center md:items-start">
                    <h1
                        className="text-4xl sm:text-5xl md:text-6xl font-black burn-font tracking-tight cursor-pointer"
                        onClick={onHomeClick}
                    >
                        PLOT<span className="text-primary">BURN</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 uppercase tracking-widest mt-1.5 font-mono">
                        facts stay real, reactions don't.{' '}
                        <button
                            onClick={onAboutClick}
                            className="text-primary underline underline-offset-2 hover:text-primary-hover transition-colors"
                        >
                            learn why
                        </button>
                    </p>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-80">
                        <input
                            type="text"
                            placeholder="Search epic fails..."
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-zinc-900/60 border border-zinc-700 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all font-mono"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
