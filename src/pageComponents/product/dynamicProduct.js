import AquaLayout from "@/Layout/Layout";
import AquaProductOperations from "@/Services/product";
import AquaProductUnControlledCarousel from "@/reusables/productCarousel";
import Image from "next/image";
import LOGO from "../../assests/logo.png";
import { useRouter } from "next/router";
import { useEffect , useState} from "react";



const DynamicProduct = () => {
  const [product , setProduct] = useState({})
  const {getProductById} = AquaProductOperations()
  const router = useRouter()
  const id = router.query.id;
  useEffect(()=>{
    getProductById(id).then((res)=>{
     console.log("res" , res.data)
     setProduct(res.data)
    })
    .catch((err)=>{
      console.log("err", err)
    })
  },[getProductById , id])
  const SeoData = {
    title: `Aquakart | Product - ${product?.title}`,
    description:`${product?.description}`,
    image:`${product.photos[0]?.secure_url}`,
    keywords:`Aquakart Products ${product?.keywords}`
  };
  return (
    <>
      <AquaLayout seo={SeoData}>
        <div className="row mb-3">
          <div className="col-4">
          {product?.photos ? (
            <>
              <AquaProductUnControlledCarousel
                images={product?.photos}
                className="card-img-top custom-image"
                width="100"
                height="280"
                alt={`Aquakart Images | ${product.title}`}
              />
            </>
          ) : (
            <Image src={LOGO} className="card-img-top custom-image" alt="..." />
          )}
          </div>
          <div className="col-8">
            <h1 className="display-2 text-bold">{product?.title}</h1>
            <span>{product?.price}</span>
            <hr/>
            <h5 className="text-muted">{product?.description}</h5>
          </div>
        </div>
      </AquaLayout>
    </>
  );
};
export default DynamicProduct;
