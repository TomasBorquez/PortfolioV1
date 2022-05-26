import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
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

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    // controls.enableDamping = true
    // controls.target = new THREE.Vector3(3, 3, 3)
    // mover la camara ^^

    // Our Pupper
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('../../model/amongus.gltf',
            (gltf) => {
              scene.add(gltf.scene)
            },
    )

    // DirectionalLight (all of the above with angle)
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3)
    // directionalLight.position.set(5, 5, 5)
    // scene.add(directionalLight)

    // DirectionalLight (all of the above with angle)
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3)
    // directionalLight.position.set(5, 5, 5)
    // scene.add(directionalLight)

    // HDRI
    // const enviormentMap = new THREE.CubeTextureLoader()
    // const envMap = enviormentMap.load([
    //   '../../model/Standard-Cube-Map/px.png',
    //   '../../model/Standard-Cube-Map/nx.png',
    //   '../../model/Standard-Cube-Map/py.png',
    //   '../../model/Standard-Cube-Map/ny.png',
    //   '../../model/Standard-Cube-Map/pz.png',
    //   '../../model/Standard-Cube-Map/nz.png',
    // ])
    // scene.environment = envMap
    // scene.background = envMap

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
