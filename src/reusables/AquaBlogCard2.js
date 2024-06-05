const AquaBlogCardTwo = () => {
  return (
    <div class="hover hover-1 text-white rounded">
      <img
        src="https://res.cloudinary.com/mhmd/image/upload/v1570786261/hoverSet-3_usk5ml.jpg"
        alt=""
      />
      <div class="p-5 hover-overlay"></div>
      <div class="hover-1-content px-5 py-4">
        <h3 class="hover-1-title text-uppercase font-weight-bold mb-0">
          {" "}
          {title}
        </h3>
        <p class="hover-1-description font-weight-light mb-0">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};
export default AquaBlogCardTwo;
