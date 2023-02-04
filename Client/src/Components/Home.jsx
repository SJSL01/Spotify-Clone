import useAuth from "../useAuth"

import { Container } from "react-bootstrap"

export default function Home({ code }) {
    const token = useAuth(code)
    return (
        <div>HELLO {token}</div>
    )
}
