
export function signUpAPI(userData) {
    return new Promise (async (resolve, reject) => {
        try {
            const url= 'http://localhost:8000/api/signup'
            const response = await fetch(url, {
                method: 'POST',
                headers: { "content-type": "application/json" },
                body: JSON.stringify(userData)
            })
            const data = await response.json();
            resolve({ data })
        } catch (error) {
            reject(error)
            console.log(error.message || error)
        }
    })
}

export function checkEmail({email}) {
    return new Promise(async(resolve, reject) => {
        try {
            const url= 'http://localhost:8000/api/email'
            const response = await fetch(url, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({email})
            })
            const data = await response.json();
            resolve({data})
        } catch (error) {
            reject(error)
            console.log(error.message || error)
        }
    })
}

export function signInApi(password) {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(JSON.stringify(password))
            const url = 'http://localhost:8000/api/signin'
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(password),
                credentials: "include",
            })
            const data = await response.json()
            console.log(data)
            resolve({data})
        } catch (error) {
            reject(error)
            console.log(error.message || error)
        }
    })
}

export function logOutApi() {
    return new Promise(async (resolve, reject) => {
        try {
            const url = 'http://localhost:8000/api/logout'
            const response = await fetch(url, {
                method: "GET",
                credentials: "include"
            }) 
            
            const data = await response.json()
            resolve({data})
        } catch (error) {
            reject(error.message || error)
            console.log(error.message || error)
        }
    })
}