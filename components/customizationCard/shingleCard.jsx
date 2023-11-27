import React from "react";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useAppContext } from "@/src/hooks/UserContext";
import { Image } from "react-bootstrap";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const ShingleCard = ({subCatid, name, brand, images, id ,isDefault,selected,selectedVariant }) => {
  const { state, dispatch } = useAppContext();
  const [show, setShow] = useState(false);
  return (
    <>
      <Card
        className={`tabsCard pt-3 border-none boxShadowPrimary ${
          state?.customSelection[subCatid] == id || state?.editcustomSelection[subCatid]?.[selectedVariant?.id] == id ? "cardActive" :  selectedVariant?.customizeditems?.customizesubcategory?.id != subCatid &&isDefault && !state?.customSelection[subCatid] && !state?.editcustomSelection[subCatid] ?  "cardActive" : selected && !state?.editcustomSelection[subCatid] ? "cardActive" : ""
        }`}
        onClick={() => selectedVariant?.id ? dispatch({ type: "editcustomSelection", payload: {[subCatid]:{[selectedVariant.id]:id}} }) : dispatch({ type: "addcustomSelection", payload: {[subCatid]:id} }) }
      >
        <div className="tabsCardImgDiv mx-auto relative" onClick={() => setShow(true)}>
          <Card.Img variant="top" className="borderRadius-5" src={`${NEXT_PUBLIC_APP_ASSET_URL}${images}`} alt="" />
        </div>
        <Card.Body
          className="pt-2 pb-2.5"
          type="button"
          onClick={() => selectedVariant?.id  ?  dispatch({ type: "editcustomSelection", payload: {[subCatid]:{[selectedVariant.id]:id}} }) : dispatch({ type: "addcustomSelection", payload: {[subCatid]:id} })}
        >
          <Card.Title className="FS-14 FW-semibold mb-0.5">{name}</Card.Title>
          <Card.Text className="FS-10">Brand : {brand}</Card.Text>
          { isDefault && <Card.Text className="FS-10">Default</Card.Text>}
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        centered
      >
        <Modal.Header className="border-0 pb-0" closeButton></Modal.Header>
        <Modal.Body>
          <Image   src={`${NEXT_PUBLIC_APP_ASSET_URL}${images}`} alt="Card image" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShingleCard;
