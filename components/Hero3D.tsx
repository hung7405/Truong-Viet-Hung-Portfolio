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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.35, 5.6);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xeef2ff, 1.1));
    const dir = new THREE.DirectionalLight(0xffffff, 1.6);
    dir.position.set(4, 7, 5);
    dir.castShadow = true;
    dir.shadow.mapSize.set(1024, 1024);
    scene.add(dir);
    const fill = new THREE.DirectionalLight(0xe0e7ff, 0.7);
    fill.position.set(-4, 3, -3);
    scene.add(fill);
    const rimCyan = new THREE.PointLight(0x06b6d4, 18, 10);
    rimCyan.position.set(2, 1.8, 2);
    scene.add(rimCyan);
    const rimViolet = new THREE.PointLight(0x7c3aed, 16, 10);
    rimViolet.position.set(-2.2, 1.2, 1.5);
    scene.add(rimViolet);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(2.6, 48),
      new THREE.MeshStandardMaterial({ color: 0xf8f8fb, metalness: 0.0, roughness: 0.92 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.25;
    ground.receiveShadow = true;
    scene.add(ground);
    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.15, 32),
      new THREE.MeshBasicMaterial({ color: 0x0a0a0f, transparent: true, opacity: 0.08 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -1.24;
    scene.add(shadow);

    const robot = new THREE.Group();
    scene.add(robot);

    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.08, roughness: 0.22 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0f0f12, metalness: 0.65, roughness: 0.28 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, metalness: 0.78, roughness: 0.18 });

    const torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.52, 8, 24), whiteMat);
    torso.castShadow = true;
    torso.position.y = 0.15;
    robot.add(torso);

    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.38, 0.08), darkMat);
    chest.position.set(0, 0.22, 0.38);
    chest.castShadow = true;
    torso.add(chest);
    const core = new THREE.Mesh(new THREE.CircleGeometry(0.085, 24), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    core.position.set(0, 0.02, 0.045);
    chest.add(core);
    const coreGlow = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.14, 24), new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.22, side: THREE.DoubleSide }));
    coreGlow.position.copy(core.position);
    chest.add(coreGlow);

    const shoulderL = new THREE.Mesh(new THREE.SphereGeometry(0.14, 16, 16), whiteMat);
    shoulderL.position.set(-0.48, 0.42, 0);
    torso.add(shoulderL);
    const shoulderR = shoulderL.clone();
    shoulderR.position.set(0.48, 0.42, 0);
    torso.add(shoulderR);

    const armGeo = new THREE.CapsuleGeometry(0.11, 0.42, 6, 16);
    const armL = new THREE.Mesh(armGeo, whiteMat);
    armL.position.set(-0.58, 0.02, 0);
    armL.rotation.z = 0.12;
    armL.castShadow = true;
    robot.add(armL);
    const armR = armL.clone();
    armR.position.set(0.58, 0.02, 0);
    armR.rotation.z = -0.12;
    robot.add(armR);
    const handGeo = new THREE.SphereGeometry(0.13, 16, 16);
    const handL = new THREE.Mesh(handGeo, darkMat);
    handL.position.set(0, -0.32, 0);
    armL.add(handL);
    const handR = handL.clone();
    armR.add(handR);
    handR.position.set(0, -0.32, 0);

    const legGeo = new THREE.CapsuleGeometry(0.13, 0.38, 6, 16);
    const legL = new THREE.Mesh(legGeo, whiteMat);
    legL.position.set(-0.22, -0.72, 0);
    legL.castShadow = true;
    robot.add(legL);
    const legR = legL.clone();
    legR.position.set(0.22, -0.72, 0);
    robot.add(legR);
    const footGeo = new THREE.BoxGeometry(0.22, 0.09, 0.28);
    const footL = new THREE.Mesh(footGeo, darkMat);
    footL.position.set(0, -0.28, 0.04);
    legL.add(footL);
    const footR = footL.clone();
    legR.add(footR);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.92, 0);
    robot.add(headGroup);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.38, 28, 28), whiteMat);
    head.scale.set(1, 1.08, 0.95);
    head.castShadow = true;
    headGroup.add(head);
    const earL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.08, 12), metalMat);
    earL.rotation.z = Math.PI / 2;
    earL.position.set(-0.38, 0.04, 0);
    headGroup.add(earL);
    const earR = earL.clone();
    earR.position.set(0.38, 0.04, 0);
    headGroup.add(earR);
    const visor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.31, 0.31, 0.16, 28, 1, false, -Math.PI / 2.2, Math.PI / 1.1),
      new THREE.MeshPhysicalMaterial({ color: 0x0a0a0f, metalness: 0.9, roughness: 0.12, clearcoat: 1, transparent: true, opacity: 0.96 })
    );
    visor.rotation.x = Math.PI / 2;
    visor.rotation.z = Math.PI;
    visor.position.set(0, 0.06, 0.28);
    headGroup.add(visor);
    const eyeBar = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.04, 0.02), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    eyeBar.position.set(0, 0.06, 0.36);
    headGroup.add(eyeBar);
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    eyeL.position.set(-0.11, 0.06, 0.38);
    headGroup.add(eyeL);
    const eyeR = eyeL.clone();
    eyeR.position.set(0.11, 0.06, 0.38);
    headGroup.add(eyeR);
    const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.18, 10), metalMat);
    antenna.position.set(0, 0.46, 0);
    headGroup.add(antenna);
    const antTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 12, 12), new THREE.MeshBasicMaterial({ color: 0xe879f9 }));
    antTip.position.set(0, 0.1, 0);
    antenna.add(antTip);
    const antGlow = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), new THREE.MeshBasicMaterial({ color: 0xe879f9, transparent: true, opacity: 0.18 }));
    antenna.add(antGlow);

    const floatRing = new THREE.Mesh(new THREE.RingGeometry(0.9, 0.92, 40), new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.07, side: THREE.DoubleSide }));
    floatRing.rotation.x = Math.PI / 2;
    floatRing.position.y = -1.05;
    scene.add(floatRing);

    const pCount = 520;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 7;
      pPos[i * 3 + 1] = Math.random() * 3.2 - 0.2;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 0.6;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.022, transparent: true, opacity: 0.22, depthWrite: false });
    const field = new THREE.Points(pGeo, pMat);
    scene.add(field);

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
      robot.position.y = Math.sin(t * 0.75) * 0.14;
      robot.rotation.y = Math.sin(t * 0.28) * 0.18 + mouse.x * 0.22;
      robot.rotation.x = mouse.y * 0.08;
      headGroup.rotation.y = mouse.x * 0.28;
      headGroup.rotation.x = -mouse.y * 0.12;
      headGroup.position.y = 0.92 + Math.sin(t * 1.1) * 0.02;
      armL.rotation.x = Math.sin(t * 0.9) * 0.12;
      armR.rotation.x = Math.sin(t * 0.9 + 1.2) * 0.12;
      legL.rotation.x = Math.sin(t * 0.9) * 0.06;
      legR.rotation.x = -Math.sin(t * 0.9) * 0.06;
      antTip.scale.setScalar(1 + Math.sin(t * 3.2) * 0.15);
      (antGlow.material as THREE.MeshBasicMaterial).opacity = 0.14 + Math.sin(t * 3.2) * 0.06;
      eyeBar.scale.x = 1 + Math.sin(t * 2.8) * 0.04;
      floatRing.rotation.z = t * 0.22;
      shadow.scale.setScalar(1 + Math.sin(t * 0.75) * 0.06);
      (shadow.material as THREE.MeshBasicMaterial).opacity = 0.08 - Math.sin(t * 0.75) * 0.015;
      field.rotation.y = t * 0.008;
      rimCyan.intensity = 18 + Math.sin(t * 1.4) * 4;
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
    <div className="h-[520px] md:h-[600px] lg:h-[620px] w-full relative overflow-hidden rounded-[32px] bg-gradient-to-b from-white via-zinc-50 to-white border border-zinc-200 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)]">
      {!ready && <div className="absolute inset-0 grid place-items-center font-mono text-xs text-zinc-400">assembling robot…</div>}
      <div ref={mountRef} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/40 to-transparent" />
      <div className="absolute top-5 left-5 rounded-full bg-white/92 backdrop-blur border border-zinc-200 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.14em] font-bold text-zinc-700 shadow-sm">
        ● AI COMPANION — HOVER TO INTERACT
      </div>
      <div className="absolute bottom-5 right-5 text-[10px] font-mono bg-zinc-900 text-white px-3 py-1.5 rounded-full">Truong Viet Hung · AI Engineer</div>
    </div>
  );
}
