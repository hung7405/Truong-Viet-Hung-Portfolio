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
    const camera = new THREE.PerspectiveCamera(44, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.6, 7.2);

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 35, 12);
    cyanLight.position.set(2, 1, 3);
    scene.add(cyanLight);
    const violetLight = new THREE.PointLight(0x7c3aed, 28, 12);
    violetLight.position.set(-2.5, -1, 2);
    scene.add(violetLight);
    const pinkLight = new THREE.PointLight(0xe879f9, 18, 10);
    pinkLight.position.set(0, 3, -2);
    scene.add(pinkLight);

    const hubGeo = new THREE.IcosahedronGeometry(0.62, 3);
    const hubMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0f,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.18,
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    scene.add(hub);
    const hubCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4 })
    );
    hub.add(hubCore);

    const agentDefs: { label: string; color: number; pos: THREE.Vector3 }[] = [
      { label: "website", color: 0x06b6d4, pos: new THREE.Vector3(2.1, 1.1, 0.6) },
      { label: "registry", color: 0x7c3aed, pos: new THREE.Vector3(-2.0, 1.3, -0.4) },
      { label: "social", color: 0xe879f9, pos: new THREE.Vector3(-1.9, -1.2, 0.7) },
      { label: "trust", color: 0x10b981, pos: new THREE.Vector3(2.0, -1.0, -0.6) },
    ];

    const agents: THREE.Mesh[] = [];
    const rings: THREE.Mesh[] = [];
    agentDefs.forEach((def) => {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(0.34, 24, 24),
        new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.1,
          roughness: 0.08,
          transmission: 0.88,
          thickness: 0.4,
          transparent: true,
          opacity: 0.92,
        })
      );
      shell.position.copy(def.pos);
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshBasicMaterial({ color: def.color })
      );
      shell.add(core);
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(0.42, 16, 16),
        new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.12 })
      );
      shell.add(glow);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.48, 0.52, 32),
        new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.18, side: THREE.DoubleSide })
      );
      ring.lookAt(0, 0, 0);
      shell.add(ring);
      rings.push(ring);
      agents.push(shell);
      scene.add(shell);
    });

    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    const lineMats = agentDefs.map((d) => new THREE.LineBasicMaterial({ color: d.color, transparent: true, opacity: 0.22 }));
    const travelers: { mesh: THREE.Mesh; idx: number; t: number; speed: number }[] = [];

    agentDefs.forEach((def, i) => {
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), def.pos]);
      const line = new THREE.Line(geo, lineMats[i]);
      lineGroup.add(line);

      for (let k = 0; k < 2; k++) {
        const dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 10, 10),
          new THREE.MeshBasicMaterial({ color: def.color })
        );
        scene.add(dot);
        travelers.push({ mesh: dot, idx: i, t: Math.random(), speed: 0.35 + Math.random() * 0.25 });
      }
    });

    const fieldCount = 1100;
    const fieldPos = new Float32Array(fieldCount * 3);
    for (let i = 0; i < fieldCount; i++) {
      const r = 4.8 + Math.random() * 2.8;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      fieldPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      fieldPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
      fieldPos[i * 3 + 2] = r * Math.cos(ph);
    }
    const fieldGeo = new THREE.BufferGeometry();
    fieldGeo.setAttribute("position", new THREE.BufferAttribute(fieldPos, 3));
    const field = new THREE.Points(fieldGeo, new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.022, transparent: true, opacity: 0.38, depthWrite: false }));
    scene.add(field);

    const grid = new THREE.GridHelper(10, 10, 0xe2e8f0, 0xf1f5f9);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.LineBasicMaterial).opacity = 0.18;
    grid.position.y = -2.4;
    scene.add(grid);

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

      hub.rotation.y = t * 0.18;
      hub.rotation.x = Math.sin(t * 0.4) * 0.18;
      hubCore.scale.setScalar(1 + Math.sin(t * 2.2) * 0.12);

      agents.forEach((a, i) => {
        const base = agentDefs[i].pos;
        a.position.y = base.y + Math.sin(t * 0.7 + i) * 0.12;
        a.position.x = base.x + Math.cos(t * 0.5 + i * 1.3) * 0.08;
        a.rotation.y = t * 0.3 + i;
        rings[i].rotation.z = t * 0.6;
        const pulse = 1 + Math.sin(t * 1.8 + i) * 0.05;
        a.scale.setScalar(pulse);
      });

      lineGroup.children.forEach((line, i) => {
        const geo = (line as THREE.Line).geometry as THREE.BufferGeometry;
        const arr = geo.attributes.position as THREE.BufferAttribute;
        const p = agentDefs[i].pos;
        const yOff = Math.sin(t * 0.7 + i) * 0.12;
        const xOff = Math.cos(t * 0.5 + i * 1.3) * 0.08;
        arr.setXYZ(1, p.x + xOff, p.y + yOff, p.z);
        arr.needsUpdate = true;
      });

      travelers.forEach((tr) => {
        tr.t += 0.008 * tr.speed;
        if (tr.t > 1) tr.t -= 1;
        const p = agentDefs[tr.idx].pos;
        const yOff = Math.sin(t * 0.7 + tr.idx) * 0.12;
        const xOff = Math.cos(t * 0.5 + tr.idx * 1.3) * 0.08;
        tr.mesh.position.set(
          (p.x + xOff) * tr.t,
          (p.y + yOff) * tr.t,
          p.z * tr.t
        );
        tr.mesh.scale.setScalar(0.7 + Math.sin(t * 3 + tr.idx) * 0.3);
      });

      field.rotation.y = t * 0.008;
      grid.material.opacity = 0.14 + Math.sin(t * 0.6) * 0.04;

      camera.position.x += (mouse.x * 0.9 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.5 + 0.6 - camera.position.y) * 0.04;
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
    <div className="h-[520px] md:h-[640px] lg:h-[720px] w-full relative overflow-hidden rounded-[32px] bg-gradient-to-b from-white via-zinc-50 to-white border border-zinc-200 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.15)]">
      {!ready && <div className="absolute inset-0 grid place-items-center font-mono text-xs text-zinc-400">booting agent mesh…</div>}
      <div ref={mountRef} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
      <div className="absolute top-4 left-4 md:top-6 md:left-6 rounded-full bg-white/90 backdrop-blur border border-zinc-200 px-3.5 py-1.5 font-mono text-[10px] tracking-widest text-zinc-700 shadow-sm">
        ● AGENT MESH — 4 EVIDENCE NODES LIVE
      </div>
      <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2 font-mono text-[10px]">
        <span className="rounded-full bg-zinc-900 text-white px-3 py-1.5">4 agents</span>
        <span className="rounded-full bg-white border border-zinc-200 px-3 py-1.5 text-zinc-700">async ARQ</span>
      </div>
    </div>
  );
}
