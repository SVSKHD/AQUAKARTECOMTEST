import AquaLayout from "@/Layout/Layout";
import AquaProductOperations from "@/Services/product";
import AquaProductUnControlledCarousel from "@/reusables/productCarousel";
import Image from "next/image";
import LOGO from "../../assests/logo.png";
import { useRouter } from "next/router";
import { useEffect , useState} from "react";
import { Badge , Spinner} from "react-bootstrap";


const DynamicProduct = () => {
  const [product , setProduct] = useState({})
  const [loading , setLoading] = useState(false)
  const {getProductById} = AquaProductOperations()
  const router = useRouter()
  const id = router.query.id;
  useEffect(()=>{
    setLoading(true)
    getProductById(id).then((res)=>{
     console.log("res" , res.data)
     setProduct(res.data)
     setLoading(false)
    })
    .catch((err)=>{
      console.log("err", err)
      setLoading(false)
    })
  },[getProductById , id])
  const SeoData = {
    title: `Aquakart | Product - ${product?.title}`,
    description:`${product?.description}`,
    image:`${product?.photos? product.photos[0].secure_url : LOGO}`,
    keywords:`Aquakart Products ${product?.keywords}`
  };
  return (
    <>
      <AquaLayout seo={SeoData}>
        {loading ? (<div className="text-center"> <Spinner animation="border" variant="dark" /></div>) : (
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
   <h4 className="price product-price-align"><Badge bg="success"> ₹{product?.price}</Badge></h4>
   <hr/>
   <h5 className="text-muted">{product?.description}</h5>
 </div>
</div>
        )}
       
      </AquaLayout>
    </>
  );
};
export default DynamicProduct;
