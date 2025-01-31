import { useEffect, useRef } from "react";
import * as THREE from "three";

const HoloRedFace = () => {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(200, 200);
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0xff0000, // Red color for the Signup page
            wireframe: true,
        });

        const sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        const animate = () => {
            requestAnimationFrame(animate);
            sphere.rotation.y -= 0.01; // Opposite rotation compared to login page
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="holo-red-face"></div>;
};

export default HoloRedFace;
