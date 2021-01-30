import React from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { Sky, PerspectiveCamera } from "@react-three/drei"
import { useBox, Physics, usePlane, useSphere } from "@react-three/cannon"
import { grassTexture } from './src/loaders/GrassLoader'
import { Brick } from './src/components/Brick'

import { Wall } from './src/components/Wall';
import { Ground } from './src/components/Ground';
import { Player } from './src/components/Player';
import { Vector3 } from 'three';


function Box() {
    const [ref, api] = useSphere(() => ({ mass: 1, position: [0, 10, 0] }))
    const { camera } = useThree()

    return (
        <mesh ref={ref} onClick={() => {
            let cameraDirection = new Vector3();
            camera.getWorldDirection(cameraDirection)
            api.applyLocalImpulse([cameraDirection.x,cameraDirection.y,cameraDirection.z], [0, 10, 0]  )
        }} >
            <sphereBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    );
}


export default function App() {
    return (
        <Canvas>
            <Sky sunPosition={[100, 20, 100]} />
            <pointLight position={[100, 20, 100]}></pointLight>
            <PerspectiveCamera makeDefault/>
            <Physics>
                <Ground />
                <Box></Box>
                <Wall width={10} height={4} position={[0, 0, 0]} direction="x" />
                <Wall width={9} height={4} position={[0, 0, 1]} direction="y" />
                <Wall width={10} height={4} position={[0, 0, 10]} direction="x" />
                <Wall width={9} height={4} position={[10, 0, 1]} direction="y" />
                <Player position={[-10, 3, 10]}></Player>
            </Physics>
            <ambientLight intensity={0.5} />
        </Canvas >
    );
}