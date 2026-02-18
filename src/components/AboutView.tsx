interface AboutViewProps {
    onClose: () => void;
}

export default function AboutView({ onClose }: AboutViewProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative">
            <div className="glass rounded-3xl p-6 sm:p-10 lg:p-12 border border-zinc-700/50 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-3xl text-zinc-400 hover:text-primary z-50 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center transition-colors shadow-lg"
                >
                    ×
                </button>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl burn-font text-primary mb-2">About PlotBurn</h2>
                <p className="text-xl sm:text-2xl text-zinc-300 mb-8 font-medium">
                    Movies are built on confidence. We're here to check the math.
                </p>

                <div className="space-y-6 text-zinc-300 text-base leading-relaxed">
                    <p>
                        Every year, billions of dollars are poured into creating cinematic masterpieces. But somewhere between the first draft and the final cut, logic often catches the last bus out of town. That's where PlotBurn comes in.
                    </p>
                    <p>
                        We don't hate movies; we're just stuck in a permanent state of disbelief. We're a satirical news engine dedicated to documenting the exact moments where a plot hole becomes a canyon and "vibes" replace the laws of physics.
                    </p>

                    <div className="border-l-2 border-primary/50 pl-5 py-2 my-8">
                        <h3 className="text-2xl burn-font text-primary mb-4">How We Burn:</h3>
                        <ul className="space-y-4">
                            <li>
                                <span className="text-primary font-bold">The Fact-Check:</span>{' '}
                                <span className="text-zinc-400">Our RSS feeds keep the industry facts real. If it happened in the news or on the screen, it's on the record.</span>
                            </li>
                            <li>
                                <span className="text-primary font-bold">The Reaction:</span>{' '}
                                <span className="text-zinc-400">We use AI-driven satire to process those facts into the roasting they deserve.</span>
                            </li>
                            <li>
                                <span className="text-primary font-bold">The Mission:</span>{' '}
                                <span className="text-zinc-400">To provide a high-definition intervention for scripts that forgot to make sense.</span>
                            </li>
                        </ul>
                    </div>

                    <p className="text-zinc-400 italic">
                        PlotBurn is satire for the skeptical viewer. We believe that if a movie had the audacity to ignore reality, we have the obligation to point it out.
                    </p>
                </div>
                <button
                    onClick={onClose}
                    className="mt-10 w-full bg-primary hover:bg-primary-hover text-black font-black text-lg py-4 rounded-xl uppercase tracking-widest transition-all burn-font shadow-lg"
                >
                    Back to the Roasts 🔥
                </button>
            </div>
        </div>
    );
}
