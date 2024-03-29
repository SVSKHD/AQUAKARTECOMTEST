const AquaHeading = ({ level, children, center, decorate , customclass}) => {
  const HeadingTag = `h${level}`;

  const divClassNames =
    `${center ? "text-center" : ""} ${decorate ? "decorate" : "" } ${customclass || ""}`.trim();
  
  return (
    <div className={divClassNames}>
      <HeadingTag className="mt-2">{children}</HeadingTag>
    </div>
  );
};

export default AquaHeading;
