const AquaInput = ({label , placeholder , handleChange , type}) =>{
    return(
        <>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">{label}</label>
                <input type={type} className="form-control" id="exampleFormControlInput1" onChange={handleChange}
                       placeholder={placeholder}/>
            </div>
        </>
    )
}
export default AquaInput
