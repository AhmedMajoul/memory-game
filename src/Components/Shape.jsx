import React from 'react';
//import des svgs utilisés dans le jeu
import { ReactComponent as Square } from '../shapes/square.svg';
import { ReactComponent as Circle } from '../shapes/circle.svg';
import { ReactComponent as Triangle } from '../shapes/triangle.svg';
import { ReactComponent as Cross } from '../shapes/cross.svg';

const Shape = ({ shape }) => {
    
    //switcher pour les formes à afficher selon le prop shape
    const shapeSwitch = () => {
        switch (shape) {
            case "square":
                return <Square/>
            case "circle":
                return <Circle/>
            case "triangle":
                return <Triangle/>
                case "star":
                    return <Cross/>
            default:
                break;
        }
    }
    return (
        shapeSwitch()
    )
}

export default Shape
