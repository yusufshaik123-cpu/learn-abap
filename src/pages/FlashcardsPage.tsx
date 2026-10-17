import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCw,
  CheckCircle2,
  Clock,
  Layers,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Award,
  ArrowRight
} from 'lucide-react';
import { api } from '../api';
import { CodeBlock } from '../components/CodeBlock';
import type { Flashcard } from '../types';

export const FlashcardsPage: React.FC = () => {
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [filteredCards, setFilteredCards] = useState<Flashcard[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ratingLoading, setRatingLoading] = useState(false);

  useEffect(() => {
    async function loadCards() {
      try {
        const res = await api.getFlashcards();
        setCards(res.cards);
        setFilteredCards(res.cards);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCards();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredCards(cards);
    } else {
      setFilteredCards(cards.filter(c => c.category === selectedCategory));
    }
    setCurrentIdx(0);
    setIsFlipped(false);
  }, [selectedCategory, cards]);

  const handleRating = async (rating: 'again' | 'hard' | 'good' | 'easy') => {
    const card = filteredCards[currentIdx];
    if (!card) return;
    setRatingLoading(true);
    try {
      await api.reviewCard(card.id, rating);
      // Move to next card
      if (currentIdx < filteredCards.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setIsFlipped(false);
      } else {
        setIsFlipped(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRatingLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(cards.map(c => c.category)))];

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500 font-mono">
        Loading flashcards and spaced repetition schedules...
      </div>
    );
  }

  const currentCard = filteredCards[currentIdx];

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
          <Sparkles className="w-6 h-6 text-indigo-400" />
          <span>Spaced Repetition Flashcards</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
          Reinforce syntax memory, system fields, OOP rules, and RAP terminology using the SuperMemo-2 (SM-2) algorithm.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors capitalize ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredCards.length === 0 ? (
        <div className="p-12 text-center text-xs text-slate-500 bg-slate-900 rounded-2xl border border-slate-800">
          No flashcards found for category "{selectedCategory}".
        </div>
      ) : (
        <div className="space-y-4">
          {/* Card Progress Indicator */}
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>
              Card {currentIdx + 1} of {filteredCards.length}
            </span>
            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {currentCard?.category}
            </span>
          </div>

          {/* Interactive Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="min-h-[320px] rounded-3xl border border-slate-800 bg-slate-900/90 hover:border-slate-700 cursor-pointer p-6 sm:p-10 flex flex-col justify-between shadow-2xl transition-all relative overflow-hidden select-none"
          >
            {/* Top Indicator */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono uppercase text-[10px] tracking-wider">
                {isFlipped ? 'Answer & Explanation' : 'Question / Concept'}
              </span>
              <div className="flex items-center gap-1.5 text-indigo-400 text-[11px] font-semibold">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click card to flip</span>
              </div>
            </div>

            {/* Card Body */}
            <div className="my-auto py-4">
              {!isFlipped ? (
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-relaxed">
                    {currentCard?.front}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Think of the technical rationale before flipping to review the answer.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="text-base sm:text-lg font-semibold text-emerald-300 whitespace-pre-wrap leading-relaxed">
                    {currentCard?.back}
                  </div>

                  {currentCard?.code_snippet && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <CodeBlock code={currentCard.code_snippet} title="Syntax Reference" />
                    </div>
                  )}

                  {currentCard?.mnemonic && (
                    <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 text-amber-300 text-xs flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                      <span><strong>Memory Aid: </strong>{currentCard.mnemonic}</span>
                    </div>
                  )}

                  {currentCard?.explanation && (
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {currentCard.explanation}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-4 border-t border-slate-800/80">
              <span>Difficulty: {currentCard?.difficulty}</span>
              <span>Review Interval: {currentCard?.interval_days || 1} day(s)</span>
            </div>
          </div>

          {/* Spaced Repetition Rating Buttons (Visible when flipped) */}
          {isFlipped && (
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 animate-fade-in">
              <div className="text-center text-xs font-semibold text-slate-300">
                Rate your recall to schedule the next review:
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleRating('again')}
                  disabled={ratingLoading}
                  className="py-2.5 px-3 rounded-xl bg-rose-950/30 hover:bg-rose-900/50 border border-rose-800/40 text-rose-300 text-xs font-bold transition-all text-center"
                >
                  <div>Again</div>
                  <div className="text-[10px] text-rose-400/80 font-normal mt-0.5">&lt; 12 hours</div>
                </button>

                <button
                  onClick={() => handleRating('hard')}
                  disabled={ratingLoading}
                  className="py-2.5 px-3 rounded-xl bg-amber-950/30 hover:bg-amber-900/50 border border-amber-800/40 text-amber-300 text-xs font-bold transition-all text-center"
                >
                  <div>Difficult</div>
                  <div className="text-[10px] text-amber-400/80 font-normal mt-0.5">1-2 days</div>
                </button>

                <button
                  onClick={() => handleRating('good')}
                  disabled={ratingLoading}
                  className="py-2.5 px-3 rounded-xl bg-indigo-950/30 hover:bg-indigo-900/50 border border-indigo-800/40 text-indigo-300 text-xs font-bold transition-all text-center"
                >
                  <div>Good</div>
                  <div className="text-[10px] text-indigo-400/80 font-normal mt-0.5">3-4 days</div>
                </button>

                <button
                  onClick={() => handleRating('easy')}
                  disabled={ratingLoading}
                  className="py-2.5 px-3 rounded-xl bg-emerald-950/30 hover:bg-emerald-900/50 border border-emerald-800/40 text-emerald-300 text-xs font-bold transition-all text-center"
                >
                  <div>Easy</div>
                  <div className="text-[10px] text-emerald-400/80 font-normal mt-0.5">5+ days</div>
                </button>
              </div>
            </div>
          )}

          {/* Prev / Next Manual Step Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                setCurrentIdx(prev => Math.max(0, prev - 1));
                setIsFlipped(false);
              }}
              disabled={currentIdx === 0}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 text-xs flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous Card</span>
            </button>

            <button
              onClick={() => {
                setCurrentIdx(prev => Math.min(filteredCards.length - 1, prev + 1));
                setIsFlipped(false);
              }}
              disabled={currentIdx === filteredCards.length - 1}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 text-xs flex items-center gap-1"
            >
              <span>Next Card</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
