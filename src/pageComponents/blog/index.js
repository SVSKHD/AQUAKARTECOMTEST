import AquaLayout from "@/Layout/Layout";
import AquaBlogOperations from "@/Services/blog";
import AquaProductOperations from "@/Services/product";
import AquaHeading from "@/reusables/heading";
import AquaToast from "@/reusables/js/toast";
import TestVerticalcard from "@/reusables/testverticalcard";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { Carousel } from 'react-bootstrap';

const AquaDynamicBlogComponent = () => {
  const { getBlogById } = AquaBlogOperations();
  const { getProductById } = AquaProductOperations();
  const [blog, setBlog] = useState({});
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const fetchBlogData = useCallback(async (blogId) => {
    setLoading(true);
    try {
      const res = await getBlogById(blogId);
      console.log('Blog data:', res.data); // Debugging log
      const blogData = res.data;
      setBlog(blogData);
      if (blogData.data.product) {
        await fetchProductData(blogData.data.product);
      }
    } catch (err) {
      console.error('Error fetching blog data:', err);
      AquaToast("Sorry, there was an error fetching the blog data.", "error");
    } finally {
      setLoading(false);
    }
  }, [getBlogById]);

  const fetchProductData = useCallback(async (productId) => {
    try {
      const res = await getProductById(productId);
      console.log('Product data:', res.data); // Debugging log
      setProduct(res.data);
    } catch (err) {
      console.error('Error fetching product data:', err);
      AquaToast("Sorry, there was an error fetching the product data.", "error");
    }
  }, [getProductById]);

  useEffect(() => {
    if (id) {
      fetchBlogData(id);
    }
  }, [id, fetchBlogData]);

  const { title, titleImages, description, photos } = blog.data || {};
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
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            {photos && photos.length > 0 && (
              <Carousel controls={false} className="mb-3 mt-3">
                {photos.map((photo, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={photo.secure_url}
                      alt={`Slide ${index + 1}`}
                      className="d-block w-100 rounded-4"
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            
            {product &&(<><AquaHeading content={"Related Products"} decorate={true} level={3} customclass={"text-center"}/><TestVerticalcard card={product} /></>)}
          </div>
          <div className="col-md-6 col-lg-6 col-sm-12 col-xs-12">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    </AquaLayout>
  );
};

export default AquaDynamicBlogComponent;
