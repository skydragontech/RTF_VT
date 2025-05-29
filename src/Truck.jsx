import {useLoader} from "@react-three/fiber";
import {useEffect} from "react";
import {GLTFLoader} from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export function Truck({color}) {
    const gltf = useLoader(
        GLTFLoader, "models/truck/scene.gltf"
    );

    useEffect(() => {
        gltf.scene.position.set(0, -0.009, 0);
        gltf.scene.traverse((object) => {
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                if (
                    object.material
                    && [
                        'Object_16',
                        'Object_17',
                        'Object_18'
                    ].includes(object.name)
                ) {
                    object.material.color.set(color);
                }
            }
        });
    }, [gltf, color]);

    return <primitive object={gltf.scene}/>;

}
