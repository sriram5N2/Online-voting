import axios from "axios";

export const fetchCandidates = async (
    backendUrl,
    setIsFetching,
    setCandidates,
    navigate,
    toast
) => {
    setIsFetching(true);
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
        navigate("/");
        toast({
            title: "Complete your authentication",
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
        return;
    }
    const userToken = user.token;
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        const { data } = await axios.get(
            `${backendUrl}/api/candidate/list`,
            config
        );
        setCandidates(data);
        setIsFetching(false);
    } catch (error) {
        console.log(error);
        setIsFetching(false);
        toast({
            title: "Error occurred in fetching candidates!",
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    }
};

export const castVote = async (
    votedFor,
    backendUrl,
    setIsLoading,
    setProgress,
    navigate,
    toast
) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (!user) {
        navigate("/");
        toast({
            title: "Complete your authentication",
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
        return;
    }

    const voterId = user._id;
    const userToken = user.token;
    setIsLoading(true);

    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        const { data } = await axios.post(
            `${backendUrl}/api/vote/castvote`,
            {
                voterId,
                votedFor,
            },
            config
        );
        setIsLoading(false);
        toast({
            title: `Voted Successfully for ${data.votedFor}`,
            status: "success",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
        setProgress(3);
        navigate("/results");
    } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
            title: error.response.data.message,
            status: "warning",
            duration: "3000",
            isClosable: true,
            position: "top",
        });
    }
};
