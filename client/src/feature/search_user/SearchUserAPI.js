export function searchUserAPI(search) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = 'http://localhost:8000/api/search-user';
            const response = await fetch(url, {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(search)
            });
            const data = await response.json();
            // console.log("searchUserAPI", data)
            resolve({data})
        } catch (error) {
            console.log(error.message || error)
        }
    })
}