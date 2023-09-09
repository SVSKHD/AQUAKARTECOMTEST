const AquaPlaceHolderInput = ({type , placeholder , handleChange}) =>{
    return(
        <>
            <input type={type} className="form-control" id="inputPassword2" placeholder={placeholder} onChange={handleChange}/>
        </>
    )
}
export default AquaPlaceHolderInput
