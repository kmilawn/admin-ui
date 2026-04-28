import React, { useState } from 'react';

function PostCard(props) {
    const { id, userId, title, body } = props;
    const [clicked, setClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    function handleClick() {
        setClicked(true);
    }

    return (
        <div 
            className={`
                bg-white p-6 rounded-lg shadow transition-all duration-300
                ${isHovered ? 'scale-105 border-2 border-defaultBlack bg-pink-50! shadow-md' : ''}
            `}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 text-center" >{title}</h2>
                <p className="text-gray-600 line-clamp-3 mb-4 flex-grow text-center">{body}</p>
                
                <button 
                    className={`
                        text-white p-2 rounded-md transition-all duration-300 
                        ${clicked ? 'bg-special-red2' : 'bg-gray-01'}
                        ${isHovered ? 'brightness-125 scale-105' : ''}
                    `}
                    onClick={handleClick}
                >
                    {clicked ? "Tombol sudah diklik" : "Silakan Klik"}
                </button>
            </div>
        </div>
    );
}

export default PostCard;