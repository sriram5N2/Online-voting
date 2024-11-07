import axios from "axios";

export const fetchResults = async (
    backendUrl,
    setIsLoading,
    setResultsChartData,
    setWinnerData,
    setProgress,
    navigate,
    toast
) => {
    try {
        setIsLoading(true);
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
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userToken}`,
            },
        };
        const { data } = await axios.get(
            `${backendUrl}/api/vote/votecount`,
            config
        );
        setResultsChartData({
            labels: data.results.map((candidate) => candidate.alliance),
            datasets: [
                {
                    label: "Votes Per Alliance",
                    backgroundColor: "rgba(75, 192, 192, 0.3)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    hoverBackgroundColor: "rgba(75, 192, 192, 0.4)",
                    hoverBorderColor: "rgba(75, 192, 192, 1)",
                    data: data.results.map((candidate) => candidate.totalVotes),
                },
            ],
        });
        setWinnerData(data.winner[0]);
        setProgress(4);
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.log(error);
    }
};
