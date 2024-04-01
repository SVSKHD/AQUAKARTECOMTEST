import AquaLayout from "@/Layout/Layout";
import AquaStandardShadowCard from "@/components/cards/aquaStandardShadowCard";
import AquaHeading from "@/reusables/heading";
import { Button } from "react-bootstrap";
import { FaInstagram, FaEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const AquaContactUs = () => {
  const seo = {
    titie: "Aquakart | contact-us",
    description:
      "The Aquakart Contact Us page emphasizes the company's readiness to assist customers. It invites visitors to reach out through various means provided on the page for any inquiries or support needed, highlighting a commitment to customer service. For more detailed information or to view the contact options directly, it's best to visit their Contact Us page.",
    keywords: "",
  };
  return (
    <AquaLayout seo={seo} container={true}>
      <div className="row">
        <div className="col">
          <div className="card rounded-4">
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col">
          <div className="card rounded-4">
            <div className="card-body">
              <div className="text-center">
                <div className="row">
                  <div className="col">
                    <div className="text-center">
                      <button className="btn-base">
                      <FaInstagram size={40}/> fowllow us
                      </button>
                    </div>
                  </div>
                  <div className="col">
                    <div className="text-center">
                      <button className="btn-base" href="mailto:customercare@aquakart.co.in">
                        <FaEnvelope size={40}/> mail us
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card rounded-4">
            <div className="card-body">
              <div className="text-center">
                <FaPhone size={30} />
                <button
                  type="button"
                  class="btn-base"
                  href="tel:9014774667"
                  style="padding:20px;background-color:rgba(0,0,238,.5)"
                >
                  Click to call <FaPhone size={10}/> 9014774667
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="align-contact-card">
        <AquaStandardShadowCard width="400px">
          <p className="text-muted">
            We're committed to fostering a strong connection with our users and
            have provided numerous contact methods for your convenience. Don't
            hesitate to reach out—we're here to assist you and will respond as
            swiftly as we can.
          </p>
        </AquaStandardShadowCard>
      </div> */}
    </AquaLayout>
  );
};
export default AquaContactUs;
