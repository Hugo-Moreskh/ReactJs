// App.js
import React, { useState, useEffect } from "react";
import "./App.css";
import Title from "./components/Title";
import Card from "./components/Cards";
import Button from "./components/Button";

const App = () => {
  const [cards, setCards] = useState([
    { id: 1, img: "ReactJs/public/brook.jpg" }, // Assurez-vous de remplacer 'path_to_image' par le chemin de vos images
    { id: 2, img: "ReactJs/public/brook.jpg" },
    { id: 3, img: "<ReactJs/public/chopper.jpg" },
    { id: 4, img: "ReactJs/public/chopper.jpg" },
    { id: 5, img: "ReactJs/public/luffy.jpg" },
    { id: 6, img: "ReactJs/public/luffy.jpg" },
    { id: 7, img: "ReactJs/public/nami.jpg" },
    { id: 8, img: "ReactJs/public/nami.jpg" },
    { id: 9, img: "ReactJs/public/sanji.jpg" },
    { id: 10, img: "ReactJs/public/sanji.jpg" },
    { id: 11, img: "ReactJs/public/zoro.jpg" },
    { id: 12, img: "ReactJs/public/zoro.jpg" },
  ]);

  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  // Fonction pour mélanger les cartes
  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Mélanger les cartes une fois au chargement initial
  useEffect(() => {
    setCards(shuffleCards(cards));
  }, []);

  const handleCardClick = (id) => {
    if (flippedCards.length === 2) return;

    const isAlreadyFlipped = flippedCards.includes(id);
    if (!isAlreadyFlipped) {
      setFlippedCards([...flippedCards, id]);
    }

    if (flippedCards.length === 1) {
      const isMatch =
        cards.find((card) => card.id === flippedCards[0]).img ===
        cards.find((card) => card.id === id).img;
      if (isMatch) {
        setMatchedCards([...matchedCards, flippedCards[0], id]);
      }
      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
    }
  };

  return (
    <div className="App">
      <Title text="Memory Game" />
      <div className="card-container">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            img={card.img}
            isFlipped={
              flippedCards.includes(card.id) || matchedCards.includes(card.id)
            }
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>
      {matchedCards.length === cards.length && (
        <div className="message">Bravo vous avez gagné !</div>
      )}
      <Button text="Rejouer" onClick={() => window.location.reload()} />
    </div>
  );
};

export default App;
