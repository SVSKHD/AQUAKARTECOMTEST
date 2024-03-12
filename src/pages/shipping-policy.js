import AquaLayout from "@/Layout/Layout"
import AquaHeading from "@/reusables/heading"

const ShippingPolicy = () =>{
    const seo = {
        title:"Aquakart | Shipping and delivery policy",
        description:"Aquakart is renowned for its vast array of aquatic products, catering to enthusiasts and professionals alike. The cornerstone of our customer satisfaction lies in our transparent and efficient shipping policy, designed to deliver your aquatic essentials with speed, care, and precision.",
        keywords:"Aquakart shipping-policy , shipping rates , national-shipping",
        keyphrases:"charges regarding aquakart"
    }
    const shippingPolicy = [
        {
            title:"",
            description:""
        }
    ]
return(
   <AquaLayout seo={seo}>
    <AquaHeading level={h1}>Shipping Policy</AquaHeading>
    <div className="row">
        <div className="col">

        </div>
        <div className="col">

        </div>
    </div>
  </AquaLayout>
)
}
export default ShippingPolicy