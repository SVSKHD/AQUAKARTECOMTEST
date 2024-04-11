const AquaCompareCard = ({ data }) => {
  const { title } = data;
  return (
    <>
      <div className="card shadow-lg">
        <div className="card-body">
          <h4>{title}</h4>
        </div>
      </div>
    </>
  );
};
export default AquaCompareCard;
