import Image from "next/image"
import AQ from "../testImages/shoe.webp"
const AquaHorizontalCard = () => {
    return (
            <>
            <div className="card mb-3 shadow-lg rounded-25" styles={{ maxWidth: '540px' }}>
                <div className="row g-0">
                    <div className="col-md-6">
                        <div className="gradient-1">
                            <Image src={AQ} className="img-fluid rounded-start shadow-lg custom-image" alt="..." />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card-body">
                            <h5 className="card-title">Card title horizontal</h5>
                            <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AquaHorizontalCard