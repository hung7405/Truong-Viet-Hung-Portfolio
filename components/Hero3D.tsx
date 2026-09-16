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
    camera.position.set(0, 0, 6);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));

    const orbMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.0,
      roughness: 0.05,
      transmission: 0.92,
      thickness: 0.6,
      ior: 1.45,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });

    const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.35, 5), orbMat);
    scene.add(orb);

    const orbWire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.38, 3),
      new THREE.MeshBasicMaterial({ color: 0x7c3aed, wireframe: true, transparent: true, opacity: 0.07 })
    );
    scene.add(orbWire);

    const inner = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.9 })
    );
    scene.add(inner);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(1.9, 2.05, 64),
      new THREE.MeshBasicMaterial({ color: 0xe879f9, transparent: true, opacity: 0.12, side: THREE.DoubleSide })
    );
    halo.rotation.x = Math.PI / 2.5;
    scene.add(halo);

    const COUNT = 1400;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 4.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x7c3aed, size: 0.028, transparent: true, opacity: 0.55, depthWrite: false })
    );
    scene.add(particles);

    const pLight1 = new THREE.PointLight(0x06b6d4, 40, 10);
    pLight1.position.set(3, 2, 3);
    scene.add(pLight1);
    const pLight2 = new THREE.PointLight(0xe879f9, 30, 10);
    pLight2.position.set(-3, -1, 2);
    scene.add(pLight2);

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
      orb.rotation.y = t * 0.12;
      orb.rotation.x = Math.sin(t * 0.3) * 0.15;
      orbWire.rotation.y = -t * 0.08;
      orbWire.rotation.x = t * 0.05;
      inner.position.y = Math.sin(t * 0.9) * 0.12;
      inner.scale.setScalar(1 + Math.sin(t * 1.6) * 0.06);
      halo.rotation.z = t * 0.2;
      halo.position.y = Math.sin(t * 0.7) * 0.1;
      particles.rotation.y = t * 0.015;
      particles.rotation.x = Math.sin(t * 0.2) * 0.08;
      pLight1.intensity = 40 + Math.sin(t * 1.2) * 8;
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.04;
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
    <div className="h-[420px] md:h-[560px] lg:h-[620px] w-full relative">
      {!ready && <div className="absolute inset-0 grid place-items-center font-mono text-xs text-zinc-400">loading orb…</div>}
      <div ref={mountRef} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60" />
    </div>
  );
}
