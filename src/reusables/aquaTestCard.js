import React from "react";
import { FaShare } from "react-icons/fa";
// Assuming your CSS is saved in a file named Card.css

const AquaTestBlogCard = ({ data }) => {
  return (
    <div className="card rounded-4">
      <div className="card-inner" style={{ "--clr": "#fff" }}>
        <div className="box">
          <div className="imgBox">
            <img src={data?.titleImages[0].secure_url} alt={data?.title} />
          </div>
          <div className="icon">
            <a href={`/blog/${data?._id}`} className="iconBox">
              <span className="material-symbols-outlined">
                <FaShare />
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className="content">
        <h4>{data?.title}</h4>
     
      </div>
    </div>
  );
};

export default AquaTestBlogCard;
