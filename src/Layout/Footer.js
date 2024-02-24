import AquaCard from "@/reusables/card";
import AquaHeading from "@/reusables/heading";
import AQ from "../assests/logo-white.png";
import Image from "next/image";

const AquaFooter = () => {
  const date = new Date();
  const Year = date.getFullYear();
  return (
    <>
      <div>
        {/* <AquaCard>
          <AquaCard>
            <div className="text-center">
              <AquaHeading level={5}>AquaKart © {Year}</AquaHeading>
            </div>
          </AquaCard>
        </AquaCard> */}

        <div className="footer-aqua">
          <div className="container mt-2">
            <div className="row">
              <div className="col text-center">
                <Image src={AQ} alt="Aquakart" height="150" width="150" />
                <h4 className="text-center">Aquakart</h4>
              </div>
              <div className="col">
                <h4>categiories</h4>
              </div>
              <div className="col">
                <h4>subscribe form</h4>
              </div>
            </div>
          </div>
          <AquaCard>
            <div className="row social handle">
              <div className="col">
                <AquaHeading level={5}>AquaKart © {Year}</AquaHeading>
              </div>
              <div className="col"></div>
            </div>
          </AquaCard>
        </div>
      </div>
    </>
  );
};
export default AquaFooter;
