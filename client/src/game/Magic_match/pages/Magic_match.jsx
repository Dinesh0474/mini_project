import  { useEffect, useState } from "react";
import img1 from "../images/cartoon1.png";
import img2 from "../images/cartoon2.png";
import img3 from "../images/cartoon3.png";
import img4 from "../images/cartoon4.png";
import img5 from "../images/cartoon5.png";
import img6 from "../images/cartoon6.png";
import game_back from "../images/game_logo.png";
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Simplified card images array
const cardImages = [
  { src: img1, matched: false },
  { src: img2, matched: false },
  { src: img3, matched: false },
  { src: img4, matched: false },
  { src: img5, matched: false },
  { src: img6, matched: false },
];

const MagicMatch = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const navigate = useNavigate();

  const shuffleCards = () => {
    // Step 1: Duplicate the cards array
    const duplicatedCards = [...cardImages, ...cardImages];
    console.log("Duplicated Cards:", duplicatedCards);

    // Step 2: Shuffle the duplicated cards
    const shuffledCards = duplicatedCards.sort(() => Math.random() - 0.5);
    console.log("Shuffled Cards:", shuffledCards);

    // Step 3: Assign a unique ID to each card and set flipped state
    const cardsWithIds = shuffledCards.map((card) => ({
      ...card,
      id: Math.random(),
      flipped: false, // Add flipped state
    }));
    console.log("Cards with IDs:", cardsWithIds);

    // Step 4: Set the shuffled cards in state
    setCards(cardsWithIds);
    setTurns(0);
    setGameOver(false);
  };

  const handleClick = (card) => {
    // Prevent more than two selections
    if (choiceOne && choiceTwo) return;

    setCards(prevCards =>
      prevCards.map(c =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurns();
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === choiceOne.id || card.id === choiceTwo.id
                ? { ...card, flipped: false }
                : card
            )
          );
          resetTurns();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameOver(true);
    }
  }, [cards]);

  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  };

  return (
    <div>
      <div className="text-bold text-white text-2xl pb-1 pl-5 p-3 bg-gray-800" onClick={() => navigate('/home')}>
              <ArrowLeft />
      </div>
    <div className="bg-gray-800 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-mono text-center text-white mb-4">
        Magic Match
      </h1>
      <button
        className="border-red-500 border-2 px-4 py-2 text-white bg-red-500 rounded"
        onClick={shuffleCards}
      >
        New Game
      </button>
      <p className="text-white mt-4">Turns: {turns}</p>
      {gameOver && <p className="text-white mt-4">Your score is: {turns} turns</p>}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="size-40 bg-white relative"
            onClick={() => handleClick(card)}
          >
            <img
              src={card.flipped || card.matched ? card.src : game_back}
              alt="card"
              className="absolute inset-0 max-w-full max-h-full"
            />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MagicMatch;
