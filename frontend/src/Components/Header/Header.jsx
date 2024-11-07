import React, { useContext, useEffect, useState } from "react";
import {
    Box,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { StatusContext } from "../../Context/Context";
import "./Header.css";

const steps = [
    { title: "Home" },
    { title: "Authentication" },
    { title: "Vote" },
    { title: "Results" },
];

function Header() {
    // use status to know whether really the user has completed the before steps, useContext
    const location = useLocation();
    const { progress } = useContext(StatusContext);

    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    useEffect(() => {
        setActiveStep(progress);
        const currentLocation = location.pathname.slice(1);
        if (currentLocation !== "") setActiveStep(Math.max(progress, 1));

        // if (
        //     currentLocation === "auth" ||
        //     currentLocation === "vote" ||
        //     currentLocation === "results"
        // ) {
        //     setActiveStep(1);
        // } else if (status === "authorized") {
        //     setActiveStep(2);
        // } else if (status === "voted") {
        //     setActiveStep(3);
        //     setTimeout(() => {
        //         setActiveStep(4);
        //     }, 2000);
        // } else {
        //     setActiveStep(0);
        // }
    }, [location, progress, setActiveStep]);

    return (
        <div className="header">
            <div className="app-heading">VoteEasy</div>
            <Stepper index={activeStep} colorScheme="green" className="stepper">
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink="0">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>
                                {step.description}
                            </StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}

export default Header;
