import { Accordion } from "react-bootstrap"

const AquaAccordian = (props) => {
    const { title, description , key} = props
    return (
        <>
            <Accordion defaultActiveKey={key}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{title}</Accordion.Header>
                    <Accordion.Body>
                        {description}
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </>
    )
}
