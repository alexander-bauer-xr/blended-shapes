declare module 'three/examples/jsm/loaders/GLTFLoader' {
  import { Loader } from 'three';
  import { LoadingManager } from 'three';
  import { Group } from 'three';
  import { AnimationClip } from 'three';

  export interface GLTF {
    animations: AnimationClip[];
    scene: Group;
    scenes: Group[];
    cameras: any[];
    asset: any;
  }

  export class GLTFLoader extends Loader {
    constructor(manager?: LoadingManager);
    load(
      url: string,
      onLoad: (gltf: GLTF) => void,
      onProgress?: (event: ProgressEvent<EventTarget>) => void,
      onError?: (event: ErrorEvent) => void
    ): void;
  }
}

declare module 'three/examples/jsm/controls/OrbitControls' {
  import { Camera, MOUSE, TOUCH, Vector3 } from 'three';
  import { EventDispatcher } from 'three';

  export class OrbitControls extends EventDispatcher {
    constructor(object: Camera, domElement?: HTMLElement);

    object: Camera;
    target: Vector3;

    enableZoom: boolean;
    enableRotate: boolean;
    enablePan: boolean;
    enableDamping: boolean;

    update(): boolean;
    dispose(): void;
    
  }
}