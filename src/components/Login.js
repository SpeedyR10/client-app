import React, {useState} from 'react'

export default function Login() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()
        alert(`Username: ${userName} \n Password: ${password}`)
    }

    return (
        <>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input id="username" onChange={(e)=>setUserName(e.target.value)} value={userName}/>
                </div>
                <div>
                    <label>Password:</label>
                    <input id="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </div>
                <div>
                    <button>Submit</button>
                </div>
            </form>
        </>
  )
}

