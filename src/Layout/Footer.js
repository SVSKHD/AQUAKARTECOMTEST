import AquaCard from "@/reusables/card";
import AquaHeading from "@/reusables/heading";
import AQ from "../assests/logo-white.png";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import AquaCategoryOperations from "@/Services/category";
import { FaInstagram, FaWhatsapp, FaTelegram } from "react-icons/fa";

const AquaFooter = () => {
  const date = new Date();
  const Year = date.getFullYear();
  const [categories, setCategories] = useState([]);
  const { getCategories } = AquaCategoryOperations();
  const loadCategories = useCallback(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {
        AquaToast("something went wrong", "error");
      });
  }, [getCategories, setCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);
  const quickLinks = [
    {
      title: "privacy-policy",
      link: "/privacy-policy",
    },
    {
      title: "terms and conditions",
      link: "/terms-and-conditions",
    },
    {
      title: "About-us",
      link: "/about",
    },
  ];
  return (
    <>
      <div>
        <div className="footer-aqua">
          <div className="mt-2">
            <div className="row">
              <div className="col text-center">
                <Image src={AQ} alt="Aquakart" height="150" width="150" />
                <h4 className="text-center">Aquakart</h4>
              </div>
              <div className="col">
                <p className="footer-col-heading">Quick links</p>
                {quickLinks.map((r, i) => (
                  <>
                    <p key={i} className="footer-item-adjust">
                      <a href={r.link} className="footer-item-adjust">
                        {r.title}
                      </a>
                    </p>
                  </>
                ))}
              </div>
              <div className="col">
                <p className="footer-col-heading">Categories</p>

                {categories.map((c, i) => (
                  <>
                    <p key={i} className="footer-item-adjust">
                      <a
                        href={`/category/${c.title}`}
                        className="footer-item-adjust"
                      >
                        {c.title}
                      </a>
                    </p>
                  </>
                ))}
              </div>
              <div className="col">
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Email address
                  </label>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Enter your Email"
                      aria-label="Recipient's username"
                      aria-describedby="button-addon2"
                    />
                    <button
                      class="btn btn-light"
                      type="button"
                      id="button-addon2"
                    >
                      <FaTelegram size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AquaCard>
            <div className="row social handle">
              <div className="col">
                <AquaHeading level={5}>AquaKart © {Year}</AquaHeading>
              </div>
              <div className="col text-end">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn">
                    <FaInstagram size={20} />
                  </button>
                  <button type="button" class="btn">
                    <FaWhatsapp size={20} />
                  </button>
                </div>
              </div>
            </div>
          </AquaCard>
        </div>
      </div>
    </>
  );
};
export default AquaFooter;
