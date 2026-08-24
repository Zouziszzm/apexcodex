"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { loadGLTFModel } from "@/lib/model";
import { Disc, Disc3 } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { usePathname } from "next/navigation";

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

export const VoxelDog = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const refRenderer = useRef<THREE.WebGLRenderer | null>(null);
  const refCamera = useRef<THREE.OrthographicCamera | null>(null);
  const refControls = useRef<OrbitControls | null>(null);
  const [isRotating, setIsRotating] = useState(true);
  const urlDogGLB = "/elvendeer.glb";

  useEffect(() => {
    if (refContainer.current) {
      gsap.to(refContainer.current, {
        opacity: 1,
        duration: 1.5,
        delay: 1.5,
        ease: "power2.out",
      });
    }
  }, []);

  useEffect(() => {
    if (refControls.current) {
      refControls.current.autoRotate = isRotating;
    }
  }, [isRotating]);

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer;
    const { current: container } = refContainer;
    const { current: camera } = refCamera;
    if (container && renderer && camera) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      renderer.setSize(scW, scH);
      const aspect = scW / scH;
      const zoomMultiplier = window.innerWidth < 768 ? 1.2 : 0.9;
      const scale = (scH * 0.005 + 1.2) * zoomMultiplier;
      camera.left = -scale * aspect;
      camera.right = scale * aspect;
      camera.top = scale;
      camera.bottom = -scale;
      camera.updateProjectionMatrix();
    }
  }, []);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const { current: container } = refContainer;
    if (container && !refRenderer.current) {
      const scW = container.clientWidth;
      const scH = container.clientHeight;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(scW, scH);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
      refRenderer.current = renderer;
      const scene = new THREE.Scene();

      const target = new THREE.Vector3(-0.5, 1.2, 0);
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        2, // Lowered Y for side-view instead of top-view
        20 * Math.cos(0.2 * Math.PI),
      );

      // 640 -> 240
      // 8   -> 6
      const aspect = scW / scH;
      const zoomMultiplier = window.innerWidth < 768 ? 1.2 : 0.9;
      const scale = (scH * 0.005 + 1.2) * zoomMultiplier;
      const camera = new THREE.OrthographicCamera(
        -scale * aspect,
        scale * aspect,
        scale,
        -scale,
        0.01,
        50000,
      );
      refCamera.current = camera;
      camera.position.copy(initialCameraPosition);
      camera.lookAt(target);

      const ambientLight = new THREE.AmbientLight(0xcccccc, Math.PI);
      scene.add(ambientLight);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.autoRotate = true;
      controls.target = target;
      refControls.current = controls;

      loadGLTFModel(scene, urlDogGLB, {
        receiveShadow: false,
        castShadow: false,
      }).then(() => {
        animate();
        setLoading(false);
      });

      let req: number;
      let frame = 0;
      const animate = () => {
        req = requestAnimationFrame(animate);

        frame = frame <= 100 ? frame + 1 : frame;

        if (frame <= 100) {
          const p = initialCameraPosition;
          const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;

          camera.position.y = 2; // Keep the lowered Y during animation
          camera.position.x =
            p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
          camera.position.z =
            p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
          camera.lookAt(target);
        } else {
          controls.update();
        }

        renderer.render(scene, camera);
      };

      return () => {
        cancelAnimationFrame(req);
        if (renderer.domElement) {
          renderer.domElement.remove();
        }
        renderer.dispose();
      };
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize, false);
    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, [handleWindowResize]);

  return (
    <div
      ref={refContainer}
      className="voxel-dog relative w-full h-full border border-(--accent) group opacity-0"
    >
      <button
        onClick={() => {
          setIsRotating(!isRotating);
        }}
        className="absolute top-2 right-2 p-2 bg-[color-mix(in_srgb,var(--accent)_20%,transparent)] hover:bg-[color-mix(in_srgb,var(--accent)_40%,transparent)] rounded-[4px] opacity-0 group-hover:opacity-100 transition-all z-10"
        title={isRotating ? "Pause Rotation" : "Resume Rotation"}
      >
        {isRotating ? (
          <Disc3 size={20} className="animate-spin text-(--body)" />
        ) : (
          <Disc size={20} className="text-(--body)" />
        )}
      </button>
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Simple Spinner */}
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      )}
    </div>
  );
};
