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
      <AquaLayout seo={SeoData}>
        <div className="card-body aqua-crystal-color container">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <div className="about-large-title" />
              <AquaLargeTitle display={3}>
                We are in mission to clear hard water
              </AquaLargeTitle>
            </div>
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <AquaStandardShadowCard>
                <p className="about-title">
                  Hello there welcome back, we are in starting stage of using
                  softeners as every place dosen't deliver the same water softenes
                  some places are great and some places are not{" "}
                </p>
              </AquaStandardShadowCard>
            </div>
          </div>
        </div>
        <div className="m-2">
          <div className="row">
            <div className="col-6">
              <AquaLargeTitle display={3}>
                Introduction to AquaKart
              </AquaLargeTitle>
            </div>
            <div className="col-6">
              <AquaStandardShadowCard>
              <p className="pdescription">
                AquaKart was founded with a clear mission: to revolutionize the way people experience water. Born from a passion for enhancing health and protecting the environment, AquaKart has swiftly become a leading name in water softening solutions. Our commitment to innovation, quality, and customer welfare stands at the core of everything we do.
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
