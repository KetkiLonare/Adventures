import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import sendHttpRequest from "@/src/http/Request";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { NEXT_PUBLIC_APP_ASSET_URL } from "@/src/utlis/envConfig";

const BlogDetail = () => {
  const [blogs, setBlogs] = useState(null);
  const router = useRouter();

  const getdata = useCallback(async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/blogs/${router.query.id}`,
        {
          where: { is_deleted: false },
        },
        {},
        true
      );
      setBlogs(res.data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [router.query.id]);

  useEffect(() => {
    getdata();
  }, [getdata, router.query.id]);

  if (!blogs) {
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

  const formattedDate = formatDate(blogs.created_at);

  return (
    <>
      <Col md={{ span: 8, offset: 2 }}>
        <div className="py-10 blogDetailContainer">
          <BreadcrumbNav page={"Blog details"} />
          <h4 className="FW-bold">{blogs?.tag}</h4>
          <div className="flex gap-x-4 items-center my-4">
            <div className="blogProfileDiv">
              <Image
                className="flex-none rounded-full bg-gray-50"
                src={`${NEXT_PUBLIC_APP_ASSET_URL}${blogs?.blog_image}`}
                alt=""
                onError={(e) => {
                  e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
                }}
              />
            </div>
            <div className="min-w-0 flex-auto blogProfileDetail">
              <p className="text-sm font-semibold leading-6 mb-0">
                {blogs?.name} <span className="mx-2">|</span> {blogs?.tag}{" "}
                <span className="mx-2">|</span> {formattedDate}
              </p>
            </div>
          </div>
          <div className="blogDetailImg rounded-3xl">
            <Image
              src={`${NEXT_PUBLIC_APP_ASSET_URL}${blogs?.blog_image}`}
              alt=""
              onError={(e) => {
                e.target.src = "/images/Latest_news.png"; // Fallback to default image on error
              }}
              className=" rounded-3xl"
            />
          </div>
          <h3 className="mt-4 mb-3 FW-bold text-black text-justify">
            {blogs?.title}
          </h3>
          <p className="FW-regular blogDescription text-justify">
            {" "}
            <div dangerouslySetInnerHTML={{ __html: blogs?.description }} />
          </p>
        </div>
      </Col>
    </>
  );
};

export default BlogDetail;
