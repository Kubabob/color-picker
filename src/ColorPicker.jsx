import { useState } from "react";
import './ColorPicker.css';

export default function ColorPicker() {

    const [selectedColor, setSelectedColor] = useState({ hex: null, name: null });
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [colorFlag, setColorFlag] = useState(false);

    const colors = [
    { name: "Red", hex: "#FF0000" },
    { name: "Green", hex: "#00FF00" },
    { name: "Blue", hex: "#0000FF" },
    { name: "Yellow", hex: "#FFFF00" },
    { name: "Cyan", hex: "#00FFFF" },
    { name: "Magenta", hex: "#FF00FF" },
    ];

    const handleClick = (color) => {
        if (colorFlag === false) {
            setSelectedColor({hex: color.hex, name: null})
        } else {
            setSelectedColor({hex: color.hex, name: color.name});
        }
        setColorFlag(!colorFlag);
    }

    const handleMouseEnter = (hex) => {
        setSelectedColor({hex: hex, name: null})
    }

    const handleMouseLeave = () => {
        setSelectedColor({hex: null, name: null})
    }

    const handleFocus = (index) => {
        setFocusedIndex(index);
    }

    const handleBlur = () => {
        setFocusedIndex(null);
    }


    const handleKeyDown = (e) => {
        
        if (e.key === "ArrowRight") {
            if (focusedIndex === colors.length-1) {
                setFocusedIndex(0);
            } else {
                setFocusedIndex(focusedIndex+1);
            }
        } else if (e.key === "ArrowLeft") {
            if (focusedIndex === 0) {
                setFocusedIndex(colors.length-1);
            } else {
                setFocusedIndex(focusedIndex-1);
            }
        } else if (e.key === "Enter") {
            if (colorFlag === false) {
                setSelectedColor({hex: colors[focusedIndex].hex, name: null})
            } else {
                setSelectedColor({hex: colors[focusedIndex].hex, name: colors[focusedIndex].name});
            }
            setColorFlag(!colorFlag);
        }
    }

    return (
        <>
            <div className="color-picker">
                <h1>Color Picker</h1>
                <div className="color-list">
                    {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`color-item ${focusedIndex === index ? 'focused' : ''}`}
                        style={{ backgroundColor: color.hex }}
                        onClick={() => handleClick(color)}
                        onMouseEnter={() => handleMouseEnter(color.hex)}
                        onMouseLeave={handleMouseLeave}
                        onFocus={() => handleFocus(index)}
                        onBlur={handleBlur}
                        onKeyDown={(e) => handleKeyDown(e, index, color.hex)}
                        tabIndex={0}
                    >
                        {selectedColor.hex === color.hex && (
                        <span className="color-code">{selectedColor.name || color.hex}</span>
                        )}
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
}