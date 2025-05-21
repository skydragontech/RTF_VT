import React, {Suspense} from "react";
import {Canvas} from "@react-three/fiber";
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import "./style.css";
import {Ground} from "./Ground";
import {Truck} from "./Truck";

function CarShow() {
    return (
        <>
            <OrbitControls
                target={[0, 0.35, 0]}
                maxPolarAngle={1.45}
                enableDamping={true}
                dampingFactor={0.05}
            />
            <Environment preset="warehouse"/>
            <ambientLight intensity={1.2}/>

            <PerspectiveCamera
                makeDefault fov={45}
                position={[0, 5, 10]}
                // shadowMapType={THREE.PCFSoftShadowMap}
            />
            {/* 主光（左上方，模拟阳光） */}
            <directionalLight
                position={[-5, 5, 5]}  // 调整至左上方
                intensity={3}
                castShadow={true}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-near={0.5}
                shadow-camera-far={50}
            >
            </directionalLight>

            <directionalLight
                position={[0, 0.5, 2]}   // 正前方补光
                intensity={0.5}
            />
            <directionalLight
                position={[-2, 0.5, 0]}   // 左前方
                intensity={0.5}
            />
            <directionalLight
                position={[2, 0.5, 0]}   // 右前方
                intensity={0.5}
            />
            <color args={[0.1, 0.1, 0.1]} attach="background" />
            <Truck/>
            <Ground/>

        </>
    );
}

function App() {
    return (
        <Suspense fallback={null}>
            <Canvas shadows>
                {/* Add your 3D world */}
                <CarShow/>
            </Canvas>
        </Suspense>
    );
}

export default App;
