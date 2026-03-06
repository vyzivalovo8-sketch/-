import { detectFaceFeatures } from '../ai/faceDetection';
import { useAvatarStore } from '../store/avatarStore';

function PhotoUploader() {
  const { selfie, setSelfie, applyDetectedFeatures, setStatusMessage } = useAvatarStore();

  const onUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setSelfie(url);
    setStatusMessage('Фото загружено. Выполняется анализ...');

    const image = new Image();
    image.src = url;

    image.onload = async () => {
      try {
        const features = await detectFaceFeatures(image);
        if (features) {
          applyDetectedFeatures(features);
          return;
        }
        setStatusMessage('Лицо не найдено. Настройте аватар вручную.');
      } catch (error) {
        setStatusMessage('Не удалось загрузить модели распознавания. Добавьте файлы в public/models.');
      }
    };
  };

  return (
    <div className="space-y-2">
      <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/20">
        Загрузить фото
        <input className="hidden" type="file" accept="image/*" onChange={onUpload} />
      </label>
      {selfie && (
        <img
          src={selfie}
          alt="Загруженное селфи"
          className="h-24 w-24 rounded-lg border border-cyan-300/30 object-cover"
        />
      )}
      <p className="text-xs text-slate-300">
        Автоматический анализ: расстояние глаз, ширина лица, размер носа и угол глаз.
      </p>
    </div>
  );
}

export default PhotoUploader;
