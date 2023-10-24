import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaCard from "@/reusables/card";
import AquaShopFilters from "./filters/filter";

const AquaShopComponent = () => {
    const SeoData = {
        title: "Aquakart | Shop"
    }
    return (
        <AquaLayout seo={SeoData}>
            <AquaHeading level={1}>Shop here</AquaHeading>
            <hr />
            <div className="row">
                <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
                    <AquaCard>
                        <AquaHeading level={1}>Shop Filters</AquaHeading>
                        <AquaShopFilters/>
                    </AquaCard>
                </div>
                <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
                    <AquaCard>
                        <AquaHeading level={1}>Shop Products</AquaHeading>
                    </AquaCard>
                </div>
            </div>
        </AquaLayout>
    )
}
export default AquaShopComponent
