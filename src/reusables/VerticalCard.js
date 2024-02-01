import Image from "next/image"
import AQ from "../testImages/shoe.webp"
import AquaProductUnControlledCarousel from "./productCarousel"
import {FaHeart , FaRegHeart} from "react-icons/fa"
import AquaButton from "./button"

const AquaVerticalCard = (props) => {
    const {title , description , images , favourite} = props
    return (
        <>
            <div class="card aq-card shadow-lg rounded-25">
                <div className="shadow-lg aq-card-image-vertical gradient-1">
                    {images ? (<><AquaProductUnControlledCarousel images={images} className="card-img-top custom-image" width="100" height="280" alt={`Aquakart Images | ${title}`} /></>) :<Image src={AQ} className="card-img-top custom-image" alt="..." />}
                </div>
                <div class="card-body">
                    <div className="row">
                        <div className="col-10"><h3 class="card-title mt-3">{title}</h3></div>
                        <div className="col-2"><AquaButton variant="normal"/><FaRegHeart size={23}/></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AquaVerticalCard