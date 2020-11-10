const API = 'http://10.0.2.2:3000';

export default {

    checkToken: async () => {

    },
    signIn: async (email, pass) => {

        const req = await fetch(`${API}/users/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, pass})
        })

        const res = await req.json()
        return res
    },
    signUp: async(name, email, pass) => {

        const req = await fetch(`${API}/users/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, pass})
        })

        return await req.json()
    },
    tokenValidate: async (token) => {

        const req = await fetch(`${API}/users/validate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        })

        return await req.json()
    }
}