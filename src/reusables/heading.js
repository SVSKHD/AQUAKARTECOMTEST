const AquaHeading = ({ level, children, center }) => {
  const HeadingTag = `h${level}`;

  return (
    <div className={center ? "text-center" : ""}>
      <HeadingTag className="mt-2">{children}</HeadingTag>
    </div>
  );
};
export default AquaHeading;
