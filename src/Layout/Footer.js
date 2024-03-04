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
  return (
    <>
      <div>
        {/* <AquaCard>
          <AquaCard>
            <div className="text-center">
              <AquaHeading level={5}>AquaKart © {Year}</AquaHeading>
            </div>
          </AquaCard>
        </AquaCard> */}

        <div className="footer-aqua">
          <div className="container mt-2">
            <div className="row">
              <div className="col text-center">
                <Image src={AQ} alt="Aquakart" height="150" width="150" />
                <h4 className="text-center">Aquakart</h4>
              </div>
              <div className="col">
                <h4>Categories</h4>
                <ul>
                  {categories.map((c) => (
                    <li key={c}>{c.title}</li>
                  ))}
                </ul>
              </div>
              <div className="col">
                <h4>subscribe form</h4>
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
