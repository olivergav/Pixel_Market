import { useEffect, useState } from "react";

import "./ProgressBar.scss";

function ProgressBar({ weight }) {
  const [accomplished, setAccomplished] = useState(0);

  const calculateProgress = () => {
    return accomplished + weight / 100;
  };

  useEffect(() => {
    const interval = setTimeout(() => {
      const calculation = calculateProgress();

      if (calculation <= 100) {
        setAccomplished(calculateProgress());
      }
    }, 100);

    return () => {
      clearTimeout(interval);
    };
  }, [accomplished]);

  return (
    <>
      {accomplished < 100 ? (
        <progress
          max="100"
          value={accomplished}
          className="progress-bar"
        ></progress>
      ) : null}
    </>
  );
}

export default ProgressBar;
