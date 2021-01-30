import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { Vector3, Camera } from 'three';
import { useSphere } from '@react-three/cannon';
import { useKeyboardControls } from '../hooks/useKeyboardControls';


let updateVelocity = (velocity, control, rotation) => {
    const SPEED = 6;

    const result = new Vector3((control.moveRight?1:0) - (control.moveLeft?1:0), 0,(control.moveBackward?1:0) - (control.moveForward?1:0));
    
    result.normalize()
        .multiplyScalar(SPEED)

    result.applyEuler(rotation)
    let doJump = control.Jump && Math.abs(velocity[1].toFixed(2)) < 0.05
    return [result.x, doJump?8:velocity[1], result.z]

}

let updateCamera = (camera:Camera, control) => {
    if(control.cameraLeft) camera.rotateY(0.03)
    if(control.cameraRight) camera.rotateY(-0.03)
}

export const Player = (props) => {

    const velocity = useRef([0, 0, 0])
    useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [])

    const { camera } = useThree()

    let control = useKeyboardControls();

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        onCollide: (e) => {console.log(e)},
        ...props,
    }));

    useFrame(() => {
        camera.position.copy(ref.current.position);

        let newVelocity  = updateVelocity(velocity.current, control,camera.rotation)
        api.velocity.set(newVelocity[0], newVelocity[1], newVelocity[2])

        updateCamera(camera,control)

    });

    return (
        <>
            <mesh ref={ref} />
        </>
    );
};
