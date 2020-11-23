const API = 'http://10.0.2.2:3000';

export default {
    
    signIn: async (email, pass) => {

        const req = await fetch(`${API}/users/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, pass})
        })

        return await req.json()
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
    },

    changePass: async (id, pass, newpass) => {
        
        const req = await fetch(`${API}/users/updatepass`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, pass, newpass})
        })

        return await req.json()
    },

    deleteUser: async (id) => {

        const req = await fetch(`${API}/users/` + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        return await req.json()
    },

    postTransaction: async (type, date, category, description, value, id_user) => {

        const req = await fetch(`${API}/transaction`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({type, date, category, description, value, id_user})
        })

        return await req.json()
    },
}