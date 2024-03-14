import AquaLayout from "@/Layout/Layout";
import AquaStandardShadowCard from "@/components/cards/aquaStandardShadowCard";
import AquaHeading from "@/reusables/heading";
import { Button } from "react-bootstrap";
import { FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const AquaContactUs = () => {
  const seo = {
    titie: "Aquakart | contact-us",
    description: "",
    keywords: "",
  };
  return (
    <AquaLayout seo={seo} container={true}>
      <div className="row mb-3">
        <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
          <AquaStandardShadowCard>
            <AquaHeading center={true} decorate={true} level={1}>
              Our Social Handels
            </AquaHeading>
            <div className="text-center">
              <a
                type="button"
                class="btn"
                href="https://www.instagram.com/aquakart.co.in/"
              >
                <FaInstagram size={40} />
              </a>
            </div>
          </AquaStandardShadowCard>
        </div>
        <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
          <AquaStandardShadowCard>
            <AquaHeading center={true} decorate={true} level={1}>
              Our Contact Handels
            </AquaHeading>
            <div className="text-center">
              <a
                className="btn btn-base"
                href="mailto:customercare@aquakart.co.in"
              >
                <FaEnvelope size={30} />
              </a>
              <a
                className="btn btn-base"
                href="https://wa.me/919014774667?text=Hello please clear out query we are contacting you from Aquakart"
              >
                <FaWhatsapp size={30} />
              </a>
            </div>
          </AquaStandardShadowCard>
        </div>
      </div>
      <div className="align-contact-card">
        <AquaStandardShadowCard width="400px">
          <p className="text-muted">
            We're committed to fostering a strong connection with our users and
            have provided numerous contact methods for your convenience. Don't
            hesitate to reach out—we're here to assist you and will respond as
            swiftly as we can.
          </p>
        </AquaStandardShadowCard>
      </div>
    </AquaLayout>
  );
};
export default AquaContactUs;
