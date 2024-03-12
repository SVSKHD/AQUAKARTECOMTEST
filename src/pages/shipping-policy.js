import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import { useState } from "react";

const ShippingPolicy = () => {
  const [data, setData] = useState("");
  const seo = {
    title: "Aquakart | Shipping and delivery policy",
    description:
      "Aquakart is renowned for its vast array of aquatic products, catering to enthusiasts and professionals alike. The cornerstone of our customer satisfaction lies in our transparent and efficient shipping policy, designed to deliver your aquatic essentials with speed, care, and precision.",
    keywords:
      "Aquakart shipping-policy , shipping rates , national-shipping AquaKart Shipping Policy, Free Shipping Hyderabad,Quick Delivery Service ,Cash on Delivery Hyderabad ,Andhra Pradesh Shipping , Telangana Shipping Services ,Rayalaseema Product Delivery , Nationwide Shipping India , Fast Shipping AquaKart , Online Shopping Delivery , Business Days Shipping , E-commerce Shipping India , Secure Packaging AquaKart , Customer Service AquaKart , Order Tracking AquaKart",
    keyphrases: "charges regarding aquakart",
  };
  const shippingPolicy = [
    {
      title: "Shipping & Delivery In Hyderabad",
      description: "",
    },
    {
      title: "Shipping & Delivery out of Hyderabad",
      description: "",
    },
    {
      title: "Shipping & Delivery out of Telangana",
      description: "",
    },
  ];
  return (
    <AquaLayout seo={seo}>
      <AquaHeading level={1}>Shipping Policy</AquaHeading>
      <div className="row">
        <div className="col-md-3 col-lg-3 col-xs-12 col-sm-12">
          <div className="card shadow-lg">
            <div className="card-body"></div>
          </div>
        </div>
        <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
          <div className="card shadow-lg mb-3">
            <div className="card-body">
              <hr/>
            <h4 className="text-danger">Note :</h4>
            </div>
           
          </div>
          
        </div>
      </div>
    </AquaLayout>
  );
};
export default ShippingPolicy;
