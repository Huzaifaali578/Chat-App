export function getUserDetailAPI() {
    return new Promise(async (resolve, reject) => {
        try {
            const url = 'http://localhost:8000/api/user-detail'
            const response = await fetch(url, {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            console.log(data)
            resolve({data})
        } catch (error) {
            reject(error)
            console.log(error.message || error)
        }
    })
};

export function updateUserDetailAPI(updateData) {
    return new Promise(async (resolve, reject) => {
        try {
            const url = "http://localhost:8000/api/update-user"
            const response = await fetch(url, {
                method: "PATCH",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(updateData),
                credentials: "include"
            });
            const data = await response.json()
            resolve({data})
        } catch (error) {
            reject(error.message || error)
            console.log(error.message || error)
        }
    })
};