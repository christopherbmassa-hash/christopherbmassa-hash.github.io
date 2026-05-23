import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef(null);
  const [lineSpacing, setLineSpacing] = useState(2);
  const [lineColor, setLineColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [fileName, setFileName] = useState("moire-pattern");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = lineColor;
    ctx.beginPath();

    for (let i = 0; i < 1600; i += lineSpacing) {
      ctx.moveTo(0, 0);
      ctx.lineTo(i, 800);
      ctx.lineTo(1600, 0);
      ctx.moveTo(1600, 800);
      ctx.lineTo(i, 0);
      ctx.lineTo(0, 800);
    }

    ctx.stroke();
  }, [lineSpacing, lineColor, backgroundColor]);
  function downloadImage() {
    const canvas = canvasRef.current;
    const link = document.createElement("a");

    link.download = `${fileName || "moire-pattern"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
  return (
    <>
      <header>
        <h1>Christopher Massa&apos;s Moiré Funporium</h1>
        <p>
          This is my first React version of a canvas drawing experiment. The goal
          is to generate moiré-style patterns, tweak the settings, and eventually
          download the result as an image.
        </p>
      </header>
      <label>
        Line spacing: {lineSpacing}
        <input
          type="range"
          min="1"
          max="50"
          value={lineSpacing}
          onChange={(e) => setLineSpacing(Number(e.target.value))}
        />
      </label>
      <div className="controls">
        <label>
          Line color:
          <input
            type="color"
            value={lineColor}
            onChange={(e) => setLineColor(e.target.value)}
          />
        </label>

        <label>
          Background:
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
          />
        </label>

        <label>
          File name:
          <input
            type="text"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
        </label>

        <button onClick={downloadImage}>Download PNG</button>
      </div><canvas
        ref={canvasRef}
        width="1600"
        height="800"
        style={{
          border: "1px solid #ccc",
          maxWidth: "100%",
        }}
      />
    </>
  );
}

export default App;