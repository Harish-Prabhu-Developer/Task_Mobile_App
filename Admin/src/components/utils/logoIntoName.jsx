import React from 'react'

  // Utility function to get initials from a name
  const getInitials = (fullName) => {
    const names = fullName.split(" ");
    const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());
    return initials.join("");
  };

  // Utility function to generate a unique color for a user's logo
  export const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-gray-500",
    "bg-orange-500",
  ];

  const getUniqueColor = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash) % colors.length;
    return colors[colorIndex];
  };

  // Utility function to render a logo with the user's initials
  const logowithname = (name,Styled) => {
    if (!name) return null; 
    const uniqueColor = getUniqueColor(name);
    return (
      <div
        className={`${Styled} rounded-full text-white ${uniqueColor} flex items-center justify-center`}
      >
        {getInitials(name)}
      </div>
    );
  };

  export { logowithname,getUniqueColor,getInitials };