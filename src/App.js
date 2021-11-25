import React, { useMemo, useState } from 'react';
import { Container, Row, Form } from 'react-bootstrap';
import Board from './components/Board';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //[variable]: tableau contenant toutes les formes utilisées (insert svg files in shapes directory + import in Shape.jsx)
  const shapes = useMemo(() => ["square", "triangle", "circle", "star"], []);

  //[variable]: nombre de dupliqués par forme (par exemple 2, 3, 4... carrés ou triangles dans le jeu)
  const [duplicatesCount, setDuplicatesCount] = useState(2);
  //nombre de formes à utiliser
  const [shapesCount, setShapesCount] = useState(3);
  //générer un tableau contenant les datas à afficher mais sans ordre aléatoire à partir de [shapes] et duplicatesCount
  const dataArray = useMemo(() => {
    const result = []
    for (let i = 0; i < duplicatesCount; i++) {
      shapes.slice(0, shapesCount).forEach((shape, index) => {
        result.push({
          id: `${i}${index}`,
          shape: shape,
        })
      })
    }
    return result
  }, [duplicatesCount, shapes, shapesCount])
  return (
    <div className="app">
      <Container>
        <h1 className="page-title w-100 text-center">Matching game</h1>
        <h2 className="title">Settings :</h2>
        <div className="d-flex justify-content-start mb-4">
          <div className="form-field">
            <Form.Label>Number of duplicates</Form.Label>
            <Form.Control
              type="number"
              value={duplicatesCount}
              onChange={(e) => {
                const value = e.target.value;
                if (value > 1) {
                  setDuplicatesCount(value);
                }
              }} />
          </div>
          <div className="form-field">
            <Form.Label>Number of shapes</Form.Label>
            <Form.Select
              value={shapesCount}
              onChange={(e) => {
                const value = e.target.value;
                setShapesCount(value);
              }}>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </Form.Select>
          </div>
        </div>
        <Board dataArray={dataArray} />
        <Row>
          <h2 className="title w-100 pt-5 text-end">By: Ahmed Majoul</h2>
        </Row>
      </Container>
    </div>
  );
}

export default App;
