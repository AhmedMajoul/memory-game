import React, { useState, useEffect, useCallback } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import Card from './Card';

const Board = ({ dataArray }) => {

    //fonction de randomization pour permettre de changer l'ordre d'une partie à une autre
    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array;
    }

    //state intermédiaire contenant les id des cartes sélectionnées
    const [selected, setSelected] = useState([])

    //state contenant les id des cartes trouvées
    const [found, setFound] = useState([]);

    //state du chronomètre
    const [timer, setTimer] = useState(0);

    //state du nombre de coups
    const [moves, setMoves] = useState(0);

    //state pour marquer si le jeu n'a pas encore débuté val(null), s'il est en cours val(true), s'il est terminé val(false)
    const [isPlaying, setIsPlaying] = useState(null);

    //state contenant la table de datas randomizées
    const [shuffledArray, setShuffledArray] = useState([])

    //recompter le nombre de dupliqués directement de la table à afficher, par mesure de précaution en cas de changement futur
    const duplicateCount = shuffledArray.reduce((total, { shape }) => ((shape === shuffledArray[0]?.shape) ? total + 1 : total), 0)

    //randomization de la table de datas et initialisation
    useEffect(() => {
        setTimer(0);
        setMoves(0);
        setFound([]);
        setSelected([]);
        setIsPlaying(null);
        setShuffledArray(shuffle(dataArray));
    }, [dataArray])

    //fonction timer
    useEffect(() => {
        let timerInterval = null
        if (isPlaying) {
            timerInterval = setInterval(() => {
                setTimer((t) => (t + 1))
            }, 1000)
        }
        else { clearInterval(timerInterval) }
        return () => clearInterval(timerInterval)
    }, [isPlaying])

    //fonction de fin de jeu
    useEffect(() => {
        if (found?.length === shuffledArray?.length && shuffledArray?.length) {
            setIsPlaying(false)
        }
    }, [shuffledArray.length, found.length])

    //fonction pour vérifier si tous les éléments sélectionnés sont de la même forme
    useEffect(() => {
        if (selected.length > 1) {
            const selectedToShape = selected?.map((id) => (shuffledArray?.find((el) => id === el.id).shape))
            const isSameShape = selectedToShape?.reduce(
                (total, shape) => ((shape === selectedToShape[0]) ? total + 1 : total), 0
            ) === selected.length
            if (isSameShape) {
                if (selected?.length === duplicateCount) {
                    setMoves((m) => m + 1)
                    setFound((f) => ([...f, ...selected]));
                    setSelected([])
                }
            }
            else {
                setMoves((m) => m + 1);
                setTimeout(() => { setSelected([]) }, 500)
            }
        }
    }, [shuffledArray, duplicateCount, selected, setFound])

    //fonction rejouer (reset)
    const playAgain = useCallback(() => {
        setTimer(0);
        setMoves(0);
        setFound([]);
        setSelected([]);
        setIsPlaying(true);
        setShuffledArray(shuffle(dataArray));
    }, [dataArray])

    //fonction de conversion seconde => hh:mm:ss
    const secondsToHHmmss = useCallback(() => {
        var hours = Math.floor(timer / 3600);
        var minutes = Math.floor((timer - (hours * 3600)) / 60);
        var seconds = timer - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0" + minutes; }
        if (seconds < 10) { seconds = "0" + seconds; }
        return ({ hours, minutes, seconds })
    }, [timer])
    const { hours, minutes, seconds } = secondsToHHmmss();

    return (
        <>
            <div className="d-flex align-items-start justify-content-between">
                <h3 className="title">Moves : {moves}</h3>
                <h3 className="title">Time {hours} : {minutes} : {seconds}</h3>
            </div>
            <Row className="board position-relative pb-4 mt-4">
                {isPlaying === null && <Col className="start-overlay position-absolute d-flex align-items-center justify-content-center h-100">
                    <Button onClick={() => { setIsPlaying(true) }}>
                        START
                    </Button>
                </Col>}
                {isPlaying === false && <Col className="start-overlay position-absolute d-flex align-items-center justify-content-center h-100">
                    <Button onClick={playAgain}>
                        You Won in :<br />
                        {hours} : {minutes} : {seconds} <br />
                        Play Again?
                    </Button>
                </Col>}
                {shuffledArray.map(({ id, shape }) => (
                    <Col key={id} className="gy-4 gx-4 d-flex align-items-center justify-content-center" xs="12" sm="6" md="4" lg="3">
                        <Card isPlaying={isPlaying} id={id} shape={shape} selected={selected} setSelected={setSelected} found={found} duplicateCount={duplicateCount} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Board