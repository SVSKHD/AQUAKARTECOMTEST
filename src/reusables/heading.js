const AquaHeading = ({ level, content, center, decorate , customclass}) => {
  const HeadingTag = `h${level}`;

  const divClassNames =
    `${center ? "text-center" : ""} ${decorate ? "decorate" : "" } ${customclass || ""}`.trim();
  
  return (
    <div className={divClassNames}>
      <HeadingTag className="mt-2">{content}</HeadingTag>
    </div>
  );
};

export default AquaHeading;
