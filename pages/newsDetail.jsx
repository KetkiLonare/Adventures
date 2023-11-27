import sendHttpRequest from "@/src/http/Request";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";
import { useCallback } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";

const NewsDetail = () => {

  const [newsPost, setNewPost] = useState(null);
  const router = useRouter();
  const getData = async (id) => {
    try {
      const res = await sendHttpRequest("get", `/CRUD/newposts/${id}`, { relations: ["tags"], where: { id, is_deleted: false, is_active: true } }, {}, true)
      res && setNewPost(res.data.result);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }

  useEffect(() => {
    (async () => {
      await getData(router.query.id);
    })()
  }, [router.query.id]);

  if (!newsPost) {
    return <div>Loading...</div>;
  }

  // Function to convert the date format to "mm, dd, yy"
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Create an array of month names
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);

    return `${month} ${day}, ${year}`;
  };

  const formattedDate = formatDate(newsPost.published_date);

  return (
    <>

      <Col md={{ span: 8, offset: 2 }}>
        <div className="py-10 blogDetailContainer">
          <BreadcrumbNav page={"News details"} />
          <div className="flex gap-x-4 items-center my-4">
            <div className="blogProfileDiv">
              <Image
                className="flex-none rounded-full bg-gray-50"
                src={`${NEXT_PUBLIC_APP_ASSET_URL}${newsPost?.news_image}`}
                alt=""
                onError={(e) => {
                  e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                }}
              />
            </div>
            <div className="min-w-0 flex-auto blogProfileDetail">
              <p className="text-sm font-semibold leading-6 mb-0">
                {newsPost?.name} <span className="mx-2">|</span>{" "}
                {newsPost?.tags?.name} <span className="mx-2">|</span>{" "}
                {formattedDate}
              </p>
            </div>
          </div>

          <div className="blogDetailImg rounded-3xl">
            <Image
              src={`${NEXT_PUBLIC_APP_ASSET_URL}${newsPost?.news_image}`}
              alt=""
              onError={(e) => {
                e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
              }}
              className=" rounded-3xl"
            />
          </div>
          <h3 className="mt-4 mb-3 FW-bold text-black text-justify">{newsPost?.heading}</h3>
          <p className="FW-regular blogDescription text-justify">
            <div dangerouslySetInnerHTML={{ __html: newsPost?.description }} />
            <Link href={newsPost?.post_link} target="_blank">
              <h6 className="heading">For More Click Here</h6>
            </Link>
          </p>
        </div>
      </Col>
    </>
  );
};

export default NewsDetail;
