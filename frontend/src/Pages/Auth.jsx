import React, { useContext, useEffect, useState } from "react";
import "./Pages.css";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { StatusContext } from "../Context/Context";
import { authenticaton, sendOtp, verifyOtp } from "../Utils/AuthUtils";
import { ArrowBackIcon, ArrowForwardIcon, ArrowUpIcon } from "@chakra-ui/icons";
import Timer from "../Components/Timer/Timer";

function Auth() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [otp, setOtp] = useState("");
    const [hash, setHash] = useState("");
    const [otpLoading, setOtpLoading] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [otpVerifying, setOtpVerifying] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);

    const [isLogin, setIsLogin] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const toast = useToast();
    const { setProgress, backendUrl } = useContext(StatusContext);

    const handleGoBack = () => {
        navigate("/");
    };

    const handleContinue = () => {
        navigate("/vote");
    };

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (emailVerified) {
            authenticaton(
                isLogin,
                emailVerified,
                email,
                password,
                backendUrl,
                setProgress,
                handleContinue,
                toast
            );
        } else {
            toast({
                title: "Complete email verification",
                status: "warning",
                duration: "3000",
                isClosable: true,
                position: "top",
            });
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (timerStarted) {
            setTimeout(() => {
                if (!timerStarted) {
                    toast({
                        title: "Timer elapsed",
                        status: "warning",
                        duration: "3000",
                        isClosable: true,
                        position: "top",
                    });
                }
                setTimerStarted(false);
            }, 30000);
        }
    }, [timerStarted, toast]);

    return (
        <div className="page">
            <div className="auth">
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Enter your password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel className="otp-field-box">
                                <Button
                                    className="send-otp-button"
                                    colorScheme="green"
                                    isLoading={otpLoading}
                                    isDisabled={!email}
                                    onClick={() =>
                                        sendOtp(
                                            email,
                                            backendUrl,
                                            setHash,
                                            setOtpLoading,
                                            setTimerStarted,
                                            toast
                                        )
                                    }
                                >
                                    Send OTP
                                </Button>
                                <span className="otp-caption">
                                    <span>{"(Expires in 30 seconds)"}</span>
                                    <span
                                        style={{
                                            width: "100%",
                                            height: "10px",
                                        }}
                                    >
                                        {timerStarted && <Timer />}
                                    </span>
                                </span>
                            </FormLabel>
                            <InputGroup>
                                <InputRightElement className="otp-button-box">
                                    <Button
                                        h="38px"
                                        w="104px"
                                        isLoading={otpVerifying}
                                        isDisabled={!otp}
                                        onClick={() =>
                                            verifyOtp(
                                                otp,
                                                hash,
                                                backendUrl,
                                                setEmailVerified,
                                                setOtpVerifying,
                                                setTimerStarted,
                                                toast
                                            )
                                        }
                                    >
                                        Verify OTP
                                    </Button>
                                </InputRightElement>
                                <Input
                                    type="password"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                />
                            </InputGroup>
                        </FormControl>
                        <div className="continue-btn auth-btn">
                            <Button
                                rightIcon={<ArrowUpIcon />}
                                colorScheme="green"
                                variant="solid"
                                type="submit"
                                isLoading={isLoading && !isLogin}
                                loadingText="Signup"
                                onClick={() => setIsLogin(false)}
                                isDisabled={
                                    (isLoading && isLogin) || !emailVerified
                                }
                            >
                                {"Signup"}
                            </Button>
                            <Button
                                rightIcon={<ArrowForwardIcon />}
                                colorScheme="green"
                                variant="solid"
                                type="submit"
                                isLoading={isLoading && isLogin}
                                loadingText="Login"
                                onClick={() => setIsLogin(true)}
                                isDisabled={
                                    (isLoading && !isLogin) || !emailVerified
                                }
                            >
                                {"Login"}
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="card-footer">
                    <div className="continue-btn">
                        <Button
                            leftIcon={<ArrowBackIcon />}
                            colorScheme="green"
                            variant="outline"
                            onClick={handleGoBack}
                        >
                            Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;
