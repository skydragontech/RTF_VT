import React, {Suspense, useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Environment, OrbitControls, PerspectiveCamera} from "@react-three/drei";
import {useControls, Leva, button} from "leva";
import "./style.css";
import {Ground} from "./Ground";
import {Truck} from "./Truck";
import ColorDock from "./ColorDock";

function CarShow({cameraPos, ambientOn, color}) {
    const {ambientIntensity, mainLightIntensity} = useControls({
        ambientIntensity: {value: 1.2, min: 0, max: 5, step: 0.1},
        mainLightIntensity: {value: 3, min: 0, max: 10, step: 0.1},
    });
    return (
        <>
            <OrbitControls
                target={[0, 0.35, 0]}
                maxPolarAngle={1.45}
                enableDamping={true}
                dampingFactor={0.05}
            />
            <Environment preset="warehouse"/>
            {ambientOn && <ambientLight intensity={ambientIntensity}/>}
            <PerspectiveCamera
                makeDefault fov={45}
                position={cameraPos}
            />
            <directionalLight
                position={[-5, 5, 5]}
                intensity={mainLightIntensity}
                castShadow={true}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-near={0.5}
                shadow-camera-far={50}
            />
            <directionalLight position={[0, 0.5, 2]} intensity={0.5}/>
            <directionalLight position={[-2, 0.5, 0]} intensity={0.5}/>
            <directionalLight position={[2, 0.5, 0]} intensity={0.5}/>
            <color args={[0.1, 0.1, 0.1]} attach="background"/>
            <Truck color={color}/>
            <Ground/>
        </>
    );
}

function App() {
    const [activeIndex, setActiveIndex] = useState(null);
    const defaultCamera = [0, 5, 10];
    const [cameraPos, setCameraPos] = useState(defaultCamera);
    const [ambientOn, setAmbientOn] = useState(true);
    const [color, setColor] = useState('#487C1C');
    useControls({
        "Reset Camera": button(() => {
            setCameraPos([0, 5, 10 + Math.random() * 0.01]);
        }),
        "Toggle Ambient": button(() => setAmbientOn(a => !a)),
        "color": {
            value: color,
            onChange: setColor
        }
    });

    useEffect(() => {
        // console.log("color changed:", color);
    }, [color]);

    return (
        <Suspense fallback={null}>
            <Canvas shadows>
                <CarShow cameraPos={cameraPos} ambientOn={ambientOn} color={color}/>
                <gridHelper args={[10]}/>
                <axesHelper args={[5]}/>
            </Canvas>
            <Leva collapsed={false}/>
            <ColorDock color={color} setColor={setColor} />
        </Suspense>
    );
}

export default App;
