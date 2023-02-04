
import { Button, Container } from "react-bootstrap"


const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=93ec8fe6907945488345dd8f9ab2b4e6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"



export default function Login() {
    return (
        <Container style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
            <Button onClick={() => { window.open(AUTH_URL) }} className="btn btn-success btn-lg">LOGIN WITH SPOTIFY</Button>
        </Container>
    )
}
