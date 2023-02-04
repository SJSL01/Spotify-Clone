import { useEffect, useState } from "react";
import axios from "axios"

export default function useAuth(code) {

    const [accessToken, setAccessToken] = useState(null)
    const [refreshToken, setRefreshToken] = useState(null)
    const [expiresIn, setExpiresIn] = useState(null)

    const getAuth = async () => {
        try {
            const res = await axios.post("http://localhost:3010/login", { code })
            setAccessToken(res.data.accessToken)
            setRefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, "/")
        }
        catch (e) {
            window.location = "/"
            console.log(e.body)
        }
    }

    const refreshUserToken = async () => {
        try {
            const res = await axios.post("http://localhost:3010/renew", {refreshToken})
            console.log(res.data)
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.expiresIn)
        }
        catch (e) {
            window.location = "/"
            console.log(e.body)
        }
    }

    useEffect(() => {

        getAuth()

    }, [code])



    useEffect(() => {

        if (!accessToken || !expiresIn) return

        const timer = setInterval(() => {
            refreshUserToken()
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(timer)

    }, [refreshToken, expiresIn])

    return accessToken;

}
