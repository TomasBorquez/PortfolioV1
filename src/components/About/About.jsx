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
    const renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    // move camera ^^

    // Our model
    const model = new URL('../../../public/models/doggy.glb', import.meta.url);
    const adder = new THREE.Group();
    const gltfLoader = new GLTFLoader()
    gltfLoader.load(model.href,
            gltb => {
              adder.add(gltb.scene)
              adder.position.y = -1
              scene.add(adder)
              console.log(gltb)
            },
    )

    // DirectionalLight (all of the above with angle)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    // HDRI
    // const enviormentMap = new THREE.CubeTextureLoader()
    // const envMap = enviormentMap.load([
    //   './envmap/px.png',
    //   './envmap/nx.png',
    //   './envmap/py.png',
    //   './envmap/ny.png',
    //   './envmap/pz.png',
    //   './envmap/nz.png',
    // ])
    // scene.environment = envMap

    // Scene render
    const animate = () => {
      controls.update()
      renderer.render(scene, camera)
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
