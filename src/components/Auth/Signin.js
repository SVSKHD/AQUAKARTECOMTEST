import AquaInput from "@/reusables/input"
import { useState } from "react"

const AquaSignin = () => {
    const [data, setData] = useState({ email: "", password: "" })
    console.log('data', data)
    return (
        <>
            <div className="">
                <AquaInput label="Email" placeholder="please enter your email" value={data.email} handleChange={(e) => setData({ ...data, email: e.target.value })} />
                <AquaInput label="Password" type="password" placeholder="please enter your password" value={data.password} handleChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>
        </>
    )
}
export default AquaSignin