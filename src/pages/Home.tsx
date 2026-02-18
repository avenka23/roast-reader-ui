import { useState } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/home/Hero';
import { RoastGrid } from '../components/home/RoastGrid';
import { RoastModal } from '../components/roast/RoastModal';
import { useRoasts } from '../hooks/useRoasts';
import type { RoastItem } from '../types/api';

export function Home() {
  const { roasts, loading, error, refetch } = useRoasts();
  const [selectedRoast, setSelectedRoast] = useState<RoastItem | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark to-dark-100">
      <div className="max-w-6xl mx-auto px-5">
        <Header />
        <Hero />
        <RoastGrid
          roasts={roasts}
          loading={loading}
          error={error}
          onRetry={refetch}
          onSelectRoast={setSelectedRoast}
        />
        <Footer />
      </div>

      <RoastModal
        item={selectedRoast}
        onClose={() => setSelectedRoast(null)}
      />
    </div>
  );
}
