import sendHttpRequest from "@/src/http/Request";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const Disclaimer = () => {
  const [disc, setDisc] = useState();

  const getData = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/pages",{params:{where:{is_active:true}}});
      const res = await sendHttpRequest("get", `/CRUD/pages`, { where: {is_deleted:false, is_active: true } },{},true)
      setDisc(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);

  return (
    <>
      {!!disc?.length &&
        disc?.map((each, idx) => {
          if (each?.page_name == "Disclaimer") {
            return (
              <div key={idx}>
                <div className="container-fluid BG-gradient py-10">
                  <h1 className="text-center">{each?.page_name}</h1>
                </div>
                <Container>
                  <Row>
                    <Col className="col-10 mx-auto">
                      <div className="disclaimerContent py-7">
                        <p
                          dangerouslySetInnerHTML={{
                            __html: each?.description,
                          }}
                          className="text-justify"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            );
          }
        })}
    </>
  );
};

export default Disclaimer;
