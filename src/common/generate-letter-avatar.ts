function getRandomColor() {
  const colors = [
    "#f87171",
    "#34d399",
    "#60a5fa",
    "#fbbf24",
    "#a78bfa",
    "#f472b6",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function generateLetterAvatar(word: string, size: number = 100) {
  if (typeof document === "undefined") return "";
  const firstLetter = word.charAt(0).toUpperCase();
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  canvas.width = size;
  canvas.height = size;
  ctx.fillStyle = getRandomColor();
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = "#ffffff";
  ctx.font = `${size / 2}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(firstLetter, size / 2, size / 2);
  return canvas.toDataURL();
}
