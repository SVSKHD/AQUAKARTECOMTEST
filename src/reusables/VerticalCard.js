import Image from "next/image"
import AQ from "../testImages/shoe.webp"
import AquaUnControlledCarousel from "./carousel"

const AquaVerticalCard = (props) => {
    const {title , description , images } = props
    return (
        <>
            <div class="card aq-card shadow-lg rounded-25">
                <div className="shadow-lg aq-card-image-vertical gradient-1">
                    {images ? (<><AquaUnControlledCarousel images={images}/></>) :<Image src={AQ} class="card-img-top custom-image" alt="..." />}
                </div>
                <div class="card-body">
                    <h5 class="card-title">{title}</h5>
                    <p class="card-text">{description}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
        </>
    )
}
export default AquaVerticalCard