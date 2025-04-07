// src/js/main.ts

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let animationFrameId: number;

export default function initThreeScene(): void {
  const container = document.getElementById('canvas-container') as HTMLElement;
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.001, 4000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const loadingBar = document.createElement('div');
  loadingBar.style.position = 'absolute';
  loadingBar.style.bottom = '10vw';
  loadingBar.style.left = '50%';
  loadingBar.style.transform = 'translate(-50%, -50%)';
  loadingBar.style.width = '50%';
  loadingBar.style.height = '5px';
  loadingBar.style.background = '#ccc';
  loadingBar.style.border = '1px solid #000';
  loadingBar.style.borderRadius = '25px';
  container.appendChild(loadingBar);

  const loadingProgress = document.createElement('div');
  loadingProgress.style.height = '100%';
  loadingProgress.style.width = '0%';
  loadingProgress.style.background = '#333';
  loadingProgress.style.borderRadius = '25px';
  loadingBar.appendChild(loadingProgress);

  const loadingManager = new THREE.LoadingManager();
  loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const progress = (itemsLoaded / itemsTotal) * 100;
    loadingProgress.style.width = `${progress}%`;
    console.log(`Lade ${url}: ${progress.toFixed(2)}% (${itemsLoaded}/${itemsTotal})`);
  };

  loadingManager.onError = (url) => {
    console.error(`Error loading url: ${url}`);
  };

  scene.background = null;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enableRotate = false;
  controls.enableZoom = false;
  controls.enablePan = false;

  const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 5.0);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  loadingManager.onLoad = () => {
    console.log('Alles geladen!');
    setTimeout(() => {
      if (loadingBar.parentNode) {
        loadingBar.parentNode.removeChild(loadingBar);
      }
    }, 10);
  };

  const loader = new GLTFLoader(loadingManager);
  const textureLoader = new THREE.TextureLoader(loadingManager);
  textureLoader.load('/assets/envMap.jpg', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });

  let mixer: THREE.AnimationMixer;
  let model: THREE.Object3D;
  const actions: Record<number, THREE.AnimationAction> = {};
  //let initialAnimationPlayed = false;
  let baseRotation = { x: 0, y: 0 };
  let interactiveRotation = { x: 0, y: 0 };
  const targetRotation = { x: 0, y: 0 };
  const smoothFactor = 0.1;
  let currentAction: THREE.AnimationAction | null = null;
  let controlsActivated = false;

  loader.load(
    '/assets/paper clip.glb',
    (gltf) => {
      model = gltf.scene;
      scene.add(model);

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).frustumCulled = false;
        }
      });

      model.rotation.y = 95;
      model.position.x = 0;

      mixer = new THREE.AnimationMixer(model);

      if (gltf.animations.length > 0) {
        actions[0] = mixer.clipAction(gltf.animations[0]);
        actions[1] = mixer.clipAction(gltf.animations[1]);

        actions[0].setLoop(THREE.LoopOnce, 1);
        actions[0].clampWhenFinished = true;
        currentAction = actions[0];
        currentAction.play();

        mixer.addEventListener('finished', (e) => {
          if (e.action === actions[0]) {
            baseRotation.x = model.rotation.x;
            baseRotation.y = model.rotation.y;

            const nextAction = actions[1];
            nextAction.reset();
            nextAction.setLoop(THREE.LoopRepeat, Infinity);
            nextAction.fadeIn(0.5);

            currentAction!.crossFadeTo(nextAction, 0.5, true);
            nextAction.play();
            
            currentAction = nextAction;

            setTimeout(() => {
              //initialAnimationPlayed = true;
              controlsActivated = true;
            }, 1000);
          }
        });
      }

      animate();
    },
    undefined,
    (err) => console.error('Failed to load model', err)
  );

  window.addEventListener('mousemove', (event: MouseEvent) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    const maxRotation = 0.2;
    targetRotation.y = mouseX * maxRotation;
    targetRotation.x = -mouseY * maxRotation;
  });

  let lastTime = performance.now() * 0.001;
  let accumulator = 0;
  const FIXED_STEP = 1 / 60;

  function animate() {
    animationFrameId = requestAnimationFrame(animate);

    const now = performance.now() * 0.001;
    let frameDelta = now - lastTime;
    lastTime = now;

    frameDelta = Math.min(frameDelta, 0.1);
    accumulator += frameDelta;

    while (accumulator >= FIXED_STEP) {
      if (mixer) mixer.update(FIXED_STEP);
      accumulator -= FIXED_STEP;
    }

    if (model && controlsActivated) {
      interactiveRotation.y += (targetRotation.y - interactiveRotation.y) * smoothFactor;
      interactiveRotation.x += (targetRotation.x - interactiveRotation.x) * smoothFactor;
      model.rotation.y = baseRotation.y + interactiveRotation.y;
      model.rotation.x = baseRotation.x + interactiveRotation.x;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  camera.position.set(-4.555, 2.145, 3.913);
  camera.lookAt(0, 0, 0);

  window.addEventListener('resize', () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
  });
}

export function destroyThreeScene(): void {
  cancelAnimationFrame(animationFrameId);
}
