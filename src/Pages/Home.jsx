import React, { useContext } from "react";
import "./Pages.css";
import AppLogo from "../Components/AppLogo/AppLogo";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { StatusContext } from "../Context/Context";

function Home() {
    const { setProgress } = useContext(StatusContext);
    const navigate = useNavigate();

    const handleContinue = () => {
        setProgress(1);
        navigate("/auth");
    };

    return (
        <div className="page">
            <div className="home-applogo-container">
                <AppLogo width={200} height={200} />
            </div>
            <div className="intro-content">
                Tired of democracy being too straightforward? Spice things up
                with our new voting app!
                <br />
                <br />
                Welcome to VoteEasy🎊
                <div className="continue-btn">
                    <Button
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme="green"
                        variant="outline"
                        onClick={handleContinue}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Home;
