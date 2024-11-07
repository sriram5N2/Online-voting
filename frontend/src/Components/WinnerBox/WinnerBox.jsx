import React, { useState } from "react";
import Confetti from "react-confetti";
import "./WinnerBox.css";

const WinnerBox = ({ alliance, votes }) => {
    return (
        <div className="winner-box">
            <Confetti
                className="confetti"
                wind={0.09}
                width={200}
                height={150}
            />
            <div className="winner-badge-box">
                <div className="winner-badge">
                    {alliance}
                    <br />
                    {votes + " "}votes
                </div>
            </div>
        </div>
    );
};

export default WinnerBox;
