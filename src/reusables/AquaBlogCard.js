import { FaShare } from "react-icons/fa";
const AquaBlogCard = ({ data }) => {
  const { title, photos, titlePhotos } = data;
  return (
    <>
      <div class="Uni-block" id="uni-1">
        <div class="uni-main">
          <div class="uni-card uni-card1">
            <div class="uni-content">
              <img src={photos[0].secure_url} alt="helo" />
            </div>
          </div>
          <div class="uni-card uni-card2">
            <div class="uni-content">
              <p>{title}</p>
              <a href={`/blog/${data._id}`}>
                <FaShare size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AquaBlogCard;
