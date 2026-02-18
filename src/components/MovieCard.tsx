import type { Movie } from '../types';
import { getImageUrl } from '../services/api';

interface MovieCardProps {
    movie: Movie;
    onClick: () => void;
}

const getScoreColor = (bars: number) => {
    if (bars >= 7) return 'text-emerald-400';
    if (bars >= 5) return 'text-yellow-400';
    return 'text-red-400';
};
const getScoreBg = (bars: number) => {
    if (bars >= 7) return 'bg-emerald-400';
    if (bars >= 5) return 'bg-yellow-400';
    return 'bg-red-400';
};


export default function MovieCard({ movie, onClick }: MovieCardProps) {
    const backdrop = movie.backdrop_path
        ? getImageUrl(movie.backdrop_path, 'w780')
        : getImageUrl(movie.poster_path, 'w780');

    // Fallback to vote_average if roast.reception.bars is missing
    const bars = movie.roast?.reception?.bars ?? Math.round(movie.vote_average) ?? 0;
    const scoreColor = getScoreColor(bars);
    const scoreBg = getScoreBg(bars);

    return (
        <div
            onClick={onClick}
            className="group glass rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer card-hover flex flex-col h-full border border-zinc-800/50"
        >
            <div className="relative aspect-video overflow-hidden bg-black">
                <img
                    src={backdrop}
                    alt={movie.title}
                    loading="lazy"
                    className="w-full h-full object-cover grayscale-[0.35] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#0f0f14] via-[#0f0f14]/80 to-transparent"></div>
                <div className="absolute bottom-3 left-3 flex flex-col gap-1 z-10">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest font-mono">Internet Says</span>
                    <span className={`bg-black/75 backdrop-blur-sm ${scoreColor} text-sm font-black px-2.5 py-1 rounded border border-white/10 inline-flex items-center gap-2 font-mono`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${scoreBg} animate-pulse`}></span>
                        {bars}/10
                    </span>
                </div>
            </div>

            <div className="p-6 flex-grow flex flex-col bg-[#0f0f14] relative z-10 -mt-px">
                <div className="border-l-2 border-primary/30 pl-3 mb-3">
                    <p className="text-sm font-bold text-zinc-300 uppercase tracking-wider font-mono">{movie.title}</p>
                </div>

                <h3 className="text-2xl burn-font font-black leading-[1.1] uppercase pb-2 text-zinc-100 group-hover:text-primary transition-colors line-clamp-3 h-[3.4em]">
                    {movie.roast.headline}
                </h3>
            </div>
        </div>
    );
}
