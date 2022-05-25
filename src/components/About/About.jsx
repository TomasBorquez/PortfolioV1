import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './About.css';

function About() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      5,
      currentMount.clientWidth / currentMount.clientHeight,
      0.5,
      1000
    );
    camera.position.z = 20
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement)

    // Our Sphere
    const geometry = new THREE.SphereGeometry(0.8, 32, 16);
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00})
    const shpere = new THREE.Mesh(geometry, material)
    scene.add(shpere)

    // Scene render
    renderer.render(scene, camera)

    // Scene cleanup
    return () => {
      currentMount.removeChild(renderer.domElement)
    }
  }, []);


  return (
    <div className='centerMe'>
      <div className="about">
        <div className="info">
          <p>Tomas Alfonso Borquez</p>
          <p>Full stack Developer</p>
        </div>

        <div className="container" ref={mountRef}></div>
      </div>
    </div>
  );
}

export default About;
