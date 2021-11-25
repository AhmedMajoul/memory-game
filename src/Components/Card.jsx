import React from 'react';
import Shape from './Shape';

const Card = ({ isPlaying, id, shape, selected, setSelected, found, duplicateCount }) => {
    const isSelected = selected?.includes(id);
    const isFound = found?.includes(id);
    
    //fonction onClick sur la card
    const handleClick = () => {
        if (selected.length < duplicateCount && isPlaying && !isFound && !isSelected) {
            setSelected([...selected, id])
        }
    }
    return (
        <div className={`${isFound && isPlaying ? "found selected " : ""}${isSelected && isPlaying ? "selected " : ""}memory-card`}
            onClick={handleClick}>
            <div className="memory-card-inner">
                <div className="memory-card-front">
                    <img src="https://www.svgrepo.com/show/207511/question-mark-question.svg" alt="Mistery" />
                </div>
                <div className="memory-card-back d-flex align-items-center justify-content-center">
                    <Shape shape={shape} />
                </div>
            </div>
        </div>
    )
}

export default Card