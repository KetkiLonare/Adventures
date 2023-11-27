import sendHttpRequest from "@/src/http/Request";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const PrivacyPolicy = () => {
  const [disc, setDisc] = useState();

  const getData = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/pages",{params:{where:{is_active:true}}});
      const res = await sendHttpRequest("get",`/CRUD/pages`,{where:{is_deleted:false,is_active:true}},{},true)
      setDisc(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {!!disc?.length &&
        disc?.map((each, idx) => {
          if (each?.page_name == "Privacy Policy") {
            return (
              <div key={idx}>
                <div className="container-fluid BG-gradient py-10">
                  <h1 className="text-center">{each?.page_name}</h1>
                </div>
                <div className="disclaimerContent py-7">
                  <Container>
                    <Row>
                      <Col md={{ span: 10, offset: 1 }}>
                        <div className="disclaimerContent py-7">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: each?.description,
                            }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </div>
            );
          }
        })}
    </>
  );
};

export default PrivacyPolicy;
