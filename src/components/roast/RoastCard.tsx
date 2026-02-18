import type { RoastItem } from '../../types/api';
import { getImageUrl, PLACEHOLDER_POSTER } from '../../config/api';
import { SatireBadge } from './SatireBadge';

interface RoastCardProps {
  item: RoastItem;
  onClick: () => void;
}

export function RoastCard({ item, onClick }: RoastCardProps) {
  const { movie, roast } = item;
  const posterUrl = getImageUrl(movie.poster_path) || PLACEHOLDER_POSTER;

  // Get first 3 vibes as tags
  const tags = roast.internet_vibe.slice(0, 3);

  // Truncate content for preview
  const contentPreview = roast.content.length > 150
    ? roast.content.substring(0, 150) + '...'
    : roast.content;

  return (
    <article className="bg-white/[0.03] rounded-2xl overflow-hidden border border-white/5 transition-all hover:-translate-y-1 hover:border-fire/30 hover:shadow-[0_10px_40px_rgba(255,87,34,0.2)] cursor-pointer group">
      <div className="relative">
        <img
          src={posterUrl}
          alt={`${movie.title} poster`}
          className="w-full h-64 object-cover bg-gradient-to-br from-dark-200 to-dark-100"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_POSTER;
          }}
        />
        <SatireBadge />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
        <p className="text-fire-500 text-lg font-semibold mb-3 leading-snug">
          {roast.headline}
        </p>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {contentPreview}
        </p>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-fire/15 border border-fire/30 text-fire-500 px-3 py-1.5 rounded-full text-xs font-medium"
              >
                {tag.length > 25 ? tag.substring(0, 25) + '...' : tag}
              </span>
            ))}
          </div>
        )}

        <button
          onClick={onClick}
          className="text-fire font-semibold text-sm transition-all group-hover:text-fire-500 hover:translate-x-1 inline-flex items-center gap-1"
        >
          Full Roast
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </button>
      </div>
    </article>
  );
}
