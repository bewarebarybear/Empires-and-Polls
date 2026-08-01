function SummonSimulator() {
  const [selectedPortal, setSelectedPortal] = useState<'solstice' | 'blackfriday' | 'covenant' | 'seasonal' | 'standard'>('solstice');
  const [pullType, setPullType] = useState<1 | 10 | 30>(1);
  const [results, setResults] = useState<SummonResult[]>([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const portalConfigs = {
    solstice: { name: 'Solstice Portal', leg: 10.0, epic: 40.0, rare: 50.0 },
    blackfriday: { name: 'Black Friday Portal', leg: 8.5, epic: 41.5, rare: 50.0 },
    covenant: { name: 'Covenant Portal', leg: 5.0, epic: 35.0, rare: 60.0 },
    seasonal: { name: 'Season of Love Portal', leg: 3.5, epic: 26.5, rare: 70.0 },
    standard: { name: 'Standard Epic Portal', leg: 1.5, epic: 18.5, rare: 80.0 },
  };

  // Generalized category pools replacing individual hero names
  const categoryPools = {
    Legendary: ['5* Featured', '5* Classic', '5* S3', '5* S4', '5* S5', '5* Untold Tales', '5* Goblin', '5* Astral'],
    Epic: ['Epic Featured', '4* Classic', '4* S3', '4* S4', '4* S5', '4* UT1', '4* UT2', '4* Tavern'],
    Rare: ['3* Classic', '3* S3', '3* S4', '3* S5', '3* UT1', '3* UT2', '3* Season Realm'],
  };

  const handleSummon = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setResults([]);

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

    // Instant batch population without interval delays
    setResults(generatedPulls);
    setIsSpinning(false);
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
          {isSpinning ? 'Spinning Portals...' : `Execute ${pullType} Summon`}
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-6 pt-6 border-t border-zinc-800">
          <div className="text-xs font-semibold text-amber-400 mb-3 uppercase tracking-wider flex justify-between items-center">
            <span>Summon Results ({results.length})</span>
            <span className="text-zinc-500 text-[11px]">All results displayed</span>
          </div>

          {/* Expanded full grid container showing all items at once without internal scroll menus */}
          <div className={`grid gap-2 ${pullType === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5'}`}>
            {results.map((res, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border text-center font-bold text-xs ${res.color} flex items-center justify-center`}
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
