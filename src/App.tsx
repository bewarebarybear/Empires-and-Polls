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

interface SummonResult {
  rarity: 'Legendary' | 'Epic' | 'Rare';
  color: string;
  name: string;
}

const initialPolls: Poll[] = [
  { id: 1, date: 'Today', question: 'Are 3-star tournaments actually more fun and skill-dependent than 5-star rush wars?', yesLabel: 'Pure tactical bliss', noLabel: 'Just a stat-check coin flip', votesYes: 412, votesNo: 185 },
  { id: 2, date: 'Yesterday', question: 'Is a maxed 4-star healer like Gullinbursti still more valuable to a roster than half your 5-star roster?', yesLabel: 'Absolutely essential', noLabel: 'Overrated hogwash', votesYes: 480, votesNo: 110 },
  { id: 3, date: '3 days ago', question: 'Does the Tavern of Legends portal feel like a completely obsolete waste of hard-earned keys?', yesLabel: 'Total museum artifact', noLabel: 'Still hunt those old heroes', votesYes: 520, votesNo: 130 },
  { id: 4, date: '4 days ago', question: 'Should Alchemy Lab Level 10 be reworked to actually guarantee a non-Season 1 hero?', yesLabel: 'Long overdue fix', noLabel: 'Keep the RNG brutal', votesYes: 610, votesNo: 75 },
  { id: 5, date: '5 days ago', question: 'Is matching color stacks on a 16-star titan still viable compared to bringing Wu Kong and high-tile-attack off-color heroes?', yesLabel: 'Stack or die', noLabel: 'Wu Kong reigns supreme', votesYes: 340, votesNo: 290 },
  { id: 6, date: '6 days ago', question: 'Are Alliance Quests too frustrating and item-heavy to genuinely enjoy?', yesLabel: 'Pure battle item drain', noLabel: 'Love the competitive grind', votesYes: 390, votesNo: 210 },
  { id: 7, date: '7 days ago', question: 'Do Mythic Titans bring a healthy cooperative challenge to alliances, or are they a chore?', yesLabel: 'Great team effort', noLabel: 'Just another scoreboard stress', votesYes: 360, votesNo: 195 },
  { id: 8, date: '8 days ago', question: 'Is path of valor worth completing without buying the premium raid pass tier?', yesLabel: 'Free rewards are plenty', noLabel: 'Premium pass is mandatory', votesYes: 310, votesNo: 265 },
  { id: 9, date: '9 days ago', question: 'Did Limit Breakers (Aether powers) ruin the classic hero balance of the game?', yesLabel: 'Completely broke the meta', noLabel: 'Kept the game fresh', votesYes: 440, votesNo: 190 },
  { id: 10, date: '10 days ago', question: 'Are costume chambers the best source of value for free-to-play gem hoarders?', yesLabel: 'Best bang for your buck', noLabel: 'Save for goblins/solstice', votesYes: 470, votesNo: 160 },
  { id: 11, date: '11 days ago', question: 'Do you actually read the lore and story dialogues in seasonal events?', yesLabel: 'Always skip for loot', noLabel: 'Love the storyline', votesYes: 580, votesNo: 85 },
  { id: 12, date: '12 days ago', question: 'Is Monster Island fun or just an exhausting time sink for the alliance?', yesLabel: 'Fun exploration', noLabel: 'Total chore map', votesYes: 270, votesNo: 340 },
  { id: 13, date: '13 days ago', question: 'Should duplicate 5-star heroes be tradeable for ascension materials instead of eating dust in the hero roster?', yesLabel: 'Desperately needed', noLabel: 'Breaks the economy', votesYes: 640, votesNo: 55 },
  { id: 14, date: '14 days ago', question: 'Is Wilbur still the single greatest 4-star titan hero ever introduced?', yesLabel: 'Unmatched legend', noLabel: 'Power creep passed him', votesYes: 530, votesNo: 105 },
  { id: 15, date: '15 days ago', question: 'Do rush attack wars cause more accidental phone screen cracks than any other game mode?', yesLabel: 'Rage-inducing RNG', noLabel: 'Just bring dispellers', votesYes: 490, votesNo: 145 },
  { id: 16, date: '16 days ago', question: 'Are aether crystals too rare to come by for active mid-tier players?', yesLabel: 'Major bottleneck', noLabel: 'Perfectly balanced pacing', votesYes: 510, votesNo: 125 },
  { id: 17, date: '17 days ago', question: 'Is raiding diamond tier worth the continuous trophy cup stress?', yesLabel: 'Flex the defense team', noLabel: 'Plat tier loot is fine', votesYes: 300, votesNo: 295 },
  { id: 18, date: '18 days ago', question: 'Do modern passive skills make reading hero cards feel like studying a tax legal document?', yesLabel: 'A literal textbook', noLabel: 'Easy to digest', votesYes: 600, votesNo: 70 },
  { id: 19, date: '19 days ago', question: 'Is saving up 100+ summon tokens for a massive portal pull session worth the delayed gratification?', yesLabel: 'Dopamine overload', noLabel: 'Pull as you get them', votesYes: 425, votesNo: 215 },
  { id: 20, date: '20 days ago', question: 'Should Path of Giants daily tasks be streamlined so you don\'t have to change your entire setup?', yesLabel: 'Please automate it', noLabel: 'Keeps us on our toes', votesYes: 380, votesNo: 180 },
  { id: 21, date: '21 days ago', question: 'Are ninja towers genuinely fun or a brutal psychological torture test?', yesLabel: 'Love the challenge', noLabel: 'Absolute curse trap', votesYes: 225, votesNo: 410 },
  { id: 22, date: '22 days ago', question: 'Is it a cardinal sin to feed away a 4-star duplicate before maxing at least one?', yesLabel: 'Never waste a hero', noLabel: 'Feed \'em to the gods', votesYes: 350, votesNo: 270 },
  { id: 23, date: '23 days ago', question: 'Do you regularly coordinate titan flags with your alliance, or just hit whenever you log on?', yesLabel: 'Strictly coordinated', noLabel: 'Wild West chaos', votesYes: 460, votesNo: 155 },
  { id: 24, date: '24 days ago', question: 'Are Season 4 Underwild heroes still holding up well against current meta power creep?', yesLabel: 'Still solid picks', noLabel: 'Completely left behind', votesYes: 290, votesNo: 310 },
  { id: 25, date: '25 days ago', question: 'Is the Mystic Vision ad reward the most reliable part of your daily routine?', yesLabel: 'Praise the free gems', noLabel: 'Skip when possible', votesYes: 550, votesNo: 95 },
  { id: 26, date: '26 days ago', question: 'Do you change your defense team specifically for every single war tournament ruleset?', yesLabel: 'Tweaked to perfection', noLabel: 'Slap a standard tank down', votesYes: 370, votesNo: 245 },
  { id: 27, date: '27 days ago', question: 'Are mega tokens a fair addition or just another whale bait mechanism?', yesLabel: 'Decent extra pulls', noLabel: 'Pure whale bait', votesYes: 250, votesNo: 360 },
  { id: 28, date: '28 days ago', question: 'Does World Energy ever feel like it runs out entirely too fast during farming events?', yesLabel: 'Always starving for flasks', noLabel: 'Pacing is just right', votesYes: 495, votesNo: 120 },
  { id: 29, date: '29 days ago', question: 'Is finding an active, communicative alliance the single most important factor for long-term player retention?', yesLabel: 'The game *is* the alliance', noLabel: 'Play solo just fine', votesYes: 630, votesNo: 50 },
  { id: 30, date: '30 days ago', question: 'Do you honestly believe RNG is completely random, or does the game algorithm know when you\'re desperate for a healer?', yesLabel: 'The algorithm is sentient', noLabel: 'Pure mathematical odds', votesYes: 525, votesNo: 150 }
];

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'archive' | 'simulator'>('home');
  const [polls, setPolls] = useState<Poll[]>(initialPolls);

  const handleVote = (id: number, choice: 'yes' | 'no') => {
    setPolls((prevPolls) =>
      prevPolls.map((poll) => {
        if (poll.id === id && !poll.userVote) {
          const strictIncrement = Math.floor(Math.random() * (135 - 57 + 1)) + 57;
          return {
            ...poll,
            userVote: choice,
            votesYes: choice === 'yes' ? poll.votesYes + strictIncrement : poll.votesYes,
            votesNo: choice === 'no' ? poll.votesNo + strictIncrement : poll.votesNo,
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

        <div className="flex justify-center gap-2 sm:gap-4 mt-4 flex-wrap">
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
            Archive ({archivedPolls.length})
          </button>
          <button
            onClick={() => setCurrentTab('simulator')}
            className={`text-xs uppercase tracking-widest px-4 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              currentTab === 'simulator'
                ? 'bg-amber-500 text-zinc-950 shadow-lg'
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            Summon Sim 🎰
          </button>
        </div>
      </header>

      <main className="max-w-xl mx-auto w-full my-6 space-y-6">
        {currentTab === 'home' ? (
          <>
            <PollCard poll={todayPoll} onVote={handleVote} isToday={true} />
            {yesterdayPoll && (
              <div className="pt-2">
                <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2 px-1">
                  Previous Day's Question
                </div>
                <PollCard poll={yesterdayPoll} onVote={handleVote} isToday={false} />
              </div>
            )}
          </>
        ) : currentTab === 'archive' ? (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-amber-400 border-b border-zinc-800 pb-2">
              Past Community Debates ({archivedPolls.length})
            </h2>
            {archivedPolls.map((poll) => (
              <PollCard key={poll.id} poll={poll} onVote={handleVote} isToday={false} />
            ))}
          </div>
        ) : (
          <SummonSimulator />
        )}
      </main>

      <footer className="max-w-xl mx-auto w-full text-center text-xs text-zinc-600 pb-2">
        New question drops daily. Check back tomorrow.
      </footer>
    </div>
  );
}

function SummonSimulator() {
  const [selectedPortal, setSelectedPortal] = useState<'solstice' | 'blackfriday' | 'covenant' | 'seasonal' | 'standard'>('solstice');
  const [pullType, setPullType] = useState<1 | 10 | 30>(1);
  const [results, setResults] = useState<SummonResult[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const portalConfigs = {
    solstice: { name: 'Solstice Portal', leg: 10.0, epic: 40.0, rare: 50.0 },
    blackfriday: { name: 'Black Friday Portal', leg: 8.5, epic: 41.5, rare: 50.0 },
    covenant: { name: 'Covenant Portal', leg: 5.0, epic: 35.0, rare: 60.0 },
    seasonal: { name: 'Season of Love Portal', leg: 3.5, epic: 26.5, rare: 70.0 },
    standard: { name: 'Standard Epic Portal', leg: 1.5, epic: 18.5, rare: 80.0 },
  };

  const categoryPools = {
    Legendary: ['5* Featured', '5* Classic', '5* S3', '5* S4', '5* S5', '5* Untold Tales', '5* Goblin', '5* Astral'],
    Epic: ['Epic Featured', '4* Classic', '4* S3', '4* S4', '4* S5', '4* UT1', '4* UT2', '4* Tavern'],
    Rare: ['3* Classic', '3* S3', '3* S4', '3* S5', '3* UT1', '3* UT2', '3* Season Realm'],
  };

  const handleSummon = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResults([]);
    setCurrentIndex(0);

    const config = portalConfigs[selectedPortal];
    const generatedPulls: SummonResult[] = [];

    for (let i = 0; i < pullType; i++) {
      const roll = Math.random() * 100;
      let rarity: 'Legendary' | 'Epic' | 'Rare' = 'Rare';
      let color = 'bg-blue-600/20 text-blue-400 border-blue-500/30';

      if (roll < config.leg) {
        rarity = 'Legendary';
        color = 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-amber-500/10 shadow-lg';
      } else if (roll < config.leg + config.epic) {
        rarity = 'Epic';
        color = 'bg-purple-600/20 text-purple-400 border-purple-500/30';
      }

      const pool = categoryPools[rarity];
      const randomCategory = pool[Math.floor(Math.random() * pool.length)];
      
      generatedPulls.push({ 
        rarity, 
        color, 
        name: randomCategory 
      });
    }

    setResults(generatedPulls);

    if (pullType === 1) {
      setCurrentIndex(1);
      setIsSpinning(false);
    } else {
      let current = 0;
      const interval = setInterval(() => {
        current++;
        setCurrentIndex(current);
        if (current >= generatedPulls.length) {
          clearInterval(interval);
          setIsSpinning(false);
        }
      }, 1500);
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
      <div className="flex items-center justify-between mb-4">
        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-widest">
          Gacha Lab Simulator
        </span>
        <span className="text-zinc-500 text-xs">Test your luck safely</span>
      </div>

      <h2 className="text-xl font-bold text-zinc-100 mb-6">Summon Portal Simulator</h2>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
            Select Portal
          </label>
          <select
            value={selectedPortal}
            onChange={(e) => setSelectedPortal(e.target.value as any)}
            className="w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 text-sm focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="solstice">Solstice Portal (High Leg Odds)</option>
            <option value="blackfriday">Black Friday Portal</option>
            <option value="covenant">Covenant Portal</option>
            <option value="seasonal">Season of Love Portal</option>
            <option value="standard">Standard Epic Portal (Brutal Odds)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-2 font-semibold">
            Pull Option
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Single Summon', val: 1 },
              { label: '10 Pull', val: 10 },
              { label: '30 Pull', val: 30 },
            ].map((opt) => (
              <button
                key={opt.val}
                onClick={() => setPullType(opt.val as any)}
                className={`py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                  pullType === opt.val
                    ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSummon}
          disabled={isSpinning}
          className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold text-base transition-all shadow-lg active:scale-98 cursor-pointer disabled:opacity-50 mt-2"
        >
          {isSpinning ? 'Summoning...' : `Execute ${pullType} Summon`}
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <div className="text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider flex justify-between items-center">
            <span>Summon Results ({pullType === 1 ? '1' : `${currentIndex} / ${results.length}`})</span>
            {isSpinning && <span className="text-amber-400 animate-pulse text-[11px]">Pulling next hero...</span>}
          </div>

          <div className={`grid gap-2 ${pullType === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'}`}>
            {results.slice(0, pullType === 1 ? 1 : currentIndex).map((res, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center font-bold text-xs ${res.color} flex items-center justify-center animate-fade-in`}
              >
                {res.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 leading-relaxed italic text-center">
        “Pull simulation should not be considered a probabilistic outcome in game. Results will vary here & there. All hail the RNG!”
      </div>
    </div>
  );
}

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
            className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold transition-all shadow-lg active:scale-95 cursor-pointer text-sm sm:text-base text-center"
          >
            {poll.yesLabel}
          </button>
          <button
            onClick={() => onVote(poll.id, 'no')}
            className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-bold transition-all border border-zinc-700 active:scale-95 cursor-pointer text-sm sm:text-base text-center"
          >
            {poll.noLabel}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs font-medium text-amber-400 mb-1">
            {isToday ? 'Thanks for voting! Community results:' : 'Final community results:'}
          </div>

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
