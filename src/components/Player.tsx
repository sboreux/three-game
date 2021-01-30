import React, { useEffect } from 'react';
import { useThree, useFrame } from 'react-three-fiber';
import { Vector3 } from 'three';
import { useSphere } from '@react-three/cannon';
import { useState } from 'react/cjs/react.development';
import { useKeyboardControls } from '../hooks/useKeyboardControls';


let updateVelocity = (velocity, control, rotation) => {
    const SPEED = 6;

    const result = new Vector3((control.moveRight?1:0) - (control.moveLeft?1:0), 0,(control.moveBackward?1:0) - (control.moveForward?1:0));
    
    result
        .multiplyScalar(SPEED)
        .normalize()

    result.applyEuler(rotation)

    return [result.x, result.y, result.z]

}

export const Player = (props) => {

    const [state, setState] = useState({ velocity: [0, 0, 0] })

    const { camera } = useThree()

    let control = useKeyboardControls();

    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: 'Dynamic',
        ...props,
    }));

    useFrame(() => {
        camera.position.copy(ref.current.position);

        setState({ ...state, velocity: updateVelocity(state.velocity, control,camera.rotation) })
        api.velocity.set(state.velocity[0], state.velocity[1], state.velocity[2])

    });

    return (
        <>
            <mesh ref={ref} />
        </>
    );
};
