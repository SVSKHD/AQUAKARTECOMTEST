import { Container, Button } from "react-bootstrap";
import { useState } from "react";
import AquaInput from "@/reusables/input";
import AquaPlaceHolderInput from "@/reusables/placeHolderInput";
import AquaHeading from "@/reusables/heading";
import AquaLargeTitle from "@/reusables/largeTitle";
import AquaTextAreaInput from "@/reusables/textarea";
import AquaDrawer from "@/reusables/drawer";
import AquaButton from "@/reusables/button";
import AquaToast from "@/reusables/js/toast";
import AquaTabs from "@/reusables/tabs";
import AquaVerticalCard from "@/reusables/VerticalCard";
import AquaHorizontalCard from "@/reusables/horizontalCard";
import AquaHoverCards from "@/reusables/hoverCards";
import AquaVerticalCardRevamp from "@/reusables/verticalCardRevamp";
import TestVerticalcard from "@/reusables/testverticalcard";

const UIPage = () => {
  const drawerPositions = ["start", "end", "top", "bottom"];
  const [drawer, setDrawer] = useState(false);
  const [drawerPositon, setDrawerPositon] = useState("");

  const DrawerLoop = ({ name }) => {
    return <></>;
  };

  const handleDrawerOpen = (position) => {
    setDrawer(true);
    setDrawerPositon(position);
  };
  const handleDrawerClose = (position) => {
    setDrawer(false);
  };
  return (
    <>
      <Container>
        <div className="mb-3" />
        <AquaHeading level={1}>Hello UI</AquaHeading>
        <hr />
        <AquaHeading level={1}>Inputs</AquaHeading>
        <hr />
        <AquaInput label={"label-input"} placeholder={"label-placeholder"} />
        <AquaPlaceHolderInput placeholder={"placeholder input"} />
        <AquaTextAreaInput
          placeholder={"place holder text area"}
          label={"label for text area"}
        />
        <hr />
        <AquaHeading level={1}>Headings</AquaHeading>
        <hr />
        <AquaHeading level={1}>
          Hello there titles can be pass as levels here.
        </AquaHeading>
        <AquaHeading level={2}>
          Hello there titles can be pass as levels here.
        </AquaHeading>
        <AquaHeading level={3}>
          Hello there titles can be pass as levels here.
        </AquaHeading>
        <AquaHeading level={4}>
          Hello there titles can be pass as levels here.
        </AquaHeading>
        <AquaHeading level={5}>
          Hello there titles can be pass as levels here.
        </AquaHeading>
        <AquaHeading level={6}>
          Hello there titles can be pass as levels here.
        </AquaHeading>
        <hr />
        <AquaHeading level={1}>Large title</AquaHeading>
        <hr />
        <AquaLargeTitle display={1}>Hello large title 1</AquaLargeTitle>
        <AquaLargeTitle display={2}>Hello large title 2</AquaLargeTitle>
        <AquaLargeTitle display={3}>Hello large title 3</AquaLargeTitle>
        <hr />
        <AquaHeading level={1}>Drawer</AquaHeading>
        <hr />
        {drawerPositions.map((r, i) => (
          <AquaButton
            key={i}
            variant="primary"
            onClick={() => handleDrawerOpen(r)}
          >
            {r}
          </AquaButton>
        ))}
        <AquaDrawer
          show={drawer}
          handleClose={handleDrawerClose}
          title={drawerPositon}
          position={drawerPositon}
        />
        <hr />
        <AquaHeading level={1}>Dialog</AquaHeading>
        <hr />
        <hr />
        <AquaHeading level={1}>Toast</AquaHeading>
        <hr />
        <AquaButton onClick={() => AquaToast("success", "success")}>
          success
        </AquaButton>
        <AquaButton onClick={() => AquaToast("success", "error")}>
          error
        </AquaButton>
        <AquaButton onClick={() => AquaToast("success", "info")}>
          info
        </AquaButton>
        <hr />
        <AquaHeading
          level={1}
          content="Tabs"
          decorate={true}
          customclass={"mb-3"}
        />
        {/* <AquaTabs /> */}

        <AquaHeading
          level={1}
          content="Cards"
          decorate={true}
          customclass={"mb-2"}
        />
        <div className="row">
          <div className="col">
            <AquaVerticalCardRevamp data={{ title: "Product", amount: 3000 }} />
          </div>
          <div className="col">
            <AquaHorizontalCard data={{ title: "Product", amount: 3000 }} />
          </div>
        </div>
        <AquaHeading
          content="Hover Cards"
          level={1}
          decorate={true}
          customclass="mb-3"
        />
        <TestVerticalcard/>
        <div className="mb-5" />
      </Container>
    </>
  );
};
export default UIPage;
