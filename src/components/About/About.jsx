import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import './About.css';

function About() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    // Scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      4,
      currentMount.clientWidth / currentMount.clientHeight,
      0.5,
      1000
    );
    camera.position.set(60, 20, 20)
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement)

    // Shadows
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;


    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true;
    // move camera ^^

    // Our model
    const model = new URL('../../../public/models/doggy.glb', import.meta.url);
    const adder = new THREE.Group();
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(model.href, gltb => {
              adder.add(gltb.scene)
              adder.traverse(n => {
                if (n.isMesh) {
                  n.castShadow = true;
                  n.receiveShadow = true;
                  if (n.material.map) n.material.map.anisotropy = 16;
                }
              })
              adder.position.y = -1
              scene.add(adder)
            },
    )

    // DirectionalLight (all of the above with angle)
    const directionalLight = new THREE.HemisphereLight(0xd8cb9c, 0x080820, 0.6)
    // directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)
    
    const spotLight = new THREE.SpotLight(0xffa95c, 4)
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.001;
    spotLight.shadow.mapSize.width = 1024 * 4;
    spotLight.shadow.mapSize.height = 1024 * 4;
    scene.add(spotLight)

    // Scene render
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
      spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10,
      )
      adder.rotation.y += 0.002
      requestAnimationFrame(animate)
    }
    animate()

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
