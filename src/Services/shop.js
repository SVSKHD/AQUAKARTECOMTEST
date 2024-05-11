import axios from "axios";

const AquaFilter = (query, id) => axios.get(`/api/product/shop?${query}=${id}`);

const AquaShopFilter = () => {
  return {
    AquaFilter,
  };
};

export default AquaShopFilter;
