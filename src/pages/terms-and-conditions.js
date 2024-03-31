import AquaLayout from "@/Layout/Layout";
import { useState } from "react";

const AquaTermsAndConditions = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState("");
  const seo = {
    title: "Aquakart | Terms and Conditions",
  };

  const termsAndConditons = [
    {
      title: "Introduction",
      description:
        "Welcome to AquaKart, your reliable source for aquatic products. These Terms and Conditions govern your use of the AquaKart website and its services. By accessing AquaKart, you agree to be bound by these terms and all applicable laws and regulations.",
    },
    {
      title: "Shipping and Delivery",
      description:
        "AquaKart is committed to delivering your products in a timely and efficient manner. We offer various shipping options to meet your needs. Shipping costs and delivery times vary based on the shipping method selected and your location. Please note that delivery times are estimates and may be subject to delays.",
    },
    {
      title: "Returns, Refunds, and Exchanges",
      description:
        "We strive for your complete satisfaction with our products. If for any reason you are not satisfied with your purchase, you may return the item within 30 days for a full refund or exchange. Items must be in their original condition and packaging. Refunds will be processed to the original method of payment within a specified number of days after receiving the returned item.",
    },
    {
      title: "Intellectual Property Rights",
      description:
        "The content on AquaKart, including text, graphics, logos, images, as well as the compilation thereof, and any software used on the site, is the property of AquaKart or its suppliers and protected by copyright and other intellectual property laws. You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of the service, use of the service, or access to the service without express written permission by us.",
    },
    {
      title: "Purchasing and Payment",
      description:
        "AquaKart offers various payment methods, including credit card, debit card, and PayPal. All transactions are encrypted for your security. Please ensure that the billing information you provide is accurate to avoid delays in order processing.",
    },
    {
      title: "User Accounts and Responsibilities",
      description:
        "To use certain features of AquaKart, you may be required to create an account and provide accurate and complete information. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.",
    },
    {
      title: "Disclaimers and Limitations of Liability",
      description:
        "AquaKart does not guarantee that the website will be uninterrupted or error-free, and we will not be liable for any interruptions, errors, or other inconveniences. The website and all products and services delivered to you through the website are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties, or conditions of any kind, either express or implied.",
    },
    {
      title: "Privacy Policy",
      description:
        "Your privacy is of utmost importance to AquaKart. Our Privacy Policy outlines how we collect, use, protect, or otherwise handle your Personally Identifiable Information in accordance with our website. This includes information collected when you register on our site, place an order, subscribe to a newsletter, or enter information on our site.",
    },
    {
      title: "Dispute Resolution",
      description:
        "Any disputes related to your use of the AquaKart website or purchases made through AquaKart will be governed by the laws of the jurisdiction from which the products were purchased. We strongly encourage users to contact us directly to seek a resolution before resorting to any legal action. If a dispute cannot be resolved through direct negotiation, it may be required to submit the dispute to binding arbitration or small claims court.",
    },
    {
      title: "Changes to Terms and Conditions",
      description:
        "AquaKart reserves the right, at our sole discretion, to update, change, or replace any part of these Terms and Conditions by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms and Conditions constitutes acceptance of those changes.",
    },
    {
      title: "Contact Information for Complaints and Legal Notices",
      description:
        "Should you have any complaints or need to deliver legal notices to AquaKart, please contact us via our provided email address or phone number listed on our website. We are committed to resolving any issues in a timely and satisfactory manner.",
    },
    {
      title: "Summary",
      description:
        "The Terms and Conditions outlined here govern your use of the AquaKart platform and services. By accessing and using AquaKart, you agree to comply with these terms, including our policies on user accounts, purchases, shipping, returns, intellectual property, and dispute resolution. We aim to provide a secure and satisfactory experience for all our users and encourage you to contact us with any concerns or questions regarding these terms.",
    },
  ];

  const showData = (r) => {
    setShow(true);
    setData(r);
  };

  return (
    <AquaLayout seo={seo} container={true}>
      <h1>Terms And Conditions</h1>
      <hr />
      <div className="card shadow-lg mb-4 ">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12 terms-and-conditons-height  ">
              {termsAndConditons.map((r, i) => (
                <>
                  <div key={i} class="card mb-3 shadow-lg">
                    <div className="card-body">
                      <h5 className="card-title">
                        {i + 1}-{r.title}
                      </h5>
                      <p className="card-text">
                        {r.description.substring(0, 25)}...
                      </p>
                      <a
                        href="#"
                        onClick={() => showData(r)}
                        className="btn btn-dark"
                      >
                        Show More
                      </a>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
              {show ? (
                <>
                  <div className="card">
                    <div className="card-body">
                      <h5>
                        <b>{data.title}</b>
                      </h5>
                      <hr />
                      <p>{data.description}</p>
                    </div>
                  </div>
                </>
              ) : (
                "select the terms to show them completly"
              )}
            </div>
          </div>
        </div>
      </div>
    </AquaLayout>
  );
};
export default AquaTermsAndConditions;
