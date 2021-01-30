import { useState, useEffect } from "react";


export const useKeyboardControls = () => {


    const keyMap = {
        ArrowUp: 'moveForward',
        ArrowDown: 'moveBackward',
        ArrowLeft: 'moveLeft',
        ArrowRight: 'moveRight'

    }

    const [state,setState] = useState ({ moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
      });


    useEffect(() => {
        let keydown = ({key}) => {
            if (key in keyMap) {
                setState({...state,  [keyMap[key]]: true})
            }
        }

        let keyup = ({key}) => {
            if (key in keyMap) {
                setState({...state,  [keyMap[key]]: false})
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