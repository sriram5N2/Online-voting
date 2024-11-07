import axios from "axios";

export const sendOtp = async (
    email,
    backendUrl,
    setHash,
    setOtpLoading,
    setTimerStarted,
    toast
) => {
    setOtpLoading(true);
    const config = {
        header: {
            "Content-type": "application/json",
        },
    };
    try {
        const { data } = await axios.post(
            `${backendUrl}/api/auth/send-otp`,
            {
                email,
            },
            config
        );
        setHash(data.secret);
        setOtpLoading(false);
        toast({
            title: "OTP sent",
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
        setTimerStarted(true);
    } catch (error) {
        handleError(error, toast);
    }
};

export const verifyOtp = async (
    otp,
    hash,
    backendUrl,
    setEmailVerified,
    setOtpVerifying,
    setTimerStarted,
    toast
) => {
    setOtpVerifying(true);
    const config = {
        header: {
            "Content-type": "application/json",
        },
    };
    try {
        await axios.post(
            `${backendUrl}/api/auth/verify-otp`,
            {
                otp,
                hash,
            },
            config
        );
        setEmailVerified(true);
        toast({
            title: "Email Verified",
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    } catch (error) {
        toast({
            title: "Invalid OTP",
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    }
    setOtpVerifying(false);
    setTimerStarted(false);
};

export const authenticaton = async (
    isLogin,
    emailVerified,
    email,
    password,
    backendUrl,
    setProgress,
    handleContinue,
    toast
) => {
    try {
        const config = {
            header: {
                "Content-type": "application/json",
            },
        };
        if (isLogin && emailVerified) {
            const { data } = await axios.post(
                `${backendUrl}/api/auth/login`,
                {
                    email,
                    password,
                },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
        } else if (emailVerified) {
            const { data } = await axios.post(
                `${backendUrl}/api/auth/signup`,
                {
                    email,
                    password,
                },
                config
            );
            localStorage.setItem("userInfo", JSON.stringify(data));
        }
        toast({
            title: isLogin
                ? "Successfully Logged in"
                : "Successfully registered",
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
        setProgress(2);
        handleContinue();
    } catch (error) {
        handleError(error, toast);
    }
};

export const handleError = (error, toast) => {
    console.log(error);
    const errorHtml = error.response.data;
    const errorBodyStart = errorHtml.indexOf("<body>");
    const errorBodyEnd = errorHtml.indexOf("<pre>");
    const errorMessage = errorHtml.substring(errorBodyStart + 12, errorBodyEnd);
    toast({
        title: errorMessage,
        status: "warning",
        duration: "3000",
        isClosable: true,
        position: "top",
    });
};
