import React, { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ShingleCard from "@/components/customizationCard/shingleCard";
import sendHttpRequest from "@/src/http/Request";

const Subcatgory = ({
  selection,
  selectedcolor,
  selectedbrand,
  productid,
  Default,
  selectedVariant,
}) => {
  const [customize, setCustomize] = useState([]);
  const getData = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/customizeditems`,
        {
          relations: ["customizedbrands", "customize_color"],
          where: {
            customizesubcategory: { id: selection },
            is_deleted: false,
            is_active: true,
            customizedbrands: { id: selectedbrand },
            customize_color: { id: selectedcolor },
          },
        },
        {},
        true
      );
      setCustomize(res?.data?.result);
    } catch (error) {
      // Handle the error here
      console.error("Error:", error);
    }
  };

  useMemo(() => {
    getData();
  }, [selectedcolor]);

  useMemo(() => {
    getData();
  }, [selectedbrand]);

  useEffect(() => {
    if (selection) {
      getData();
    }
  }, [selection]);

  const selectedvar = !!selectedVariant?.length
    ? selectedVariant.find(
        (def, idex) =>
          def?.customizeditems?.customizesubcategory?.id == selection
      )
    : {};
  return (
    <>
      <Row className="m-0">
        {!!customize?.length &&
          customize
            .sort((a, b) => {
              const aIsInDef = Default.some(
                (each) => each?.customizeditems?.id === a?.id
              );
              const bIsInDef = Default.some(
                (each) => each?.customizeditems?.id === b?.id
              );
              if (aIsInDef && !bIsInDef) {
                return -1;
              } else if (!aIsInDef && bIsInDef) {
                return 1;
              } else {
                return 0;
              }
            })
            .map((each, idx) => (
              <Col xs={3} key={idx} className="mb-4 flex justify-center">
                <ShingleCard
                  name={each.name}
                  brand={each?.customizedbrands?.name}
                  images={each?.item_image}
                  id={each.id}
                  isDefault={
                    !!Default?.length &&
                    !!Default.find(
                      (def, idex) => def?.customizeditems?.id == each?.id
                    )
                      ? true
                      : false
                  }
                  subCatid={selection}
                  selected={
                    !!selectedVariant?.length &&
                    !!selectedVariant.find(
                      (def, idex) => def?.customizeditems?.id == each?.id
                    )
                      ? true
                      : false
                  }
                  selectedVariant={selectedvar}
                />
              </Col>
            ))}
      </Row>
    </>
  );
};

export default Subcatgory;
