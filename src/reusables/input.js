import { InputGroup, FormControl, Button, Form } from 'react-bootstrap';
import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa"
import AquaButton from './button';
const AquaInput = ({ label, placeholder, handleChange, type, value, size }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
            {/* <InputGroup className="mb-3">
                <Form.Control
                    type={showPassword ? 'text' : type} // Toggle between text and password
                    className="form-control"
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-label={placeholder}
                    aria-describedby="basic-addon2"
                />
                {type === 'password' ? (
                    <InputGroup.Text id="basic-addon2"> {type === 'password' && (
                        <span onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                            {showPassword ? (
                                <FaEyeSlash /> // Font Awesome closed eye icon
                            ) : (
                                <FaEye /> // Font Awesome open eye icon
                            )}
                        </span>
                    )}</InputGroup.Text>
                )
                    : (<div />)}

            </InputGroup> */}


            {type === 'password' ? (
                <div className='mb-3'>
                    <label for="exampleFormControlInput1" class="form-label">{label}</label>
                    <div class="form-group position-relative">

                        <input type={showPassword ? 'text' : type} class="form-control" value={value} aria-label={placeholder} placeholder={placeholder} onChange={handleChange} />
                        <span class="viewpass" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>{showPassword ? (
                            <FaEyeSlash /> // Font Awesome closed eye icon
                        ) : (
                            <FaEye /> // Font Awesome open eye icon
                        )}</span>
                    </div>
                </div>
            ) : (
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">{label}</label>
                    <input type={type} class="form-control" aria-label={placeholder} id="exampleFormControlInput1" value={value} placeholder={placeholder} onChange={handleChange} />
                </div>
            )}




        </>
    )
}
export default AquaInput
