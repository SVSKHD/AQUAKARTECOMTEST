const AquaStandardShadowCard = (props) => {
  return (
    <>
      <div className="card shadow-lg rounded-5" style={{ width: props.width }}>
        <div className="card-body">{props.children}</div>
      </div>
    </>
  );
};
export default AquaStandardShadowCard;
