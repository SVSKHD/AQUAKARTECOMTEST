import AquaLayout from "@/Layout/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const AquaOrdersComponent = () => {
  const router = useRouter();
  console.log(router.query.id);
  const seo = {
    title: "Aquakart | Order Confirmation",
  };
  return <AquaLayout seo={seo} container={true}></AquaLayout>;
};
export default AquaOrdersComponent;
