import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  votesA: number;
  votesB: number;
}

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "Which event type do you despise playing the most?",
    optionA: "Challenge Events (Reflect/No Items)",
    optionB: "Tower Events (Curses & Stamina)",
    votesA: 142,
    votesB: 118,
  },
  {
    id: 2,
    question: "What's your primary strategy for a 16-star Titan?",
    optionA: "Items blazing (Scrolls/Bombs/Time Stops)",
    optionB: "Pure tile cascades and prayers",
    votesA: 95,
    votesB: 210,
  },
  {
    id: 3,
    question: "How do you feel about 5-star troop portals?",
    optionA: "Absolute gem trap",
    optionB: "Gotta pull for that extra stat boost",
    votesA: 188,
    votesB: 76,
  },
];

export default function App() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [userVotes, setUserVotes] = useState<{ [key: number]: 'A' | 'B' }>({});

  const handleVote = (id: number, choice: 'A' | 'B') => {
    if (userVotes[id]) return;

    setUserVotes(prev => ({ ...prev, [id]: choice }));
    setQuestions(prev =>
      prev.map(q => {
        if (q.id === id) {
          return {
            ...q,
            votesA: choice === 'A' ? q.votesA + 1 : q.votesA,
            votesB: choice === 'B' ? q.votesB + 1 : q.votesB,
          };
        }
        return q;
      })
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-4 sm:p-8 flex flex-col items-center">
      <header className="max-w-xl w-full text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-wider text-amber-500 uppercase mb-2">
          Empires & Polling
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base">
          Cast your votes on the ultimate community debates.
        </p>
      </header>

      <main className="max-w-xl w-full space-y-6">
        {questions.map(q => {
          const totalVotes = q.votesA + q.votesB;
          const percentA = totalVotes > 0 ? Math.round((q.votesA / totalVotes) * 100) : 50;
          const percentB = totalVotes > 0 ? 100 - percentA : 50;
          const hasVoted = !!userVotes[q.id];

          return (
            <div
              key={q.id}
              className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 shadow-xl transition-all"
            >
              <h2 className="text-lg sm:text-xl font-semibold mb-4 text-neutral-200">
                {q.question}
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => handleVote(q.id, 'A')}
                  disabled={hasVoted}
                  className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden flex justify-between items-center ${
                    hasVoted
                      ? 'border-neutral-700 bg-neutral-800/50 cursor-default'
                      : 'border-amber-500/40 hover:border-amber-500 bg-neutral-800/80 active:scale-[0.99]'
                  }`}
                >
                  {hasVoted && (
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-amber-500/20 transition-all duration-500"
                      style={{ width: `${percentA}%` }}
                    />
                  )}
                  <span className="relative z-10 font-medium text-sm sm:text-base pr-2">
                    {q.optionA}
                  </span>
                  {hasVoted && (
                    <span className="relative z-10 font-bold text-amber-400 text-sm sm:text-base pl-2">
                      {percentA}%
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleVote(q.id, 'B')}
                  disabled={hasVoted}
                  className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden flex justify-between items-center ${
                    hasVoted
                      ? 'border-neutral-700 bg-neutral-800/50 cursor-default'
                      : 'border-amber-500/40 hover:border-amber-500 bg-neutral-800/80 active:scale-[0.99]'
                  }`}
                >
                  {hasVoted && (
                    <div
                      className="absolute left-0 top-0 bottom-0 bg-amber-500/20 transition-all duration-500"
                      style={{ width: `${percentB}%` }}
                    />
                  )}
                  <span className="relative z-10 font-medium text-sm sm:text-base pr-2">
                    {q.optionB}
                  </span>
                  {hasVoted && (
                    <span className="relative z-10 font-bold text-amber-400 text-sm sm:text-base pl-2">
                      {percentB}%
                    </span>
                  )}
                </button>
              </div>

              {hasVoted && (
                <p className="text-right text-xs text-neutral-500 mt-3">
                  {totalVotes} total votes
                </p>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
}
