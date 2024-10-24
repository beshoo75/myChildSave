const getLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    console.error(
                        "Error getting location: ",
                        error.code,
                        error.message
                    );
                    reject(error);
                }
            );
        } else {
            const errorMessage =
                "Geolocation is not supported by this browser.";
            console.error(errorMessage);
            // setError(errorMessage);
            reject(new Error(errorMessage));
        }
    });
};

export default getLocation;
