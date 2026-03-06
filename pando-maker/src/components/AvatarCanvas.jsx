import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import AvatarModel from '../avatar/AvatarModel';
import { useAvatarStore } from '../store/avatarStore';
import { mapFeaturesToAvatar } from '../ai/featureMapper';

function AvatarCanvas() {
  const { skinColor, eyeColor, hairStyle, clan, glowColor, featureData, pattern, decoration, randomSeed } =
    useAvatarStore();

  const mapped = mapFeaturesToAvatar(featureData);

  return (
    <div
      id="avatar-canvas-container"
      className="h-[78vh] w-full bg-[radial-gradient(circle_at_center,#0f1f3f_0%,#030712_70%)]"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        gl={{ alpha: true, preserveDrawingBuffer: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 2]} intensity={1.3} color="#8fe9ff" />
        <pointLight position={[-2, 2, 3]} intensity={0.7} color="#99b8ff" />
        <AvatarModel
          key={randomSeed}
          config={{
            skinColor,
            eyeColor,
            hairStyle,
            clan,
            glowColor,
            pattern,
            decoration,
            ...mapped,
          }}
        />
        <Environment preset="night" />
        <OrbitControls enablePan={false} minDistance={3.5} maxDistance={6} />
      </Canvas>
    </div>
  );
}

export default AvatarCanvas;
