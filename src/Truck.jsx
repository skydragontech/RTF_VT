import {useLoader} from "@react-three/fiber";
import {useEffect} from "react";
import {DRACOLoader, GLTFLoader} from "three/examples/jsm/Addons.js";
import * as THREE from "three";
import { EffectComposer } from '@react-three/postprocessing';

export function Truck({color, lightsOn = false}) {

    const gltf = useLoader(
        GLTFLoader,
        "models/truck/glb/target.glb",
        (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath("/draco/");
            loader.setDRACOLoader(dracoLoader);
        }
    );

    useEffect(() => {
        console.info("Loading Truck");
        gltf.scene.position.set(0, -0.009, 0);
        gltf.scene.traverse((object) => {
            //console.log(object.name);
            if (object instanceof THREE.Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                // 替换名为 AeroCabFH500Glass001 的材质为新的玻璃材质
                if (object && object.name === 'AeroCabFH500Glass001') {
                    const glassMaterial = new THREE.MeshPhysicalMaterial({
                        color: 0xffffff,
                        metalness: 0,
                        roughness: 0.15,
                        transmission: 1.0,
                        thickness: 0.5,
                        transparent: true,
                        opacity: 0.5,
                        ior: 1.5,
                        reflectivity: 0.15,
                        clearcoat: 0.3,
                        clearcoatRoughness: 0.2
                    });
                    object.material = glassMaterial;
                    console.log('Replaced AeroCabFH500Glass001 material with anti-reflective glass material:', glassMaterial);
                }
                if (object && object.name === 'AeroCabFH500Lights') {
                    const lightMaterial = new THREE.MeshPhysicalMaterial({
                        color: lightsOn ? 0xffffee : 0x222222,
                        metalness: 0.5,
                        roughness: 0.2,
                        transmission: 0.8,
                        thickness: 0.2,
                        transparent: true,
                        opacity: 0.8,
                        ior: 1.3,
                        reflectivity: 0.7,
                        clearcoat: 1.0,
                        clearcoatRoughness: 0.05,
                        emissive: lightsOn ? 0xffffee : 0x000000,
                        emissiveIntensity: lightsOn ? 25 : 0
                    });
                    object.material = lightMaterial;
                    console.log('Replaced AeroCabFH500Lights material with switchable light material:', lightMaterial);
                    // 使用 spotLight he spotlight01 反馈车灯开关
                    const spotLight = gltf.scene.getObjectByName('spotlight');
                    const spotLight01 = gltf.scene.getObjectByName('spotlight001');
                    if (spotLight) spotLight.visible = lightsOn;
                    if (spotLight01) spotLight01.visible = lightsOn;
                }
                if (
                    object.material
                    && [
                        'Object_16',
                        'Object_17',
                        'Object_18'
                    ].includes(object.name)
                ) {
                    //object.material.color.set(color);
                }
            }
        });
    }, [gltf, color, lightsOn]);

    // 直接返回包裹主场景的 EffectComposer，不做任何后处理
    return (
        <EffectComposer>
            <primitive object={gltf.scene} />
        </EffectComposer>
    );
}
