import AquaLayout from "@/Layout/Layout";
import AquaAccordian from "@/reusables/accrodian";
import AquaLargeTitle from "@/reusables/largeTitle";

const AquaFaq = () => {
  const seo = {
    title: "Aquakart | Frequently Asked questions",
  };

  const leftPhase = [
    {
      title:
        "What is the difference between traditional salt-based water softeners and automatic softeners?",
      description:
        "Traditional salt-based water softeners use a process called ion exchange to remove minerals like calcium and magnesium, which cause water hardness. These systems typically require manual regeneration, where salt is added to replenish the system. Automatic softeners, on the other hand, are designed to regenerate without manual intervention, often using advanced technologies to monitor water usage and initiate regeneration cycles as needed, making them more convenient and efficient.",
    },
    {
      title: "How do automatic softeners work?",
      description:
        "Automatic softeners utilize salt but with smarter, monthly consumption that adapts based on usage, varying from one household to another depending on the number of occupants.",
    },
    {
      title: "Can both types of softeners be used in any home",
      description:
        "Yes, both traditional and automatic softeners are suitable for most homes. The decision between them typically hinges on individual preferences, the degree of water hardness, and considerations about sodium consumption and environmental effects. It's crucial to evaluate your unique water treatment requirements. For a tailored recommendation, consider consulting with professionals like us to ensure clarity and make an informed choice.",
    },
  ];
  const rightPhase = [
    {
      title: "",
      description: "",
    },
    {
      title: "",
      description: "",
    },
  ];
  return (
    <AquaLayout seo={seo}>
      <div className="container">
        <AquaLargeTitle display={2}>FAQ</AquaLargeTitle>
        <p className="text-muted">Frequently Asked questions</p>
        <hr />
        <div className="row">
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            {leftPhase.map((r, i) => (
              <div key={i}>
                <AquaAccordian title={r.title} description={r.description} />
              </div>
            ))}
          </div>
          <div className="col-md-6 col-lg-6 col-xs-12 col-sm-12">
            {rightPhase.map((r, i) => (
              <>
                <AquaAccordian />
              </>
            ))}
          </div>
        </div>
      </div>
    </AquaLayout>
  );
};
export default AquaFaq;
