import React, { useEffect, useState } from 'react';

// Generates random numbers within a range
const random = (min, max) => Math.random() * (max - min) + min;

export const FloatingSquares = () => {
    const [squares, setSquares] = useState([]);

    useEffect(() => {
        // Generate between 30 and 50 squares
        const numSquares = Math.floor(random(30, 50));
        const newSquares = Array.from({ length: numSquares }).map((_, i) => ({
            id: i,
            size: random(2, 6), // Sizes between 2px and 6px
            x: random(0, 100), // Random starting X position (%)
            y: random(100, 120), // Start slightly below the screen
            duration: random(15, 35), // How long it takes to float up (in seconds)
            opacity: random(0.1, 0.3), // Varying opacity for depth
            delay: random(0, 20), // Stagger the start times
        }));

        setSquares(newSquares);
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {squares.map((square) => (
                <div
                    key={square.id}
                    className="absolute bg-primary dark:bg-white animate-float-up"
                    style={{
                        width: `${square.size}px`,
                        height: `${square.size}px`,
                        left: `${square.x}%`,
                        bottom: `-${square.size * 2}px`, // strictly start off-screen
                        opacity: square.opacity,
                        animationDuration: `${square.duration}s`,
                        animationDelay: `${square.delay}s`,
                        animationIterationCount: 'infinite'
                    }}
                />
            ))}
        </div>
    );
};
