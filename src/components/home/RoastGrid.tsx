import type { RoastItem } from '../../types/api';
import { RoastCard } from '../roast/RoastCard';
import { RoastCardSkeleton } from '../ui/Skeleton';
import { ErrorState } from '../ui/ErrorState';
import { EmptyState } from '../ui/EmptyState';

interface RoastGridProps {
  roasts: RoastItem[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onSelectRoast: (roast: RoastItem) => void;
}

export function RoastGrid({ roasts, loading, error, onRetry, onSelectRoast }: RoastGridProps) {
  return (
    <section id="roasts">
      <div className="flex items-center gap-4 my-12 pb-4 border-b-2 border-fire/20">
        <span className="text-2xl animate-flicker">Fire</span>
        <h2 className="text-3xl font-bold text-white">Today's Roasts</h2>
      </div>

      {error ? (
        <ErrorState message={error} onRetry={onRetry} />
      ) : loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {[...Array(4)].map((_, i) => (
            <RoastCardSkeleton key={i} />
          ))}
        </div>
      ) : roasts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {roasts.map((item) => (
            <RoastCard
              key={item.movie.id}
              item={item}
              onClick={() => onSelectRoast(item)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
