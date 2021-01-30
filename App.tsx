import React from 'react'
import {Canvas} from 'react-three-fiber'
import {OrbitControls,Sky} from "@react-three/drei"
import {useBox,Physics, usePlane} from "@react-three/cannon"
import {grassTexture} from './src/loaders/GrassLoader'
import {Brick} from './src/components/Brick'

import { Wall } from './src/components/Wall';
import { Ground } from './src/components/Ground';
import { Player } from './src/components/Player';


function Box () {
    const [ref,api] = useBox (() => ({mass:1,position:[0,10,0]}))

    return (
        <mesh ref={ref}   onClick={ ()=> {
            api.velocity.set(0,2,0)
        }} >
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink"/>
            <OrbitControls/>        
        </mesh>
    );
}


export default function App (){
    return (
        <Canvas>
            <Sky sunPosition={[100, 20, 100]}/>
            <pointLight position={[100, 20, 100]}></pointLight>
            <Physics>
                <Ground/>
                <Box></Box>
                <Wall width={10} height={4} position={[0, 0, 0]} direction="x"/>
                <Wall width={9} height={4} position={[0, 0, 1]} direction="y"/>
                <Wall width={10} height={4} position={[0, 0, 10]} direction="x"/>
                <Wall width={9} height={4} position={[10, 0, 1]} direction="y"/>
                <Player position={[-10, 3, 10]}></Player>
            </Physics>
            <ambientLight intensity={0.5} />
        </Canvas>    
    );
}