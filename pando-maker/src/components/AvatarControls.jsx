import { useAvatarStore } from '../store/avatarStore';

const labelClass = 'mb-2 block text-xs uppercase tracking-widest text-cyan-200';
const selectClass =
  'w-full rounded-lg border border-cyan-400/30 bg-slate-950/70 p-2 text-sm text-white outline-none transition focus:border-cyan-200';
const buttonClass =
  'rounded-lg border border-cyan-300/40 bg-cyan-500/10 px-3 py-2 text-sm transition hover:bg-cyan-400/20';

function AvatarControls() {
  const {
    skinPalette,
    eyePalette,
    hairOptions,
    clanOptions,
    skinColor,
    eyeColor,
    hairStyle,
    clan,
    statusMessage,
    setProperty,
    applyClan,
    randomizeAvatar,
    savePreset,
    loadPreset,
  } = useAvatarStore();

  return (
    <div className="space-y-4 font-inter">
      <div>
        <label className={labelClass}>Цвет кожи</label>
        <select className={selectClass} value={skinColor} onChange={(e) => setProperty('skinColor', e.target.value)}>
          {Object.keys(skinPalette).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Цвет глаз</label>
        <select className={selectClass} value={eyeColor} onChange={(e) => setProperty('eyeColor', e.target.value)}>
          {Object.keys(eyePalette).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Прическа</label>
        <select className={selectClass} value={hairStyle} onChange={(e) => setProperty('hairStyle', e.target.value)}>
          {hairOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Клан</label>
        <select className={selectClass} value={clan} onChange={(e) => applyClan(e.target.value)}>
          {clanOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        <button type="button" className={buttonClass} onClick={randomizeAvatar}>
          Случайный аватар
        </button>
        <button type="button" className={buttonClass} onClick={savePreset}>
          Сохранить пресет
        </button>
        <button type="button" className={buttonClass} onClick={loadPreset}>
          Загрузить пресет
        </button>
      </div>

      <p className="rounded-lg border border-cyan-300/20 bg-cyan-400/5 p-2 text-xs text-cyan-100">{statusMessage}</p>
    </div>
  );
}

export default AvatarControls;
