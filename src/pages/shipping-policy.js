import AquaLayout from "@/Layout/Layout";
import AquaHeading from "@/reusables/heading";
import AquaLargeTitle from "@/reusables/largeTitle";
import { useState } from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/router";
const ShippingPolicy = () => {
  const router = useRouter();
  const [data, setData] = useState("");
  const seo = {
    title: "Aquakart | Shipping and delivery policy",
    description:
      "Aquakart is renowned for its vast array of aquatic products, catering to enthusiasts and professionals alike. The cornerstone of our customer satisfaction lies in our transparent and efficient shipping policy, designed to deliver your aquatic essentials with speed, care, and precision.",
    keywords:
      "Aquakart shipping-policy , shipping rates , national-shipping AquaKart Shipping Policy, Free Shipping Hyderabad,Quick Delivery Service ,Cash on Delivery Hyderabad ,Andhra Pradesh Shipping , Telangana Shipping Services ,Rayalaseema Product Delivery , Nationwide Shipping India , Fast Shipping AquaKart , Online Shopping Delivery , Business Days Shipping , E-commerce Shipping India , Secure Packaging AquaKart , Customer Service AquaKart , Order Tracking AquaKart",
    keyphrases: "charges regarding aquakart",
    canonical: `${process.env.apiKey}${router.pathname}`,
    image:
      "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png",
  };
  const shippingPolicy = [
    {
      title: "Shipping & Delivery In Hyderabad",
      description:
        "For shipments and deliveries within Hyderabad, we operate a local warehouse to ensure adherence to our delivery schedules, guaranteeing timely deliveries.",
    },
    {
      title: "Shipping & Delivery out of Hyderabad",
      description:
        "For shipments outside of Hyderabad, our delivery process involves a more extensive logistics network. While we strive to meet delivery timelines, the complexity of inter-city or inter-state transportation can sometimes lead to variations in delivery schedules. We work closely with our shipping partners to minimize delays and ensure your order reaches you as swiftly as possible. Our commitment to transparency means we'll keep you informed every step of the way, from dispatch to delivery, <b class='text-danger'>for example : estimated + 2 days </b>",
    },
    {
      title: "Shipping & Delivery out of Telangana",
      description:
        "Orders from Telangana will be dispatched within <b>5-10</b> days. Please allow this time frame for shipping. We appreciate your patience and look forward to serving you!",
    },
    {
      title: "Packing and Contents",
      description:
        "Experience premium packaging with Aquakart, meticulously crafted to deliver your items in perfect condition. Each package includes your chosen products, a detailed guide, warranty info, surprise gifts, and customer support contacts for a delightful unboxing journey.",
    },
  ];
  return (
    <AquaLayout seo={seo} container={true}>
      <div className="text-center">
        <AquaHeading level={1}>Shipping Policy</AquaHeading>
        <div className="row mb-5">
          <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
            <div className="card shadow-lg rounded-4 mb-2">
              <div className="card-body">
                {shippingPolicy.map((r, i) => (
                  <>
                    <div
                      key={i}
                      className="card mb-1 shadow-lg rounded-3"
                      onClick={() => setData(r)}
                    >
                      <div className="card-body">{r.title}</div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
            <div className="card shadow-lg mb-3 rounded-4">
              <div className="card-body">
                {data ? (
                  <>
                    <AquaLargeTitle level={1}>{data.title}</AquaLargeTitle>
                    <hr />
                    <p dangerouslySetInnerHTML={{ __html: data.description }} />
                  </>
                ) : (
                  "Not yet selected"
                )}
                <hr />
                <h4 className="text-danger">Note :</h4>
                <ul>
                  <li>
                    We typically dispatch orders ahead of the scheduled time in
                    Hyderabad.
                  </li>
                  <li>
                    Beyond Hyderabad, delivery times may exceed the initial
                    estimates.
                  </li>
                </ul>
                <div className="card shadow-lg">
                  <div className="card-body">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AquaLayout>
  );
};
export default ShippingPolicy;
