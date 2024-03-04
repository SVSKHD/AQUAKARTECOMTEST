import AquaLayout from "@/Layout/Layout"
import AquaHeading from "@/reusables/heading"
import { useState } from "react"

const ReturnAndRefund = () => {
    const [active, setActive] = useState(null)
    const SeoData = {
        title: "Aquakart | retrun policy"
    }
    const listItems = [
        { id: 1, title: 'List group item heading 1', content: 'Some placeholder content for item 1', date: '3 days ago' },
        { id: 2, title: 'List group item heading 2', content: 'Some placeholder content for item 2', date: '2 days ago' },
        // Add more items as needed
    ];
    return (
        <AquaLayout seo={SeoData}>
            <div className="card m-5">
                <div className="card-body">
                    <AquaHeading level={1}>Return and Refund Policy</AquaHeading>
                    <hr />
                    <div className="list-group">
                        {listItems.map((item) => (
                            <a
                                key={item.id}
                                onMouseEnter={() => setActive(item.id)}
                                onMouseLeave={() => setActive(null)}
                                className={`list-group-item list-group-item-action ${active === item.id ? 'active' : ''}`}
                                aria-current="true"
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{item.title}</h5>
                                    <small>{item.date}</small>
                                </div>
                                <p className="mb-1">{item.content}</p>
                                <small>And some small print.</small>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </AquaLayout>
    )
}
export default ReturnAndRefund