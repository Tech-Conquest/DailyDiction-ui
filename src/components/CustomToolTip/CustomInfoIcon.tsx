import React, { useState, useRef } from "react";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import "./CustomInfoIcon.css";

const CustomInfoIcon = ({
  children,
  message,
}: {
  children?: React.ReactNode;
  message: string;
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const tooltipRef = useRef(null);

  return (
    <>
      <span
        className="hover-icon-group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children ? children : <InfoTwoToneIcon />}

        {isHovering && (
          <span
            ref={tooltipRef}
            className="tooltip"
            dangerouslySetInnerHTML={{
              __html: message || "This is a tooltip!",
            }}
          ></span>
        )}
      </span>
    </>
  );
};

export default CustomInfoIcon;
