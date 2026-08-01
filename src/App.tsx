import React, { useState } from 'react';

interface Poll {
  id: number;
  date: string;
  question: string;
  yesLabel: string;
  noLabel: string;
  votesYes: number;
  votesNo: number;
  userVote?: 'yes' | 'no';
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'archive'>('home');

  // Past and current questions registry
  const [polls, setPolls] = useState<Poll[]>([
    {
      id: 1,
      date: 'Today',
      question: 'Are 5-star troop portals worth the gem investment for regular players?',
      yesLabel: 'Yes, absolutely',
      noLabel: 'Total trap',
      votesYes: 1424,
      votesNo: 381,
    },
    {
      id: 2,
      date: 'Yesterday',
      question: 'Should Challenge Events remove global elemental defense stacking?',
      yesLabel: 'Yes, keep it fair',
      noLabel: 'No, let it roll',
      votesYes: 942,
      votesNo: 615,
      userVote: 'yes',
    },
    {
      id: 3,
      date: '3 days ago',
      question: 'Are modern 5-star heroes entirely overpowering older Season 1 rosters?',
      yesLabel: 'Totally obsolete',
      noLabel: 'Still viable with costumes',
      votesYes: 1210,
      votesNo: 490,
      userVote: 'no',
    },
  ]);

  const handleVote = (id: number, choice: 'yes' | 'no') => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === id && !poll.userVote) {
          // Strictly positive upward increment within your 103 - 362 range
          const upwardIncrement = Math.floor(Math.random() * (362 - 103 + 1)) + 103;
          return {
            ...poll,
            userVote: choice,
            votesYes: choice === 'yes' ? poll.votesYes + upwardIncrement : poll.votesYes,
            votesNo: choice === 'no' ? poll.votesNo + upwardIncrement : poll.votesNo,
          };
        }
        return poll;
      })
    );
  };

  const todayPoll = polls[0];
  const yesterdayPoll = polls[1];
  const archivedPolls = polls.slice(1);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between p-4 sm:p-8 font-sans">
      {/* Header */}
      <header className="max-w-xl mx-auto w-full text-center pt-6">
        <h1 
          className="text-2xl sm:text-3xl font-black tracking-wider uppercase text-amber-500 cursor-pointer" 
          onClick={() => setCurrentTab('home')}
        >
          Empires & Polls
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Your quick daily community pulse. One question. One vote.
        </p>

        {/* Navigation Tabs */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setCurrentTab('home')}
            className={`text-xs uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              currentTab === 'home'
                ? 'bg-amber-500 text-zinc-950 shadow-lg'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            Today's Poll
          </button>
          <button
            onClick={() => setCurrentTab('archive')}
            className={`text-xs uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              currentTab === 'archive'
                ? 'bg-amber-500 text-zinc-950 shadow-lg'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            Archive
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-xl mx-auto w-full my-6 space-y-6">
        {currentTab === 'home' ? (
          <>
            {/* Question of the Day Card */}
            <PollCard poll={todayPoll} onVote={handleVote} isToday={true} />

            {/* Previous Day Preview Card */}
            {yesterdayPoll && (
              <div className="pt-2">
                <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 px-1">
                  Previous Day's Question
                </div>
                <PollCard poll={yesterdayPoll} onVote={handleVote} isToday={false} />
              </div>
            )}
          </>
        ) : (
          /* Archive View */
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-lg font-bold text-amber-400 border-b border-zinc-800 pb-2">
              Past Community Debates ({archivedPolls.length})
            </h2>
            {archivedPolls.map((poll) => (
              <PollCard key={poll.id} poll={poll} onVote={handleVote} isToday={false} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-xl mx-auto w-full text-center text-xs text-zinc-600 pb-2">
        New question drops daily. Check back tomorrow.
      </footer>
    </div>
  );
}

// Reusable Poll Card Component
function PollCard({
  poll,
  onVote,
  isToday,
}: {
  poll: Poll;
  onVote: (id: number, choice: 'yes' | 'no') => void;
  isToday: boolean;
}) {
  const totalVotes = poll.votesYes + poll.votesNo;
  const yesPercentage = Math.round((poll.votesYes / totalVotes) * 100);
  const noPercentage = 100 - yesPercentage;
  const hasVoted = poll.userVote !== undefined;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full border uppercase tracking-widest ${
            isToday
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
          }`}
        >
          {poll.date}
        </span>
        <span className="text-zinc-500 text-xs">{totalVotes.toLocaleString()} total votes</span>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-6 leading-snug">
        {poll.question}
      </h3>

      {!hasVoted ? (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => onVote(poll.id, 'yes')}
            className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all shadow-lg active:scale-95 cursor-pointer text-sm sm:text-base"
          >
            {poll.yesLabel}
          </button>
          <button
            onClick={() => onVote(poll.id, 'no')}
            className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold transition-all border border-zinc-700 active:scale-95 cursor-pointer text-sm sm:text-base"
          >
            {poll.noLabel}
          </button>
        </div>
      ) : (
        <div className="space-y-3 animate-fadeIn">
          <div className="text-xs font-medium text-amber-400 mb-1">
            {isToday ? 'Thanks for voting! Community results:' : 'Final community results:'}
          </div>

          {/* Yes Option Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className={poll.userVote === 'yes' ? 'font-bold text-amber-400' : 'text-zinc-300'}>
                {poll.yesLabel} {poll.userVote === 'yes' && '(You)'}
              </span>
              <span className="font-semibold text-zinc-300">{yesPercentage}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-1000"
                style={{ width: `${yesPercentage}%` }}
              />
            </div>
          </div>

          {/* No Option Bar */}
          <div className="space-y-1 pt-1">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className={poll.userVote === 'no' ? 'font-bold text-amber-400' : 'text-zinc-300'}>
                {poll.noLabel} {poll.userVote === 'no' && '(You)'}
              </span>
              <span className="font-semibold text-zinc-300">{noPercentage}%</span>
            </div>
            <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden p-0.5 border border-zinc-700/50">
              <div
                className="bg-zinc-600 h-full rounded-full transition-all duration-1000"
                style={{ width: `${noPercentage}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
