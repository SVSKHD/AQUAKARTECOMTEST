const AquaHeading = ({level , children}) =>{
    const HeadingTag = `h${level}`;

    return <HeadingTag className="mt-5">{children}</HeadingTag>;
}
export default  AquaHeading
