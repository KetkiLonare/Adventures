import sendHttpRequest from "@/src/http/Request";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";

const Faqs = () => {
  const [faq, setFaq] = useState([]);

  const getData = async () => {
    try {
      // const res = await axios.get("http://localhost:4000/CRUD/faqs",
      // {
      //   params: {
      //     where: { is_deleted: false, is_active: true },
      //   },
      // });

      const res = await sendHttpRequest("get",`/CRUD/faqs`, {
            where: { is_deleted: false, is_active: true },
          },{},true)

      setFaq(res.data.result);
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
      <div className="BG-gradient py-5 text-center faqTitleSection">
          <h1 className="mb-1">FAQs</h1>
          <p className="FW-regular mb-0">Need answers? Find them here...</p>
      </div>

      <Row className="g-0">
        <Col className="col-10 col-sm-8 mx-auto">
          <div className="faqsContent py-10">
            <Accordion defaultActiveKey="0">
              {!!faq?.length &&
                faq?.map((each, idx) => (
                  <Accordion.Item className="mt-4" eventKey={idx} key={idx}>
                    <Accordion.Header className="FW-bold FS-16">
                      {each?.title}
                    </Accordion.Header>
                    <Accordion.Body>
                      
                        <p dangerouslySetInnerHTML={{ __html: each?.description }} className="text-justify"></p>
                      
                    </Accordion.Body>
                  </Accordion.Item>
                ))}

              {/* <Accordion.Item eventKey="1" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>How is a modular home different from a traditional stick-built home?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>Are modular homes customizable?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>How is a modular home transported to the building site?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>What is a modular home?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="5" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>What is site work, and why is it important for modular home building?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="6" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>What is foundation work, and what are the different types of foundations available for modular homes?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="7" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>How important is planning in modular home building, and what should I consider when planning my modular home build?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="8" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>How do I find contractors to work on my modular home build, and what should I look for in a contractor?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="9" className='mt-4'>
                          <Accordion.Header className='FW-bold FS-16'>What are the financing options for modular home buyers?</Accordion.Header>
                          <Accordion.Body>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                          aliquip ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                          culpa qui officia deserunt mollit anim id est laborum.
                          </Accordion.Body>
                      </Accordion.Item> */}
            </Accordion>
          </div>
        </Col>
      </Row>

      <div className="mb-20">
        <p className="text-center FW-medium mx-3 mx-sm-0">
          Not finding what you are looking for? Please <Link href="/contactUs" className="link-primary underline">contact us</Link>{" "}
          for more information about manufactured and modular homes.
        </p>
      </div>
    </>
  );
};

export default Faqs;
