import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export function Truck(){
    const gltf = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/truck/scene.gltf"
    );

    useEffect(() => {
        //gltf.scene.scale.set(0.005, 0.005, 0.005 );
        gltf.scene.position.set(0, -0.009, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                if (object.material && object.material.envMapIntensity !== undefined) {
                    object.material.envMapIntensity = 100;
                }
            }
        });
        const axesHelper = new THREE.AxesHelper(10);
        axesHelper.setColors('#ff0000', '#00ff00', '#0000ff' );
        gltf.scene.add(axesHelper);
    }, [gltf]);

//     useFrame((state, delta) => {
//     let t = state.clock.getElapsedTime();

//     let group = gltf.scene.children[0].children[0].children[0];
//     group.children[0].rotation.x = t * 2;
//     group.children[2].rotation.x = t * 2;
//     group.children[4].rotation.x = t * 2;
//     group.children[6].rotation.x = t * 2;
//   });

    return <primitive object={gltf.scene} />;

}