import AquaLayout from "@/Layout/Layout";
import AquaStandardShadowCard from "@/components/cards/aquaStandardShadowCard";
import AquaHeading from "@/reusables/heading";
import AquaLargeTitle from "@/reusables/largeTitle";

const AquaAboutPageComponent = () => {
  const SeoData = {
    title: "Aquakart | About",
  };
  return (
    <>
      <AquaLayout seo={SeoData} container={true}>
        <div className="m-2">
          <div className="row mb-5">
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <AquaLargeTitle display={3}>
                Introduction to AquaKart
              </AquaLargeTitle>
            </div>
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <AquaStandardShadowCard>
                <p className="pdescription">
                  AquaKart was founded with a clear mission: to revolutionize
                  the way people experience water. Born from a passion for
                  enhancing health and protecting the environment, AquaKart has
                  swiftly become a leading name in water softening solutions.
                  Our commitment to innovation, quality, and customer welfare
                  stands at the core of everything we do.
                </p>
              </AquaStandardShadowCard>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <AquaStandardShadowCard>
                <p className="pdescription">
                  Aquakart is committed to enhancing the quality of water for
                  households and industries alike, guided by a vision to ensure
                  clean and safe water accessibility for all. Our core values
                  emphasize sustainability, innovation, and customer-centric
                  solutions.
                </p>
                <br />
                <p className="pdescription">
                  Our main objective is to offer cutting-edge water treatment
                  options, featuring an extensive selection of water softeners
                  engineered to effectively address hard water issues. This
                  ensures that our clients reap the advantages of softened
                  water. Moreover, we personally evaluate each product before
                  featuring it on our platform, enhancing reliability and
                  customer trust.
                </p>
              </AquaStandardShadowCard>
            </div>
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <AquaLargeTitle display={3}>
                What we sell and what they do.
              </AquaLargeTitle>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <AquaLargeTitle display={3}>Why choose us..?</AquaLargeTitle>
            </div>
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <AquaStandardShadowCard>
                <p className="pdescription">
                  The motivation behind our focus on water quality stems from
                  the crucial role water plays in health and sustainability. By
                  offering efficient water softening solutions, we aim to
                  contribute to the wellbeing of our customers and the
                  preservation of our environment and health.
                </p>
              </AquaStandardShadowCard>
            </div>
          </div>
        </div>
      </AquaLayout>
    </>
  );
};
export default AquaAboutPageComponent;
