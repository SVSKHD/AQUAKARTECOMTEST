import Image from "next/image"
import AQ from "../testImages/shoe.webp"
const AquaHorizontalCard = () => {
    return (
        <>
            <div className="card" style={{width: '20rem'}}>
                <Image src={AQ} className="card-img-top shadow-lg custom-image" alt="..."  />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </>
    )
}
export default AquaHorizontalCard