'use client';

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

const ThankYou = () => {
    const [isBannerVisible, setIsBannerVisible] = useState(false);  // To handle banner visibility

    useEffect(() => {
        let animationFrame: number;
        const startTime = Date.now();
        const duration = 3000; // 3 seconds

        const shoot = () => {
            const timePassed = Date.now() - startTime;
            if (timePassed > duration) return;

            confetti({
                particleCount: 6,
                angle: 90, // fall straight down
                spread: 360,
                startVelocity: 20,
                ticks: 250,
                scalar: 1.2, // larger particles
                origin: {
                    x: Math.random(), // across the screen width
                    y: 0,
                },
                shapes: ['square', 'circle'],
            });

            animationFrame = requestAnimationFrame(shoot);
        };

        shoot();

        // Display the banner after a 1-second delay
        const timer = setTimeout(() => {
            setIsBannerVisible(true);
        }, 0);

        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white/20 to-transparent backdrop-blur-sm z-0" />

            {/* Main Content Box */}
            <div className="z-10 bg-white/80 backdrop-blur-2xl shadow-lg border border-white/30 rounded-2xl p-8 md:p-12 mx-6 max-w-xl text-center animate-fade-in-up transition-all duration-700 transform">
                <h1 className="text-4xl md:text-5xl font-semibold text-green-600 mb-6 drop-shadow-md">
                    Thank You!
                </h1>
                <p className="text-gray-700 text-lg md:text-xl mb-5 font-medium">
                    Your feedback means so much to us. 💖
                </p>
                <p className="text-gray-600 text-base md:text-md mb-6">
                    We’ve successfully received your response. Your feedback helps us grow!
                </p>

                {/* Feedback Quote */}
                <div className="mt-6">
                    <p className="text-purple-600 text-sm italic font-semibold">
                        &quot;Your feedback is the compass that guides us to excellence!&quot;
                    </p>
                </div>
            </div>

            {/* Advertisement Banner */}
            {isBannerVisible && (
                <div className="absolute bottom-2 right-6 opacity-90 animate-slide-up">
                    <Link
                        href="/"
                        className="block bg-transparent text-gray-700 py-2 px-4 font-medium text-xs italic tracking-wide hover:no-underline"
                    >
                        <span className="block text-center text-lg">
                            Visit FideFeed{' '}
                            <span className="inline-block ml-2 text-lg transform transition-transform duration-300 ease-in-out">
                                → {/* Rightwards Arrow */}
                            </span>
                        </span>
                        <span className="block text-center text-xs ">The Ultimate Feedback Platform</span>
                    </Link>
                </div>
            )}

        </div>
    );
};

export default ThankYou;
