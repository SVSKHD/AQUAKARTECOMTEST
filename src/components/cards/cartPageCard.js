import Image from "next/image";
import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";

const AquaCartPageCard = ({ data }) => {
  const { title, price, photos, quantity } = data;
  return (
    <>
      <div>
        <div>
          <div class="row g-0">
            <div class="col-md-2">
              <Image
                src={photos[0].secure_url}
                height="250"
                width="200"
                className="img-fluid rounded-3"
                alt={`Aquakart | ${title}`}
              />
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="cart-title">{title}</h5>
                <p class="card-text">
                  <small class="text-success">{price}</small>
                </p>
                <InputGroup size="sm" className="mb-3 width-adjust">
                  <Button variant="outline-light">
                    <FaMinus size={25} className="text-dark" />
                  </Button>
                  <Form.Control
                    aria-label="Example text with two button addons"
                    className="text-center"
                    value={quantity}
                  />
                  <Button variant="outline-light">
                    <FaPlus size={25} className="text-dark" />
                  </Button>
                </InputGroup>
              </div>
            </div>
            <div className="col-md-3">
              <div className="text-end"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaCartPageCard;
