/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./App.css";
import Title from "./components/Title/title";
import Card from "./components/Cards/cards"; // Importez le composant Card de manière appropriée
import Button from "./components/Button/Button";

const App = () => {
  const [cards, setCards] = useState([
    { id: 1, img: "/brook.jpg" },
    { id: 2, img: "/brook.jpg" },
    { id: 3, img: "/chopper.jpg" },
    { id: 4, img: "/chopper.jpg" },
    { id: 5, img: "/luffy.jpg" },
    { id: 6, img: "/luffy.jpg" },
    { id: 7, img: "/nami.jpg" },
    { id: 8, img: "/nami.jpg" },
    { id: 9, img: "/sanji.jpg" },
    { id: 10, img: "/sanji.jpg" },
    { id: 11, img: "/zoro.jpg" },
    { id: 12, img: "/zoro.jpg" },
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
