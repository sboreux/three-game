import { useState, useEffect } from "react";


export const useKeyboardControls = () => {


    const keyMap = {
        ArrowUp: 'moveForward',
        ArrowDown: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
        ArrowLeft:'cameraLeft',
        ArrowRight:'cameraRight',
        Space: 'Jump',

    }

    const [state,setState] = useState ({ moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        cameraLeft: false,
        cameraRight: false,
        Jump: false
      });


    useEffect(() => {
        let keydown = ({code} ) => {
            if (code in keyMap) {
                setState({...state,  [keyMap[code]]: true})
            }
        }

        let keyup = ({code}) => {
            if (code in keyMap) {
                setState({...state,  [keyMap[code]]: false})
            }
        }

        document.addEventListener('keydown', keydown)
        document.addEventListener('keyup', keyup)

        return () => {
            document.removeEventListener('keydown', keydown)
            document.removeEventListener('keyup', keyup)
        }
    })

    return state;

}