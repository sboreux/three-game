import React from 'react' 
import { Brick } from './Brick';


export function Wall (props) {


    const bricks = [];
    
    for (let dir = 0; dir < props.width ; dir++){
        for (let z = 0; z < props.height ; z++)
        {
            let position = props.position.map((el,i) => {
                if (i==0 && props.direction === "x") {
                    return el + dir
                }
                if (i==2 && props.direction === "y") {
                    return el + dir
                }
                if (i==1) {return el+z}
                return el
            });
            bricks.push(<Brick key={[dir,z]} position={position}/>)
        }
    }

    return (
        <group name="wall"> 
            { bricks }
        </group>
    );
}