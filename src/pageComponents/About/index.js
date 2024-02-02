import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaLargeTitle from "@/reusables/largeTitle";

const AquaAboutPageComponent = () => {
  const SeoData = {
    title: "Aquakart | About",
  };
  return (
    <>
      <AquaLayout seo={SeoData}>
        <div className="card-body aqua-crystal-color">
          <div className="row">
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <div className="about-large-title" />
              <AquaLargeTitle display={3}>
                We are in mission to clear hard water
              </AquaLargeTitle>
            </div>
            <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
              <div className="about-title" />
              <AquaHeading>
                Hello there welcome back, we are in starting stage of using
                softeners as every place dosen't deliver the same water softenes
                some places are great and some places are not{" "}
              </AquaHeading>
            </div>
          </div>
        </div>
      </AquaLayout>
    </>
  );
};
export default AquaAboutPageComponent;
