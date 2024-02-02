import Head from "next/head";
const AquaSeo = ({ seo }) => {
  const { title, description, keywords, keyphrases, canonical, image } = seo;
  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="canonical" href={canonical} />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta
          name="twitter:image"
          content={
            image
              ? image
              : "https://res.cloudinary.com/aquakartproducts/image/upload/v1695408027/android-chrome-384x384_ijvo24.png"
          }
        />
      </Head>
    </>
  );
};

export default AquaSeo;
