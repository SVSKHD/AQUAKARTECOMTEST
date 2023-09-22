const AquaSeo = (seo) => {
    const { title, description, keywords, keyphrases, canonical} = seo
    return (
        <>
            <title>{title}</title>
            <link rel="canonical" href={canonical} />

            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content="https://www.example.com/image.jpg" />

            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content="https://www.example.com/image.jpg" />




        </>
    )
}

export default AquaSeo
