import { create } from 'zustand';

const skinPalette = {
  Голубой: '#3ea9ff',
  'Темно-синий': '#1a4fcd',
  Бирюзовый: '#25cfd0',
};

const eyePalette = {
  Желтый: '#ffe861',
  Зеленый: '#8dff70',
  Янтарный: '#ffbf66',
};

const clanTemplates = {
  'Оматикайя (лес)': {
    skinColor: 'Темно-синий',
    glowColor: '#5CFF8B',
    pattern: 'leaf',
    decoration: 'leaf',
  },
  'Меткайина (вода)': {
    skinColor: 'Бирюзовый',
    glowColor: '#6AFFF8',
    pattern: 'wave',
    decoration: 'shell',
  },
};

const hairOptions = ['Косички', 'Дреды', 'Перья', 'Бусины'];

export const useAvatarStore = create((set, get) => ({
  selfie: null,
  featureData: null,
  skinColor: 'Голубой',
  eyeColor: 'Желтый',
  hairStyle: 'Косички',
  clan: 'Оматикайя (лес)',
  glowColor: '#5CFF8B',
  pattern: 'leaf',
  decoration: 'leaf',
  randomSeed: Math.random(),
  statusMessage: 'Загрузите селфи для автоматической настройки.',

  setSelfie: (fileURL) => set({ selfie: fileURL }),
  setStatusMessage: (statusMessage) => set({ statusMessage }),
  applyDetectedFeatures: (featureData) =>
    set((state) => ({
      featureData,
      eyeColor: featureData.eyeDistance > 0.28 ? 'Янтарный' : state.eyeColor,
      skinColor: featureData.faceWidth > 0.42 ? 'Темно-синий' : state.skinColor,
      statusMessage: 'Лицо распознано. Базовые параметры применены.',
    })),
  setProperty: (key, value) => set({ [key]: value, randomSeed: Math.random() }),
  applyClan: (clan) => {
    const template = clanTemplates[clan];
    if (!template) return;
    set({ clan, ...template, randomSeed: Math.random() });
  },
  randomizeAvatar: () =>
    set(() => {
      const skinKeys = Object.keys(skinPalette);
      const eyeKeys = Object.keys(eyePalette);
      const clans = Object.keys(clanTemplates);
      const randomClan = clans[Math.floor(Math.random() * clans.length)];
      return {
        skinColor: skinKeys[Math.floor(Math.random() * skinKeys.length)],
        eyeColor: eyeKeys[Math.floor(Math.random() * eyeKeys.length)],
        hairStyle: hairOptions[Math.floor(Math.random() * hairOptions.length)],
        clan: randomClan,
        ...clanTemplates[randomClan],
        randomSeed: Math.random(),
        statusMessage: 'Случайный аватар создан.',
      };
    }),
  savePreset: () => {
    const state = get();
    const payload = {
      skinColor: state.skinColor,
      eyeColor: state.eyeColor,
      hairStyle: state.hairStyle,
      clan: state.clan,
      glowColor: state.glowColor,
      pattern: state.pattern,
      decoration: state.decoration,
    };
    localStorage.setItem('pando-preset', JSON.stringify(payload));
    set({ statusMessage: 'Пресет сохранен в браузере.' });
  },
  loadPreset: () => {
    const raw = localStorage.getItem('pando-preset');
    if (!raw) {
      set({ statusMessage: 'Сохраненный пресет не найден.' });
      return;
    }

    const parsed = JSON.parse(raw);
    set({
      skinColor: parsed.skinColor ?? 'Голубой',
      eyeColor: parsed.eyeColor ?? 'Желтый',
      hairStyle: parsed.hairStyle ?? 'Косички',
      clan: parsed.clan ?? 'Оматикайя (лес)',
      glowColor: parsed.glowColor ?? '#5CFF8B',
      pattern: parsed.pattern ?? 'leaf',
      decoration: parsed.decoration ?? 'leaf',
      randomSeed: Math.random(),
      statusMessage: 'Пресет загружен.',
    });
  },

  skinPalette,
  eyePalette,
  hairOptions,
  clanOptions: Object.keys(clanTemplates),
}));
