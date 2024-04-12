import Image from "next/image";
import NF from "../assests/NF.png";
import { FaHome } from "react-icons/fa";
import Button from "react-bootstrap/Button";

const Aqua404 = () => {
  return (
    <>
      <div class="d-flex justify-content-center align-items-center m-5">
        <div class="card shadow-lg">
          <Image
            src={NF}
            class="card-img-top"
            width="200"
            height="600"
            alt="Aquakart | Notfound"
          />
          <div class="card-body">
            <h5 class="card-title">
              The Page you are looking for is not found
            </h5>

            <div className="d-grid gap-2">
              <Button variant="dark" href="/" size="lg">
                <FaHome size={25} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Aqua404;
