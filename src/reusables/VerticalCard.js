import Image from "next/image"
import AQ from "../testImages/shoe.webp"
import {Badge , Button} from "react-bootstrap"
import AquaProductUnControlledCarousel from "./productCarousel"
import {FaHeart , FaRegHeart , FaCartPlus} from "react-icons/fa"
import AquaButton from "./button"

const AquaVerticalCard = (props) => {
    const {title , description , images , favourite , price} = props
    return (
        <>
            <div class="card aq-card shadow-lg rounded-25">
                <Button className="product-cart"><FaCartPlus size={25}/></Button>
                <div className="shadow-lg aq-card-image-vertical gradient-1">
                    {images ? (<><AquaProductUnControlledCarousel images={images} className="card-img-top custom-image" width="100" height="280" alt={`Aquakart Images | ${title}`} /></>) :<Image src={AQ} className="card-img-top custom-image" alt="..." />}
                </div>
                <h4><Badge className="badge-product-align">{price}</Badge></h4>
                <div class="product-card-body">
                    <div className="row align-items-center">
                        <div className="col-10"><h3 class="card-title mt-3">{title}</h3></div>
                        <div className="col-2 align-margin"><AquaButton variant="normal"/><FaRegHeart className="text-danger" size={25}/></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AquaVerticalCard