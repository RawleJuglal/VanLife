import React from "react"
import { useLoaderData, Form, redirect } from "react-router-dom"
import { loginUser } from "../../hooks/api"

export function loader({request}){
    return new URL(request.url).searchParams.get('message')
}

export async function action({ request }){
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    const data = await loginUser({ email, password})
    localStorage.setItem('loggedin', true)
    return redirect("/host")


}

export function Login() {
    const [status, setStatus] = React.useState('idle')
    const [error, setError] = React.useState(null)
    const message = useLoaderData()


    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h2 className="red">{message}</h2>}
            {error && <h2 className="red">{error.message}</h2>}
            <Form method="post" className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={status === 'submitting'}>
                    {status === 'submitting' ? 'Logging in...' : 'Log in'}
                </button>
            </Form>
        </div>
    )

}