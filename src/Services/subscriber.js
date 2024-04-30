import axios from "axios";

const getSubscribed = (data) => axios.post("/api/subscribers", data);

const AquaSubscriberOperations = () => {
  return { getSubscribed };
};

export default AquaSubscriberOperations;
