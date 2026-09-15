"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    if (typeof window === "undefined" || !window.WebGLRenderingContext) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const cyan = new THREE.PointLight(0x22d3ee, 60);
    cyan.position.set(5, 5, 5);
    scene.add(cyan);
    const violet = new THREE.PointLight(0x8b5cf6, 40);
    violet.position.set(-5, -3, 2);
    scene.add(violet);
    const pink = new THREE.PointLight(0xe879f9, 25);
    pink.position.set(0, 4, -3);
    scene.add(pink);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1, 0.32, 140, 20),
      new THREE.MeshStandardMaterial({ color: 0x0b0b10, metalness: 0.9, roughness: 0.15, emissive: 0x22d3ee, emissiveIntensity: 0.12 })
    );
    scene.add(knot);
    const wire = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.001, 0.32, 140, 20),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.14 })
    );
    scene.add(wire);
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee })
    );
    scene.add(core);

    const COUNT = 900;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x22d3ee, size: 0.035, transparent: true, opacity: 0.8, depthWrite: false })
    );
    scene.add(particles);

    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const t = clock.getElapsedTime();
      knot.rotation.x = t * 0.25;
      knot.rotation.y = t * 0.3;
      wire.rotation.copy(knot.rotation);
      const s = 1 + Math.sin(t * 1.4) * 0.04;
      knot.scale.setScalar(s);
      wire.scale.setScalar(s);
      knot.position.y = Math.sin(t * 0.9) * 0.18;
      wire.position.y = knot.position.y;
      core.position.y = knot.position.y;
      particles.rotation.y = t * 0.03;
      camera.position.x += (mouse.x * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();
    setReady(true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = (mesh as THREE.Mesh).material as THREE.Material | THREE.Material[];
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="h-[380px] md:h-[480px] w-full relative">
      {!ready && (
        <div className="absolute inset-0 grid place-items-center font-mono text-xs text-zinc-600">
          initializing webgl…
        </div>
      )}
      <div ref={mountRef} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />
    </div>
  );
}
