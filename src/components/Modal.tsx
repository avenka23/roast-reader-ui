import { useEffect, useRef, useCallback } from 'react';
import type { Movie } from '../types';
import { getImageUrl } from '../services/api';

interface ModalProps {
    movie: Movie | null;
    onClose: () => void;
}

const getScoreColor = (bars: number) => {
    if (bars >= 7) return 'text-emerald-400';
    if (bars >= 5) return 'text-yellow-400';
    return 'text-red-400';
};

export default function Modal({ movie, onClose }: ModalProps) {
    const historyPushed = useRef(false);

    const handleClose = useCallback(() => {
        // If we pushed history and user closes via X button, go back to clean up
        if (historyPushed.current) {
            historyPushed.current = false;
            window.history.back();
        } else {
            onClose();
        }
    }, [onClose]);

    useEffect(() => {
        if (movie) {
            document.body.style.overflow = 'hidden';
            // Push state to handle back button
            window.history.pushState({ modal: true }, '');
            historyPushed.current = true;

            const handlePopState = () => {
                historyPushed.current = false;
                onClose();
            };

            window.addEventListener('popstate', handlePopState);
            return () => {
                window.removeEventListener('popstate', handlePopState);
                document.body.style.overflow = '';
            };
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [movie, onClose]);

    if (!movie) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) handleClose();
    };

    const bars = movie.roast?.reception?.bars ?? Math.round(movie.vote_average) ?? 0;
    const scoreColor = getScoreColor(bars);

    const copyCaption = () => {
        const caption = movie.roast.shareable_caption || `Check out this roast of ${movie.title} on PlotBurn!`;
        navigator.clipboard.writeText(caption);
        const btn = document.getElementById('share-btn');
        if (btn) {
            const originalText = btn.innerText;
            btn.innerText = 'COPIED 🔥';
            setTimeout(() => btn.innerText = originalText, 1800);
        }
    };

    const roastText = movie.roast.roast || movie.roast.body || "No roast available.";

    const modalImage = movie.poster_path
        ? getImageUrl(movie.poster_path, 'w780')
        : getImageUrl(movie.backdrop_path, 'w780');

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-blur overflow-hidden animate-in fade-in duration-200"
            onClick={handleBackdropClick}
        >
            {/* Close button - outside modal for proper fixed positioning on mobile */}
            <button
                onClick={handleClose}
                className="fixed top-6 right-6 md:absolute md:top-8 md:right-8 text-3xl text-zinc-400 hover:text-primary z-[60] bg-black/70 rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-lg"
            >
                ×
            </button>

            <div className="glass w-full max-w-4xl rounded-2xl sm:rounded-3xl shadow-2xl relative flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-hidden custom-scrollbar border border-zinc-700">


                <div className="w-full md:w-5/12 bg-black border-b md:border-b-0 md:border-r border-zinc-700/50 relative shrink-0">
                    <div className="aspect-[2/3] w-full md:h-full">
                        <img
                            src={modalImage}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                </div>

                <div className="p-5 sm:p-8 md:p-10 w-full md:w-7/12 md:overflow-y-auto custom-scrollbar flex flex-col bg-zinc-900/40">
                    <div className="mb-5">
                        <span className="inline-block bg-primary text-black text-xs sm:text-sm font-black px-3 py-1 rounded-sm uppercase tracking-wider mb-2 font-mono">
                            {movie.roast?.reception?.label || (bars >= 7 ? 'FRESH' : bars >= 5 ? 'MID' : 'ROASTED')}
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl burn-font leading-tight uppercase text-white">
                            {movie.roast.headline}
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-7">
                        <div className="bg-zinc-800/40 p-4 rounded-lg border border-zinc-700/40">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1 font-mono">Internet Says</h4>
                            <div className="flex items-baseline gap-2">
                                <span className={`text-4xl font-black font-mono ${scoreColor}`}>{bars}</span>
                                <span className="text-sm text-zinc-600 font-mono">/10</span>
                            </div>
                        </div>

                        {movie.streaming_providers && movie.streaming_providers.length > 0 && (
                            <div className="bg-zinc-800/40 p-4 rounded-lg border border-zinc-700/40 flex flex-col justify-between">
                                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">Streaming On</h4>
                                <div className="flex items-center gap-3">
                                    <img
                                        src={getImageUrl(movie.streaming_providers[0].logo, 'w154')}
                                        alt={movie.streaming_providers[0].name}
                                        className="h-8 w-auto rounded object-contain"
                                    />
                                    <span className="text-sm font-bold text-zinc-200 font-mono line-clamp-1">{movie.streaming_providers[0].name}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {movie.roast.overview && (
                        <div className="mb-6">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 font-mono">The Plot</h4>
                            <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-800/25 p-4 rounded-lg border border-zinc-700/40">
                                {movie.roast.overview}
                            </p>
                        </div>
                    )}

                    <div className="mb-8">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 font-mono">The Burn</h4>
                        <p className="text-xl sm:text-2xl text-zinc-100 leading-relaxed italic border-l-4 border-primary pl-5 sm:pl-6">
                            {roastText}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8 border-b border-zinc-700/50 pb-8">
                        {(movie.roast.chips || []).map((c: string, i: number) => (
                            <span key={i} className="chip bg-white/5 text-zinc-300 px-3 py-1.5 rounded border border-white/10 text-[12px] font-bold">
                                #{c.replace(/\s+/g, '')}
                            </span>
                        ))}
                    </div>

                    {movie.roast.similar_movies && movie.roast.similar_movies.length > 0 && (
                        <div className="bg-black/40 p-5 rounded-lg border border-zinc-700 mb-6 font-mono">
                            <h4 className="text-xs font-bold text-zinc-500 uppercase mb-3 tracking-wider">Similar Disasters</h4>
                            <ul className="text-sm space-y-2.5 text-zinc-300 italic">
                                {movie.roast.similar_movies.map((m: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2.5 font-mono">
                                        <span className="text-primary">&gt;&gt;</span> {m}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-auto pt-6 border-t border-zinc-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs font-mono text-zinc-500">
                        <span>DATA_SRC: OPEN_WEB</span>
                        <span>{movie.generated_at ? new Date(movie.generated_at).toLocaleDateString() : ''}</span>
                    </div>

                    <button
                        id="share-btn"
                        onClick={copyCaption}
                        className="mt-6 w-full bg-primary hover:bg-primary-hover text-black font-black text-lg py-4 rounded-xl uppercase tracking-widest transition-all burn-font shadow-md"
                    >
                        Spread the Burn 🔥
                    </button>
                </div>
            </div>
        </div>
    );
}
