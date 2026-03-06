import AvatarCanvas from './components/AvatarCanvas';
import AvatarControls from './components/AvatarControls';
import PhotoUploader from './components/PhotoUploader';
import DownloadButton from './components/DownloadButton';

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#050912] via-[#081021] to-[#060914] text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[380px_1fr]">
        <section className="space-y-4 rounded-2xl border border-cyan-300/20 bg-white/5 p-4 shadow-glass backdrop-blur-md">
          <h1 className="font-orbitron text-3xl tracking-[0.2em] text-aceBlue">PANDO-MAKER</h1>
          <p className="font-inter text-sm text-slate-300">
            Редактор аватаров На'ви: загрузите селфи, настройте внешний вид и скачайте PNG с прозрачным фоном.
          </p>
          <PhotoUploader />
          <AvatarControls />
          <DownloadButton />
        </section>

        <section className="overflow-hidden rounded-2xl border border-cyan-300/20 bg-white/5 shadow-glass backdrop-blur-md">
          <AvatarCanvas />
        </section>
      </div>
    </main>
  );
}

export default App;
