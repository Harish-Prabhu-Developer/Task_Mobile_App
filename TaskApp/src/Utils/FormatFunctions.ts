export const formatDate = (date: string) => {
    if (!date) return ""; // Handle empty values gracefully
    
    const parsedDate = new Date(date); // Convert string to Date object
  
    if (isNaN(parsedDate.getTime())) {
      console.error("Invalid date:", date); // Debugging output
      return ""; // Return an empty string for invalid dates
    }
  
    // Format the date
    const month = parsedDate.toLocaleString("en-US", { month: "short" });
    const day = parsedDate.getDate();
    const year = parsedDate.getFullYear();
  
    return `${day}-${month}-${year}`;
  };
  
    
    export function dateFormatter(dateString: string) {
      const inputDate = new Date(dateString);
    
      if (isNaN(inputDate.getTime())) {
        return "Invalid Date";
      }
    
      const year = inputDate.getFullYear();
      const month = String(inputDate.getMonth() + 1).padStart(2, "0");
      const day = String(inputDate.getDate()).padStart(2, "0");
    
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
    
    export const getInitials = (name: string): string => {
      if (!name) return "U"; // Default to "U" for "User"
    
      const names = name.trim().split(" ");
      if (names.length === 1) {
        return names[0].charAt(0).toUpperCase();
      }
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
    };
    

    export const GETROLE =(user:any)=>{
        if (user.subRole === null) {
          return user.role
          
        }
        if (user.subRole === null && user.role === null) {
          return "Not Assigned"
        }
        return user.role + " " + user.subRole;
      }


    export const GETTIMEAGO = (date: string) => {
      const now = new Date();
      const past = new Date(date);
      const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
      if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
      if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
      if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
      if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
      if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
      return `${Math.floor(diffInSeconds / 31536000)} years ago`;
    };