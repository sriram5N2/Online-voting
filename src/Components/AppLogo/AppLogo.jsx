import React from "react";
import finger from "../../assets/finger.png";
import globe from "../../assets/globe.webp";

function AppLogo({ width, height }) {
    return (
        <div>
            <img
                src={globe}
                alt="globe-internet"
                width={width}
                height={height}
            />
            <img
                style={{
                    position: "relative",
                    bottom: `calc(${width / 2}px - ${width / 11}px)`,
                }}
                src={finger}
                alt="vote-finger"
                width={width}
                height={height}
            />
        </div>
    );
}

export default AppLogo;
