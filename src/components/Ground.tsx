import React from 'react' 
import { usePlane } from '@react-three/cannon';
import {OrbitControls} from "@react-three/drei"
import { grassTexture } from '../loaders/GrassLoader';


export function Ground () {
    const [ref] = usePlane (() => ({mass:0,position:[0,0,0], rotation:[-Math.PI /2,0,0]}))

    return (
        <mesh ref={ref} receiveShadow >
            <planeBufferGeometry attach="geometry" args={[100,100]}/>
            <meshLambertMaterial attach="material" map={grassTexture} color="grey"/>
            <OrbitControls/>        
        </mesh>
    );
}