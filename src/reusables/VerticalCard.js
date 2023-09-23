import Image from "next/image"
import AQ from "../testImages/shoe.webp"

const AquaVerticalCard = (props) => {
    const {title , description , } = props
    return (
        <>
            <div class="card aq-card shadow-lg">
                <div className="shadow-lg aq-card-image-vertical gradient-1">
                    <Image src={AQ} class="card-img-top custom-image" alt="..." />
                </div>
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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