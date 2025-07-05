import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate()

    const handleOnClick = async () => {
        const data = { email, password };
        console.log(data)
        const res = await axios.post("http://localhost:3001/signin", data, { withCredentials: true });
        if(res.data.success) navigate("/createRoom")
    }
    return (
        <div className="text-white">
            <input type="text" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleOnClick}>Enter</button>
        </div>
    )
}

export default Signin