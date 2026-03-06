import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { createSkinMaterial } from './SkinShader';
import { createBioluminescenceMaterial } from './BioluminescenceLayer';

const skinColors = {
  Голубой: '#3ea9ff',
  'Темно-синий': '#1a4fcd',
  Бирюзовый: '#25cfd0',
};

const eyeColors = {
  Желтый: '#ffe861',
  Зеленый: '#8dff70',
  Янтарный: '#ffbf66',
};

function HairMesh({ hairStyle, material }) {
  if (hairStyle === 'Дреды') {
    return (
      <group>
        {Array.from({ length: 8 }).map((_, index) => (
          <mesh
            key={`dread-${index}`}
            position={[Math.cos(index) * 0.6, 0.9 - index * 0.03, Math.sin(index) * 0.3]}
            rotation-z={0.3}
            material={material}
          >
            <capsuleGeometry args={[0.06, 0.6, 4, 8]} />
          </mesh>
        ))}
      </group>
    );
  }

  if (hairStyle === 'Перья') {
    return (
      <group>
        {[-0.5, -0.2, 0.2, 0.5].map((x, index) => (
          <mesh key={`feather-${x}`} position={[x, 1.2 + index * 0.05, 0]} rotation-z={x * 0.4}>
            <coneGeometry args={[0.09, 0.7, 6]} />
            <meshStandardMaterial color="#7ee5ff" emissive="#34d9ff" emissiveIntensity={0.18} />
          </mesh>
        ))}
      </group>
    );
  }

  if (hairStyle === 'Бусины') {
    return (
      <group>
        {Array.from({ length: 10 }).map((_, index) => (
          <mesh key={`bead-${index}`} position={[Math.cos(index) * 0.62, 0.95 - index * 0.02, Math.sin(index) * 0.22]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color="#b6f5ff" emissive="#63dbff" emissiveIntensity={0.25} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <mesh position={[0, 1.45, 0]} material={material}>
      <torusKnotGeometry args={[0.32, 0.09, 80, 12]} />
    </mesh>
  );
}

function PatternMesh({ pattern, glowMaterial }) {
  if (pattern === 'wave') {
    return (
      <group>
        {[-0.45, -0.15, 0.15, 0.45].map((x) => (
          <mesh key={`wave-${x}`} position={[x, -0.08, 1.02]} rotation-z={Math.PI / 2} material={glowMaterial}>
            <torusGeometry args={[0.11, 0.02, 16, 40, Math.PI]} />
          </mesh>
        ))}
      </group>
    );
  }

  return (
    <group>
      <mesh position={[0, 0.1, 1.04]} material={glowMaterial}>
        <ringGeometry args={[0.2, 0.32, 32]} />
      </mesh>
      <mesh position={[0, -0.4, 1.02]} rotation-z={Math.PI / 2} material={glowMaterial}>
        <ringGeometry args={[0.06, 0.14, 16]} />
      </mesh>
      <mesh position={[-0.5, -0.2, 1.0]} rotation-z={Math.PI / 2} material={glowMaterial}>
        <ringGeometry args={[0.04, 0.1, 16]} />
      </mesh>
      <mesh position={[0.5, -0.2, 1.0]} rotation-z={Math.PI / 2} material={glowMaterial}>
        <ringGeometry args={[0.04, 0.1, 16]} />
      </mesh>
    </group>
  );
}

function ClanDecoration({ decoration }) {
  if (decoration === 'shell') {
    return (
      <group>
        <mesh position={[-0.9, 0.85, 0.35]} rotation-z={0.4}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#d4ffff" emissive="#84f7ff" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.9, 0.85, 0.35]} rotation-z={-0.4}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#d4ffff" emissive="#84f7ff" emissiveIntensity={0.2} />
        </mesh>
      </group>
    );
  }

  return (
    <group>
      <mesh position={[-0.85, 1.0, 0.25]} rotation-z={0.3}>
        <coneGeometry args={[0.1, 0.45, 5]} />
        <meshStandardMaterial color="#82ff92" emissive="#5cff8b" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.85, 1.0, 0.25]} rotation-z={-0.3}>
        <coneGeometry args={[0.1, 0.45, 5]} />
        <meshStandardMaterial color="#82ff92" emissive="#5cff8b" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export default function AvatarModel({ config }) {
  const rootRef = useRef();
  const pulseRef = useRef(0);

  const skinMaterial = useMemo(
    () => createSkinMaterial(skinColors[config.skinColor] ?? '#3ea9ff', config.glowColor),
    [config.skinColor, config.glowColor],
  );
  const glowMaterial = useMemo(() => createBioluminescenceMaterial(config.glowColor), [config.glowColor]);

  useFrame((_, delta) => {
    if (!rootRef.current) return;
    rootRef.current.rotation.y += delta * 0.16;
    pulseRef.current += delta;
    glowMaterial.emissiveIntensity = 0.5 + Math.sin(pulseRef.current * 2.2) * 0.35;
  });

  return (
    <group ref={rootRef} rotation-z={config.headRotation}>
      <mesh material={skinMaterial} scale={[config.headScaleX, 1.2, 1]}>
        <sphereGeometry args={[1.2, 64, 64]} />
      </mesh>

      <mesh position={[-0.45, 0.2, 0.95]} scale={[0.42 * config.eyeScale, 0.62 * config.eyeScale, 0.3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={eyeColors[config.eyeColor]} emissive={eyeColors[config.eyeColor]} emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0.45, 0.2, 0.95]} scale={[0.42 * config.eyeScale, 0.62 * config.eyeScale, 0.3]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color={eyeColors[config.eyeColor]} emissive={eyeColors[config.eyeColor]} emissiveIntensity={0.18} />
      </mesh>

      <mesh position={[0, -0.2, 1.02]} scale={[0.2, 0.45 * config.noseScale, 0.22]} material={skinMaterial}>
        <coneGeometry args={[0.5, 1, 32]} />
      </mesh>

      <mesh position={[-1.1, 0.32, 0]} rotation-z={0.35} material={skinMaterial}>
        <coneGeometry args={[0.22, 1, 24]} />
      </mesh>
      <mesh position={[1.1, 0.32, 0]} rotation-z={-0.35} material={skinMaterial}>
        <coneGeometry args={[0.22, 1, 24]} />
      </mesh>

      <HairMesh hairStyle={config.hairStyle} material={skinMaterial} />
      <PatternMesh pattern={config.pattern} glowMaterial={glowMaterial} />
      <ClanDecoration decoration={config.decoration} />
    </group>
  );
}
