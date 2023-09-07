import React, { useState, useEffect } from "react";

const Clock = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const formattedTime = currentDateTime.toLocaleTimeString();
  const formattedDate = currentDateTime.toLocaleDateString();

  return (
    <div>
      <h3>Time: {formattedTime}</h3>
      <h3>Date: {formattedDate}</h3>
    </div>
  );
};

export default Clock;
