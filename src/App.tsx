import React, { useState } from 'react';

export default function App() {
  const [hasVoted, setHasVoted] = useState(false);
  const [userVote, setUserVote] = useState<'yes' | 'no' | null>(null);

  // Hardcoded current stats for today's question (can be hooked up to a backend later)
  const [votes, setVotes] = useState({ yes: 1420, no: 385 });

  const totalVotes = votes.yes + votes.no;
  const yesPercentage = Math.round((votes.yes / totalVotes) * 100);
  const noPercentage = 100 - yesPercentage;

  const handleVote = (choice: 'yes' | 'no') => {
    if (hasVoted) return;
    setVotes((prev) => ({
      ...prev,
      [choice]: prev[choice] + 1,
    }));
    setUserVote(choice);
    setHasVoted(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Header */}
      <header className="max-w-xl mx-auto w-full text-center pt-6">
        <h1 className="text-2xl sm:text-3xl font-black tracking-wider uppercase text-amber-500">
          Empires & Polls
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Your quick daily community pulse. One question. One vote.
        </p>
      </header>

      {/* Main Question Card */}
      <main className="max-w-xl mx-auto w-full my-auto py-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="bg-amber-500/10 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/20 uppercase tracking-widest">
              Question of the Day
            </span>
            <span className="text-zinc-500 text-xs">
              {totalVotes.toLocaleString()} total votes
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-8 leading-snug">
            Are 5-star troop portals worth the gem investment for regular players?
          </h2>

          {/* Voting Options or Results */}
          {!hasVoted ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleVote('yes')}
                className="group relative flex items-center justify-center py-4 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-lg transition-all shadow-lg active:scale-95 cursor-pointer"
              >
                Yes, absolutely
              </button>
              <button
                onClick={() => handleVote('no')}
                className="group relative flex items-center justify-center py-4 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold text-lg transition-all border border-zinc-700 active:scale-95 cursor-pointer"
              >
                Total trap
              </button>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="text-center text-sm font-medium text-amber-400 mb-2">
                Thanks for voting! Here is how the community stands:
              </div>

              {/* Yes Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className={userVote === 'yes' ? 'font-bold text-amber-400' : 'text-zinc-300'}>
                    Yes, absolutely {userVote === 'yes' && '(You)'}
                  </span>
                  <span className="font-semibold text-zinc-300">{yesPercentage}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${yesPercentage}%` }}
                  />
                </div>
              </div>

              {/* No Bar */}
              <div className="space-y-1 pt-2">
                <div className="flex justify-between text-sm">
                  <span className={userVote === 'no' ? 'font-bold text-amber-400' : 'text-zinc-300'}>
                    Total trap {userVote === 'no' && '(You)'}
                  </span>
                  <span className="font-semibold text-zinc-300">{noPercentage}%</span>
                </div>
                <div className="w-full bg-zinc-800 h-4 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
                  <div
                    className="bg-zinc-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${noPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-xl mx-auto w-full text-center text-xs text-zinc-600 pb-2">
        New question drops daily. Check back tomorrow.
      </footer>
    </div>
  );
}
