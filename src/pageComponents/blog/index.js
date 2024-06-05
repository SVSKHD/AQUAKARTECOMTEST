import AquaLayout from "@/Layout/Layout";
import AquaBlogOperations from "@/Services/blog";
import {useRouter} from "next/router"
import { useEffect, useState } from "react";




const AquaDynamicBlogComponent = () => {
  const {getBlogById} = AquaBlogOperations()
  const [blog , setBlog] = useState({})
  const [loading , setLoading] = useState(false)
  const [product , setProduct] = useState({})
  const router = useRouter()
  const id = router.query.id

  
  useEffect(()=>{
    setLoading(true)
    getBlogById(id).then((res)=>{
      setBlog(res.data)
      setLoading(false)
    }).catch((err)=>{
      
    })
  },[id , getBlogById])

  const {title , titleImages} = blog
  const seoData = { title: "Aquakart | Know More" };
  return (
    <>
      <AquaLayout seo={seoData} container={true}>
        <div className="m-4 mt-5">
         <div>
         <h1 className="text-left blog-title">{title}</h1>
<img src={titleImages[0].secure_url} className="w-100 rounded-5 shadow-md mb-3" alt={`${title}| Aquakart Know More Blogs`}/>
         </div>
         <div className="row">
          <div className="col">
            <h4>images</h4>
          </div>
          <div className="col">
            
          </div>
         </div>

        </div>
      </AquaLayout>
    </>
  );
};
export default AquaDynamicBlogComponent;
