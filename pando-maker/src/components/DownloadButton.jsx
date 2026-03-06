import { useAvatarStore } from '../store/avatarStore';

function DownloadButton() {
  const { setStatusMessage } = useAvatarStore();

  const handleDownload = () => {
    const canvas = document.querySelector('#avatar-canvas-container canvas');
    if (!canvas) {
      setStatusMessage('Не удалось найти 3D-сцену для экспорта.');
      return;
    }

    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 2048;
    exportCanvas.height = 2048;

    const ctx = exportCanvas.getContext('2d', { alpha: true });
    if (!ctx) {
      setStatusMessage('Не удалось подготовить экспорт PNG.');
      return;
    }

    ctx.clearRect(0, 0, 2048, 2048);
    ctx.drawImage(canvas, 0, 0, 2048, 2048);

    const link = document.createElement('a');
    link.download = 'pando-avatar.png';
    link.href = exportCanvas.toDataURL('image/png');
    link.click();

    setStatusMessage('PNG 2048x2048 сохранен.');
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      className="w-full rounded-lg border border-cyan-300/50 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 px-3 py-3 font-orbitron text-sm tracking-wide text-cyan-100 transition hover:brightness-125"
    >
      Скачать аватар
    </button>
  );
}

export default DownloadButton;
