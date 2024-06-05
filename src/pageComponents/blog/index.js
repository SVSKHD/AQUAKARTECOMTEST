import AquaLayout from "@/Layout/Layout";
import AquaBlogOperations from "@/Services/blog";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AquaDynamicBlogComponent = () => {
  const { getBlogById } = AquaBlogOperations();
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const router = useRouter();
  const id = router.query.id;

  useEffect(() => {
    if (id) {
      setLoading(true);
      getBlogById(id)
        .then((res) => {
          setBlog(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false); // Ensure to set loading to false even if there is an error
        });
    }
  }, [id, getBlogById]);

  const { title, titleImages, description } = blog;
  const seoData = { title: "Aquakart | Know More" };

  return (
    <AquaLayout seo={seoData} container={true}>
      <div className="m-4 mt-5">
        <div>
          <h6>--Know More</h6>
          <h1 className="text-left blog-title mb-4">{title}</h1>
          {titleImages && titleImages.length > 0 && (
            <img
              src={titleImages[0]?.secure_url}
              className="w-100 rounded-5 shadow-md mb-3"
              alt={`${title} | Aquakart Know More Blogs`}
            />
          )}
        </div>
        <div className="row">
          <div className="col">
            <h4>Images</h4>
          </div>
          <div className="col">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    </AquaLayout>
  );
};

export default AquaDynamicBlogComponent;
