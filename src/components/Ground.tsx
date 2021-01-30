import React from 'react' 
import { usePlane } from '@react-three/cannon';
import { grassTexture } from '../loaders/GrassLoader';
import { RepeatWrapping } from 'three';


export function Ground () {
    const [ref] = usePlane (() => ({mass:0,position:[0,0,0], rotation:[-Math.PI /2,0,0]}))

    grassTexture.wrapS = RepeatWrapping;
    grassTexture.wrapT = RepeatWrapping;
    grassTexture.repeat.set(100, 100);
    return (
        <mesh ref={ref} receiveShadow >
            <planeBufferGeometry attach="geometry" args={[100,100]}/>
            <meshLambertMaterial attach="material" map={grassTexture} color="grey"/>
        </mesh>
    );
}