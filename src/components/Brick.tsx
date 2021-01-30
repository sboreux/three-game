import React from 'react' 
import { useBox } from "@react-three/cannon"
import {brickTexture} from '../loaders/BrickLoader'
 
export function Brick (props) {
    const [ref,api] = useBox (() => ({type:'Static',position:props.position}))

    return (
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial attach="material" map={brickTexture}/>
        </mesh>
    );
}