import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import CloudDownload from '../../img/icons8-download-from-cloud-50.svg'
import GitHubIcon from '../../img/GitHub-Mark-120px-plus.svg'
import LinkedinIcon from '../../img/icons8-linkedin.svg'
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
    camera.position.set(60, 20, 20);
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Shadows
    renderer.toneMapping = THREE.ReinhardToneMapping;
    renderer.toneMappingExposure = 2.3;
    renderer.shadowMap.enabled = true;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // move camera ^^

    // Our model
    const model = new URL('../../../public/models/doggy.glb', import.meta.url);
    const adder = new THREE.Group();
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(model.href, gltb => {
      adder.add(gltb.scene);
      adder.traverse(n => {
        if (n.isMesh) {
          n.castShadow = true;
          n.receiveShadow = true;
          if (n.material.map) n.material.map.anisotropy = 16;
        }
      });
      adder.position.y = -1;
      scene.add(adder);
    });

    // DirectionalLight (all of the above with angle)
    const directionalLight = new THREE.HemisphereLight(0xd8cb9c, 0x080820, 0.6);
    // directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0xffa95c, 4);
    spotLight.castShadow = true;
    spotLight.shadow.bias = -0.001;
    spotLight.shadow.mapSize.width = 1024 * 4;
    spotLight.shadow.mapSize.height = 1024 * 4;
    scene.add(spotLight);

    // Scene render
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      spotLight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
      );
      adder.rotation.y += 0.002;
      requestAnimationFrame(animate);
    };
    animate();

    // Scene cleanup
    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div id="centerMe">
      <div id="AboutBox">
        {/* Info about me part */}
        <div className="info">
            <div id='TittleText'>Tomas Alfonso Borquez<span className='red'>.</span></div>
            <img id="DoggoIcon" src="https://cdn.discordapp.com/attachments/706958964126122014/979544331826384916/1648855219888.jpg" alt='doggo'></img>
            <div id='Position'>Full stack Developer</div>
            <div id='BioTittle'>Bio<span className='red'>.</span></div>
            <div id='PlainText'>
              Hi, my name is Tomas, I'm from argentina and I'm an aspiring software Developer looking for my first working experience on the software develpoment industry, I'm currently studying software web develpoment at a bootcamp called Henry.
              <br></br>
              I love developing innovative and creative projects, always looking for a new challenges and new stuff to learn since I'm in love with what I do, and I do feel excited and passionate about all the techologies available to learn and soon to be released, that's why I'm constantly expanding my knowledge and looking on all sorts of ways on how to improve.
            </div>
            {/* CV Button */}
            <a href='https://martinbogado-portfolio.vercel.app/static/media/resume.8545a1bd3483c56f9e92.pdf' id='ButtonCV'>
              Download CV
              <img id="svgCV" src={CloudDownload} alt='cloud icon'/>
            </a>

            {/* GitHub Button */}
            <a href='https://github.com/TomasBorquez' id='ButtonG'>
              <img id="svgG" src={GitHubIcon} alt='github icon'/>
            </a>

            {/* Linkedin Button */}
            <a href='https://www.linkedin.com/in/tomasborquez/' id='ButtonL'>
              <img id="svgL" src={LinkedinIcon} alt='linkedin icon'/>
            </a>
        </div>
        {/* Canvas */}
        <div className="container" ref={mountRef}></div>
      </div>
    </div>
  );
}

export default About;
