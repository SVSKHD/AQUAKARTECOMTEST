import AquaLayout from "@/Layout/Layout"

const DynamicProduct = () =>{
    const SeoData = {
        title: "Aquakart | Shop",
      };
return(
    <>
    <AquaLayout seo={SeoData}>
    <div className="row">
        <div className="col-4">
          <h1>Images</h1>
        </div>
        <div className="col-8">
            <h1>Data</h1>
        </div>
    </div>
    </AquaLayout>
    </>
)
}
export default DynamicProduct