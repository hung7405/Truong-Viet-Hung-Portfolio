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
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xfcfcfc, 7, 14);
    const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 1.2, 8.4);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 8, 6);
    scene.add(dir);

    const bgGeo = new THREE.PlaneGeometry(22, 22, 64, 64);
    const bgMat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 }, mouse: { value: new THREE.Vector2(0, 0) } },
      vertexShader: `varying vec2 vUv; uniform float time; void main(){ vUv=uv; vec3 p=position; p.z += sin(p.x*0.45 + time*0.35)*0.28 + cos(p.y*0.38 + time*0.28)*0.22; gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0); }`,
      fragmentShader: `varying vec2 vUv; uniform float time; uniform vec2 mouse; void main(){
        vec2 uv=vUv;
        vec2 m=mouse*0.22;
        float d=length(uv-0.5-m*0.3);
        float w=sin(uv.x*7.0 + time*0.6 + uv.y*5.0)*0.06;
        vec3 c1=vec3(0.98,0.99,1.0);
        vec3 c2=vec3(0.85,0.93,1.0);
        vec3 c3=vec3(0.72,0.82,1.0);
        vec3 neon=vec3(0.02,0.71,0.83);
        vec3 violet=vec3(0.49,0.23,0.93);
        vec3 magenta=vec3(0.91,0.47,0.98);
        vec3 base=mix(c1,c2,smoothstep(0.25,0.75,uv.y + w));
        base=mix(base,c3,smoothstep(0.4,0.85,uv.x + w*0.6));
        float orb=smoothstep(0.45,0.0,d);
        base=mix(base, neon, orb*0.18);
        base=mix(base, violet, smoothstep(0.55,0.0,length(uv-vec2(0.72,0.38)-m*0.2))*0.12);
        base=mix(base, magenta, smoothstep(0.62,0.0,length(uv-vec2(0.28,0.72)-m*0.15))*0.10);
        float grain=fract(sin(dot(uv,vec2(12.9898,78.233)))*43758.5453)*0.012;
        gl_FragColor=vec4(base+grain,1.0);
      }`,
      transparent: true,
    });
    const bg = new THREE.Mesh(bgGeo, bgMat);
    bg.rotation.x = -Math.PI / 2.35;
    bg.position.y = -2.8;
    bg.position.z = -1.2;
    scene.add(bg);

    const waveGeo = new THREE.PlaneGeometry(14, 14, 48, 48);
    const waveMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.0, roughness: 0.18, transmission: 0.42, thickness: 0.35, transparent: true, opacity: 0.72, side: THREE.DoubleSide });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.rotation.x = -Math.PI / 2;
    wave.position.y = -2.35;
    scene.add(wave);
    const wavePos = waveGeo.attributes.position as THREE.BufferAttribute;
    const waveOrig = Float32Array.from(wavePos.array as Float32Array);

    const hub = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.58, 3),
      new THREE.MeshPhysicalMaterial({ color: 0x09090b, emissive: 0x06b6d4, emissiveIntensity: 0.22, metalness: 0.9, roughness: 0.15, clearcoat: 1, clearcoatRoughness: 0.1 })
    );
    hub.position.y = 0.35;
    scene.add(hub);
    const hubCore = new THREE.Mesh(new THREE.SphereGeometry(0.18, 20, 20), new THREE.MeshBasicMaterial({ color: 0x06b6d4 }));
    hub.add(hubCore);

    const agentDefs = [
      { color: 0x06b6d4, pos: new THREE.Vector3(2.35, 0.95, 0.9) },
      { color: 0x7c3aed, pos: new THREE.Vector3(-2.25, 1.25, -0.3) },
      { color: 0xe879f9, pos: new THREE.Vector3(-2.1, -0.95, 0.85) },
      { color: 0x10b981, pos: new THREE.Vector3(2.2, -0.85, -0.7) },
    ];

    const agents: THREE.Mesh[] = [];
    agentDefs.forEach((def) => {
      const shell = new THREE.Mesh(
        new THREE.SphereGeometry(0.33, 22, 22),
        new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0.06, roughness: 0.06, transmission: 0.92, thickness: 0.45, transparent: true, opacity: 0.94 })
      );
      shell.position.copy(def.pos);
      const core = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 14), new THREE.MeshBasicMaterial({ color: def.color }));
      shell.add(core);
      const halo = new THREE.Mesh(new THREE.RingGeometry(0.46, 0.50, 28), new THREE.MeshBasicMaterial({ color: def.color, transparent: true, opacity: 0.14, side: THREE.DoubleSide }));
      halo.lookAt(0, 0.35, 0);
      shell.add(halo);
      agents.push(shell);
      scene.add(shell);
    });

    const ribbons: THREE.Mesh[] = [];
    const ribbonCurves: THREE.CatmullRomCurve3[] = [];
    agentDefs.forEach((def) => {
      const mid = new THREE.Vector3().addVectors(new THREE.Vector3(0, 0.35, 0), def.pos).multiplyScalar(0.5);
      mid.y += 0.45;
      mid.x *= 0.7;
      const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0.35, 0), mid, def.pos]);
      ribbonCurves.push(curve);
      const geo = new THREE.TubeGeometry(curve, 28, 0.025, 10, false);
      const mat = new THREE.MeshPhysicalMaterial({ color: def.color, emissive: def.color, emissiveIntensity: 0.22, metalness: 0.35, roughness: 0.18, transmission: 0.35, transparent: true, opacity: 0.78 });
      const mesh = new THREE.Mesh(geo, mat);
      ribbons.push(mesh);
      scene.add(mesh);
    });

    const travelers: { mesh: THREE.Mesh; idx: number; t: number; speed: number }[] = [];
    agentDefs.forEach((def, i) => {
      for (let k = 0; k < 2; k++) {
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.05, 10, 10), new THREE.MeshBasicMaterial({ color: def.color }));
        scene.add(dot);
        travelers.push({ mesh: dot, idx: i, t: Math.random(), speed: 0.5 + Math.random() * 0.4 });
      }
    });

    const pCount = 900;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 5.2 + Math.random() * 2.2;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.6 + 0.8;
      pPos[i * 3 + 2] = r * Math.cos(ph);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x94a3b8, size: 0.024, transparent: true, opacity: 0.28, depthWrite: false });
    const field = new THREE.Points(pGeo, pMat);
    scene.add(field);

    const pointCyan = new THREE.PointLight(0x06b6d4, 22, 10);
    pointCyan.position.set(1, 1.5, 2);
    scene.add(pointCyan);
    const pointViolet = new THREE.PointLight(0x7c3aed, 18, 10);
    pointViolet.position.set(-2, 1, 1);
    scene.add(pointViolet);

    const mouse = new THREE.Vector2(0, 0);
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      (bgMat.uniforms.mouse.value as THREE.Vector2).set(mouse.x * 0.18, mouse.y * 0.18);
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
      (bgMat.uniforms.time.value as number) = t;
      for (let i = 0; i < wavePos.count; i++) {
        const ox = waveOrig[i * 3];
        const oy = waveOrig[i * 3 + 1];
        wavePos.setZ(i, Math.sin(ox * 0.62 + t * 0.55) * 0.28 + Math.cos(oy * 0.52 + t * 0.42) * 0.22);
      }
      wavePos.needsUpdate = true;
      waveGeo.computeVertexNormals();

      hub.rotation.y = t * 0.14;
      hub.rotation.x = Math.sin(t * 0.35) * 0.12;
      hubCore.scale.setScalar(1 + Math.sin(t * 2.4) * 0.1);

      agents.forEach((a, i) => {
        const base = agentDefs[i].pos;
        a.position.y = base.y + Math.sin(t * 0.65 + i) * 0.10;
        a.rotation.y = t * 0.25 + i;
      });

      ribbons.forEach((mesh, i) => {
        const def = agentDefs[i];
        const base = def.pos;
        const yOff = Math.sin(t * 0.65 + i) * 0.10;
        const mid = new THREE.Vector3().addVectors(new THREE.Vector3(0, 0.35, 0), new THREE.Vector3(base.x, base.y + yOff, base.z)).multiplyScalar(0.5);
        mid.y += 0.45;
        mid.x *= 0.7;
        mid.z += Math.sin(t * 0.9 + i) * 0.12;
        ribbonCurves[i].points[1].copy(mid);
        ribbonCurves[i].points[2].set(base.x, base.y + yOff, base.z);
        const newGeo = new THREE.TubeGeometry(ribbonCurves[i], 28, 0.025 + Math.sin(t * 1.2 + i) * 0.004, 10, false);
        mesh.geometry.dispose();
        mesh.geometry = newGeo;
        (mesh.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.22 + Math.sin(t * 1.5 + i) * 0.07;
      });

      travelers.forEach((tr) => {
        tr.t += 0.007 * tr.speed;
        if (tr.t > 1) tr.t -= 1;
        const pt = ribbonCurves[tr.idx].getPoint(tr.t);
        tr.mesh.position.copy(pt);
      });

      field.rotation.y = t * 0.006;
      camera.position.x += (mouse.x * 0.7 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.4 + 1.2 - camera.position.y) * 0.04;
      camera.lookAt(0, 0.2, 0);
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
    <div className="h-[560px] md:h-[680px] lg:h-[760px] w-full relative overflow-hidden rounded-[32px] bg-white border border-zinc-200 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)]">
      {!ready && <div className="absolute inset-0 grid place-items-center font-mono text-xs text-zinc-400">crafting Layers-grade 3D…</div>}
      <div ref={mountRef} className="absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/60 to-transparent" />
      <div className="absolute top-5 left-5 md:top-7 md:left-7 rounded-full bg-white/92 backdrop-blur border border-zinc-200 px-4 py-2 font-mono text-[10px] tracking-[0.16em] font-bold text-zinc-700 shadow-sm">
        ● LAYERS-GRADE 3D — RIBBON + WAVE + MESH
      </div>
      <div className="absolute bottom-5 right-5 md:bottom-7 md:right-7 flex gap-2 font-mono text-[10px]">
        <span className="rounded-full bg-zinc-900 text-white px-3.5 py-2">Fluid & Iridescent</span>
        <span className="rounded-full bg-white border border-zinc-200 px-3.5 py-2 text-zinc-700">Waves & Terrain</span>
      </div>
    </div>
  );
}
