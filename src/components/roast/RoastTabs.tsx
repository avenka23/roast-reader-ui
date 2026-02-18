import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RoastItem } from '../../types/api';

type TabType = 'roast' | 'vibe' | 'truth' | 'more';

interface RoastTabsProps {
  item: RoastItem;
}

export function RoastTabs({ item }: RoastTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('roast');
  const { movie, roast } = item;

  const tabs: { id: TabType; label: string }[] = [
    { id: 'roast', label: 'Roast' },
    { id: 'vibe', label: 'Internet Vibe' },
    { id: 'truth', label: 'Truth' },
    { id: 'more', label: 'More' },
  ];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-2 bg-black/30 p-2 rounded-xl mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 px-3 rounded-lg font-semibold text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-fire/20 text-fire-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'roast' && (
            <div>
              <p className="text-fire-500 text-xl font-semibold mb-4 leading-snug">
                {roast.headline}
              </p>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {roast.content.split('\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'vibe' && (
            <div className="bg-fire/5 border-l-[3px] border-fire p-4 rounded-lg">
              <h3 className="text-fire-500 text-lg font-semibold mb-4">Internet Vibe</h3>
              <ul className="space-y-3">
                {roast.internet_vibe.map((vibe, idx) => (
                  <li key={idx} className="text-gray-400 pl-6 relative">
                    <span className="absolute left-0 text-fire text-xl">&#8226;</span>
                    {vibe}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'truth' && (
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-semibold mb-2">Overview</h4>
                <p className="text-gray-400 leading-relaxed">{movie.overview}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-white font-semibold mb-1">Release Date</h4>
                  <p className="text-gray-400">{formatDate(movie.release_date)}</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Rating</h4>
                  <p className="text-gray-400">
                    {movie.vote_average.toFixed(1)} / 10
                    <span className="text-gray-500 text-sm ml-1">({movie.vote_count} votes)</span>
                  </p>
                </div>
              </div>

              {movie.genres && movie.genres.length > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-2">Genres</h4>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.runtime > 0 && (
                <div>
                  <h4 className="text-white font-semibold mb-1">Runtime</h4>
                  <p className="text-gray-400">{movie.runtime} minutes</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'more' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">Our Take</h3>
                <p className="text-gray-400 leading-relaxed">{roast.your_opinion}</p>
              </div>

              {roast.recommendation && roast.recommendation.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold text-lg mb-3">Recommended Instead:</h3>
                  <ul className="space-y-2">
                    {roast.recommendation.map((rec, idx) => (
                      <li
                        key={idx}
                        className="text-fire-500 pl-6 relative cursor-pointer hover:text-white transition-colors"
                      >
                        <span className="absolute left-0 text-fire text-xl">&#8226;</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
