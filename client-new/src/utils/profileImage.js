const predefinedColors = [
    "#FF5733", // Bright Red
    "#33FF57", // Bright Green
    "#3357FF", // Bright Blue
    "#FF33A1", // Pink
    "#FF8C33", // Orange
    "#33FFF1", // Aqua
    "#FF33FF", // Magenta
    "#A1FF33"  // Lime Green
  ];
  
  const generateColorFromInitials = (initials) => {
    let hash = 0;
    for (let i = 0; i < initials.length; i++) {
      hash = initials.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Use the hash to select a color from the predefined array
    const colorIndex = Math.abs(hash) % predefinedColors.length;
    return predefinedColors[colorIndex];
  };
  

  
  
  // Function to create an image with initials and background color
  export const generateAvatar = (firstName, lastName) => {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    const bgColor = generateColorFromInitials(initials);
    const canvas = document.createElement("canvas");
    const size = 100;
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");
  
    // Draw background
    context.fillStyle = bgColor;
    context.fillRect(0, 0, size, size);
  
    // Draw initials
    context.font = "bold 40px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(initials, size / 2, size / 2);
  
    // Return data URL
    return canvas.toDataURL("image/png");
  };
  
