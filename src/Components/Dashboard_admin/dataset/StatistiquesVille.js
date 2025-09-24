import React, {useState} from 'react';
import { markers } from "../Product_Data";

const StatistiquesVille = () => {

 const [hovered, setHovered] = useState(null);

  const [scale, setScale] = useState(1); // Zoom

  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3)); // max x3
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5)); // min x0.5



  return (
    <div className="flex justify-center items-center  bg-gray-50">
              <svg
                viewBox="0 0 800 400"
                className="w-[90%] h-[90%] bg-white rounded-2xl shadow-md"
                style={{
                  width: "100%",
                  height: "400px",
                  transform: `scale(${scale})`,
                  transformOrigin: "center",
                }}
              >
                {/* Grille de points hexagonaux simulée */}
                {[...Array(40)].map((_, row) =>
                  [...Array(80)].map((_, col) => (
                    <circle
                      key={`${row}-${col}`}
                      cx={col * 10}
                      cy={row * 10}
                      r={2}
                      fill="#d1d5db"
                      opacity={0.5}
                    />
                  ))
                )}

                {/* Marqueurs dynamiques */}
                {markers.map((m) => (
                  <g
                    key={m.id}
                    onMouseEnter={() => setHovered(m)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <circle
                      cx={m.x}
                      cy={m.y}
                      r={50}
                      fill={m.color}
                      opacity={0.2}
                    />
                    <circle cx={m.x} cy={m.y} r={10} fill={m.color} />
                    <rect
                      x={m.x - 15}
                      y={m.y - 45}
                      width="30"
                      height="30"
                      rx="6"
                      fill={m.color}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={m.x}
                      y={m.y - 25}
                      textAnchor="middle"
                      fill="white"
                      fontSize="30"
                      fontWeight="bold"
                    >
                      💎
                    </text>
                  </g>
                ))}

                {/* Tooltip dynamique */}
                {hovered && (
                  <g>
                    <rect
                      x={hovered.x + 20}
                      y={hovered.y - 20}
                      width="120"
                      height="40"
                      rx="6"
                      fill="white"
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      filter="url(#shadow)"
                    />
                    <text
                      x={hovered.x + 30}
                      y={hovered.y + 0}
                      fill="#111827"
                      fontSize="14"
                      fontWeight="600"
                    >
                      {hovered.city}
                    </text>
                    <text
                      x={hovered.x + 30}
                      y={hovered.y + 15}
                      fill="#6b7280"
                      fontSize="12"
                    >
                      ${hovered.value.toLocaleString()}
                    </text>
                  </g>
                )}

                {/* Définition d’ombre pour le tooltip */}
                <defs>
                  <filter id="shadow" x="0" y="0" width="200%" height="200%">
                    <feDropShadow
                      dx="0"
                      dy="2"
                      stdDeviation="2"
                      floodOpacity="0.2"
                    />
                  </filter>
                </defs>
              </svg>
              {/* Boutons de zoom */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-2">
                <button
                  onClick={zoomIn}
                  className="w-10 h-10 bg-white border rounded-lg shadow flex items-center justify-center text-green-600 font-bold hover:bg-gray-100"
                >
                  +
                </button>
                <button
                  onClick={zoomOut}
                  className="w-10 h-10 bg-white border rounded-lg shadow flex items-center justify-center text-red-600 font-bold hover:bg-gray-100"
                >
                  -
                </button>
              </div>
            </div>
  )
}

export default StatistiquesVille