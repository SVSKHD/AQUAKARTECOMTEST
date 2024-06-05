import { useEffect, useState } from "react";
import AquaBlogOperations from "@/Services/blog";
import AquaBlogCard from "@/reusables/AquaBlogCard";
import AquaTestBlogCard from "@/reusables/aquaTestCard";

const AquaBlogHolder = () => {
  const [blogs, setBlogs] = useState([]);
  const { getBlogs } = AquaBlogOperations();
  useEffect(() => {
    getBlogs()
      .then((res) => {
        setBlogs(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [getBlogs]);
  return (
    <>
      <div className="row">
        {blogs?.map((r, i) => (
          <div className="col-md-3" key={i}>
            <AquaTestBlogCard data={r} />
          </div>
        ))}
      </div>
    </>
  );
};
export default AquaBlogHolder;
