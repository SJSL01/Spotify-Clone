const express = require("express")
const SpotifyWebApi = require("spotify-web-api-node")
const morgan = require("morgan")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))





app.post("/login", async (req, res) => {


    try {

        const code = req.body.code;

        const spotifyAPI = new SpotifyWebApi({
            redirectUri: "http://localhost:3000",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        })
        const data = await spotifyAPI.authorizationCodeGrant(code)

        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    } catch (e) {
        res.status(400).json(e)
    }

})





app.post("/renew", async (req, res) => {

    try {

        const refreshToken = req.body.refreshToken

        const spotifyAPI = new SpotifyWebApi({
            redirectUri: "http://localhost:3000",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken
        })

        const data = await spotifyAPI.refreshAccessToken()
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    } catch (e) {
        res.status(400).json(e)
    }
})

app.listen(3010, () => {
    console.log("SERVER UP AT 3010")
})