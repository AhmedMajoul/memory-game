import React, { useMemo } from 'react';
import { Container } from 'react-bootstrap';
import Board from './components/Board';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  //[variable]: tableau contenant toutes les formes utilisées (insert svg files in shapes directory + import in Shape.jsx)
  const shapes = useMemo(() => ["square", "triangle", "circle"], []);

  //[variable]: nombre de dupliqués par forme (par exemple 2, 3, 4... carrés ou triangles dans le jeu)
  const duplicatesCount = 2;

  //générer un tableau contenant les datas à afficher mais sans ordre aléatoire à partir de [shapes] et duplicatesCount
  const dataArray = useMemo(() => {
    const result = []
    for (let i = 0; i < duplicatesCount; i++) {
      shapes.forEach((shape, index) => {
        result.push({
          id: `${i}${index}`,
          shape: shape,
        })
      })
    }
    return result
  }, [shapes])
  return (
    <div className="app">
      <Container fluid>
        <Board dataArray={dataArray} />
      </Container>
    </div>
  );
}

export default App;
