import { useState } from "react"
import AquaLayout from "@/Layout/Layout";
import AquaLargeTitle from "@/reusables/largeTitle";

const AquaPrivacyPolicy = () => {
  const [description, setDesription] = useState("")
  const PrivacyPolicy = [
    {
      "title": "Introduction to the Privacy Policy",
      "description": "At Aquakart, we recognize the importance of privacy and are committed to maintaining the confidentiality of our website visitors and customers. This Privacy Policy outlines our practices and principles in collecting, using, and safeguarding personal information, aligning with our core values and legal obligations."
    },
    {
      "title": "Purpose and Scope",
      "description": "The purpose of this Privacy Policy is to inform you about how Aquakart collects, processes, and protects your personal data when you interact with our website. Whether you're browsing our products, signing up for an account, or making a purchase, we want you to understand our practices to ensure a transparent and trustworthy environment."
    }
  ]
  const seo = {
    "title": "Aquakart | Privacy Policy"
  }
  return (
    <AquaLayout seo={seo}>
      <h1>Privacy And Policy</h1>
      <hr />
      <div className="row mb-5">
        <div className="col-md-4 col-lg-4 col-xs-12 col-sm-12">
          {PrivacyPolicy.map((r, i) => (
            <div className="card mb-1" onClick={() => setDesription(r)}>
              <div className="card-body">
                <div className="card-title">{i + 1} - {r.title}</div>
              </div>
            </div>
          ))}

        </div>
        <div className="col-md-8 col-lg-8 col-xs-12 col-sm-12">
          <div>
            <div className="card">
              <div className="card-body">
                <AquaLargeTitle display={3}>{description.title}</AquaLargeTitle>
                <hr />
                <p className="text-muted">{description.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AquaLayout>
  );
};
export default AquaPrivacyPolicy;
