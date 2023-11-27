import React, { useEffect, useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCards from "@/components/ProductCards/ProductCards";
import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import { useAppContext } from "../src/hooks/UserContext";
import { useRouter } from "next/router";
import { Form, InputGroup, Pagination } from "react-bootstrap";
import sendHttpRequest from "@/src/http/Request";

const ContentPage = () => {
  const [productdata, setproductdata] = useState([]);
  const { state, dispatch } = useAppContext();
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalCount: 1,
  });
  const globRef = useRef({});

  const [searchQuery, setSearchQuery] = useState({});

  const [sortBy, setSortBy] = useState();
  const router = useRouter();
  const [category, setCategory] = useState();
  const [CategoryChange, setCategoryChange] = useState(null);
  const [brands, setBrands] = useState();

  const [selectedOption, setSelectedOption] = useState("Manufacturer/Brands");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedSortBy, setSelectedSortBy] = useState("Sort By");

  const [isBrandsOptionsVisible, setBrandsOptionsVisible] = useState(false);
  const [isCategoriesOptionsVisible, setCategoriesOptionsVisible] = useState(false);
  const [isSortByOptionsVisible, setSortByOptionsVisible] = useState(false);

  const [brandChange, setBrandChange] = useState(null);
  const name = router.query.name;
  const catg = router.query.catg;
  const brandId = router.query.id;
  const brandName = router.query.brandName;


  const stylesArr = ["Modular", "Ranch", "Cape", "Ranch Cape", "Single", "Two Level", "Cape Cod", "Duplex", "Townhouses", "Colonial", "Apartment Buildings", "Multiplexes"];

  const getData = async ({ order, cat, manbrand, speficBrandId } = {}) => {

    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/products`,
        {
          relations: ["product_assets", "categories", "sub_categories"],
          where: {
            ...(speficBrandId ? { brands: { id: speficBrandId } } : {}),
            ...(catg ? { categories: { name: catg } } : {}),
            ...(name && name != 'Manufactured Homes' ? { sub_categories: { name: name } } : {}),
            ...(name && !stylesArr.includes(name) ? { is_manufactured: true } : ""),
            is_deleted: false,
            is_active: true,
            ...(cat || globRef.current?.cat ? { categories: { id: cat ?? globRef.current?.cat } } : {}),
            ...(manbrand || globRef.current?.manbrand ? { brands: { id: manbrand ?? globRef.current?.manbrand } } : {})
          },
          filter: searchQuery?.searchfield != "" ? searchQuery : "",
          order: order,
        },
        {},
        true
      );
      setproductdata(res?.data?.result);
      setPagination({
        totalPages: res.data?.totalPages,
        totalCount: res.data?.totalCount,
        currentPage: res.data?.currentPage,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleSortChange = (e) => {
  //   const selectedSortOption = e.target.value;
  //   const order = JSON.parse(selectedSortOption);
  //   setSortBy(order);
  //   getData({ order });
  // };

  // const handleCategoryChange = (e) => {
  //   setCategoryChange(e.target.value);
  //   globRef.current = { ...(globRef.current ?? {}), cat: e.target.value }
  //   getData({ order: sortBy, cat: e.target.value });
  // }

  const getBrands = async () => {
    const res = await sendHttpRequest("get", `/CRUD/brands`, {
      relations: [],
      where: { is_deleted: false, is_active: true },
    }, {}, true)
    setBrands(res?.data?.result)
  }


  // const handleBrandsChange = (event) => {
  //   setBrandChange(event.target.value);
  //   globRef.current = { ...(globRef.current ?? {}), manbrand: event.target.value }
  //   getData({ page: 1, order: sortBy, manbrand: event.target.value });
  // }

  const handleBrandsChange = (id,name) => {
    setSelectedOption(name)
    setBrandChange(id);
    globRef.current = { ...(globRef.current ?? {}), manbrand: id }
    setBrandsOptionsVisible(!isBrandsOptionsVisible);
    getData({ page: 1, order: sortBy, values: state.filterData, manbrand: id });
    
  }

  const handleSortChange = (value) => {
    setSelectedSortBy(value.label);
    setSortByOptionsVisible(!isSortByOptionsVisible);
    getData({ page: 1, order: value.value });
  };

  const handleCategoryChange = (id,name) => {
    setSelectedCategory(name)
    setCategoryChange(id);
    globRef.current = { ...(globRef.current ?? {}), cat: id }
    setCategoriesOptionsVisible(!isCategoriesOptionsVisible);
    getData({ page: 1, order: sortBy, values: state.filterData, cat: id });
  }


  const getCategory = async () => {
    const res = await sendHttpRequest("get", `/CRUD/categories`, {
      relations: [],
      where: { is_deleted: false, is_active: true },
    }, {}, true)
    setCategory(res?.data?.result)
  }

  useEffect(() => {
    getCategory();
    getBrands();
  }, [])


  useEffect(() => {
    (name || catg) && getData();
  }, [name, catg]);


  useEffect(() => {
    brandId && getData({ speficBrandId: brandId });
  }, [brandId]);

  // const [selectedBrandOption, setselectedBrandOption] = useState("Manufacturer/Brands");
  const handleBrandsButtonClick = () => {
    setBrandsOptionsVisible(!isBrandsOptionsVisible);
    setCategoriesOptionsVisible(false);
    setSortByOptionsVisible(false);
  };

  const handleCategoriesButtonClick = () => {
    setCategoriesOptionsVisible(!isCategoriesOptionsVisible);
    setBrandsOptionsVisible(false);
    setSortByOptionsVisible(false);
  };
  
  const handleSortByButtonClick = () => {
    setSortByOptionsVisible(!isSortByOptionsVisible);
    setBrandsOptionsVisible(false);
    setCategoriesOptionsVisible(false);
  };

  return (
    <>
      <div className="searchListingField py-4">
        <div className="container">
          <BreadcrumbNav page={name ? name : catg ? catg : brandName ? brandName : "All Homes"} />
          <h1>{name ? name : catg ? catg : brandName ? brandName : "All Homes"}</h1>
          <span className="mt-1 d -block FS-12 FW-medium segmentType">
            {/* This house design segment have various type */}
          </span>
        </div>
      </div>

      <section className="sortBySection">
        <Container className="py-3 py-md-5 productsCorousel">
          {/* <div className="flex justify-between my-3"> */}
          {/* <span className="FW-bold">
              {productdata?.length} home designs found
            </span> */}

          {/* <ul className="d-flex align-items-center p-0">
              <li className="list-group FW-bold FS-12">Category:</li>
              <li className="list-group">

                <Form.Select
                  className="FS-12 ms-2 ff_Montserrat-Regular shadow-none border-dark"
                  name="sortBy"
                  value={CategoryChange}
                  onChange={handleCategoryChange}
                >
                  <option value={""}>
                    Select Here
                  </option>
                  {category?.map((each, idx) => (
                    <option key={idx} value={each.id}>
                      {each?.name}
                    </option>
                  ))}

                </Form.Select>
              </li>
            </ul> */}
          {/* <div className="me-4">
              <ul className="d-flex align-items-center p-0">
                <li className="list-group FW-bold FS-12">Manufacturer/Brands:</li>
                <li className="list-group">
                  <Form.Select
                    className="FS-12 ms-2 ff_Montserrat-Regular shadow-none border-dark"
                    name="sortBy"
                    value={brandChange}
                    onChange={handleBrandsChange}
                  >
                    <option value={""}>
                      Select Here
                    </option>
                    {brands?.map((each, idx) => (
                      <option key={idx} value={each.id}>
                        {each?.name}
                      </option>
                    ))}

                  </Form.Select>
                </li>
              </ul>
            </div> */}
          {/* 
            <div className="d-flex">




            </div>
          </div> */}

          <Row className="align-items-center justify-content-between mt-2 mb-4">
            <Col md="auto" className="order-2 order-md-1 mt-3 mt-md-0">
              <span className="FW-bold">
                {productdata?.length} home designs found
              </span>
            </Col>
            <Col md="8" className="d-block d-sm-flex order-1 order-md-2 row">
              {/* <div className="select-container FS-12 d-flex flex-col justify-content-center">
                <div className="d-flex align-items-center justify-content-between border border-dark px-2 py-2 py-sm-1 mb-sm-0 mb-3 borderRadius-5 text-left" onClick={handleBrandsButtonClick} role="button">
                  <button className="pe-2">{selectedBrandOption}</button>
                  <i className="icon-black-dropdown"></i>
                </div>
                {isBrandsOptionsVisible && (
                  <div className="options borderRadius-5 bg-body-tertiary py-1 boxShadowPrimary">
                    {brands?.map((each, idx) => (
                      <div key={idx} value={each.id} className="option py-0.5 my-1 px-2" role="button" onClick={() => handleBrandsChange(each.id, each?.name)}>
                        {each?.name}
                      </div>
                    ))}
                  </div>
                )}
              </div> */}
              {/* {!brandId && <ul className="d-flex align-items-center p-0">
                <li className="list-group FW-bold FS-12 me-2 text-nowrap">Manufacturer/Brands:</li>
                <li className="list-group w-100">
                  <Form.Select
                    className="FS-12 ff_Montserrat-Regular shadow-none border-dark"
                    name="sortBy"
                    value={brandChange}
                    onChange={handleBrandsChange}
                  >
                    <option value={""}>
                      Select Here
                    </option>
                    {brands?.map((each, idx) => (
                      <option key={idx} value={each.id}>
                        {each?.name}
                      </option>
                    ))}

                  </Form.Select>
                </li>
              </ul>
              } */}
              {!brandId && <div className="select-container col FS-12 d-flex flex-col justify-content-center">
                <div className="d-flex align-items-center justify-content-between border border-dark px-2 py-2 py-sm-1 mb-sm-0 mb-3 borderRadius-5 text-left"  onClick={handleBrandsButtonClick} role="button">
                  <button className="pe-2 text-truncate">{selectedOption}</button>
                  <i className="icon-black-dropdown"></i>
                </div>
                {isBrandsOptionsVisible && (
                  <div className="options borderRadius-5 bg-body-tertiary py-1 boxShadowPrimary">
                    {brands?.map((each, idx) => (
                      <div key={idx} value={each.id} className="option py-0.5 my-1 px-2" role="button" onClick={() => handleBrandsChange(each.id,each?.name)}>
                        {each?.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>}
              {/* <ul className="d-flex align-items-center p-0 ms-3">
                <li className="list-group FW-bold FS-12 me-2 text-nowrap">Category : </li>
                <li className="list-group w-100">

                  <Form.Select
                    className="FS-12 ff_Montserrat-Regular shadow-none border-dark"
                    name="sortBy"
                    value={CategoryChange}
                    onChange={handleCategoryChange}
                  >
                    <option value={""}>
                      Select Here
                    </option>
                    {category?.map((each, idx) => (
                      <option key={idx} value={each.id}>
                        {each?.name}
                      </option>
                    ))}

                  </Form.Select>
                </li>
              </ul> */}
              <div className="select-container col FS-12 d-flex flex-col justify-content-center">
                <div className="d-flex align-items-center justify-content-between border border-dark px-2 py-2 py-sm-1 borderRadius-5 text-left"  onClick={handleCategoriesButtonClick} role="button">
                  <button className="pe-2 text-truncate">{selectedCategory}</button>
                  <i className="icon-black-dropdown"></i>
                </div>
                {isCategoriesOptionsVisible && (
                  <div className="options borderRadius-5 bg-body-tertiary py-1 boxShadowPrimary">
                    {category?.map((each, idx) => (
                      <div key={idx} value={each.id} className="option py-0.5 my-1 px-2" role="button" onClick={() => handleCategoryChange(each.id,each?.name)}>
                        {each?.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="select-container col FS-12 d-flex flex-col justify-content-center">
                <div className="d-flex align-items-center justify-content-between border border-dark px-2 py-2 py-sm-1 my-sm-0 my-3 borderRadius-5 text-left"  onClick={handleSortByButtonClick} role="button">
                  <button className="pe-2 text-truncate">{selectedSortBy}</button>
                  <i className="icon-black-dropdown"></i>
                </div>
                {isSortByOptionsVisible && (
                  <div className="options borderRadius-5 bg-body-tertiary py-1 boxShadowPrimary">
                    {[
                        { label: "Sq. ft. (Low to High)", value: { square_feet: "ASC" } },
                        { label: "Sq. ft. (High to Low)", value: { square_feet: "DESC" } },
                        { label: "Bedrooms (Low to High)", value: { no_of_bedrooms: "ASC" } },
                        { label: "Bedrooms (High to Low)", value: { no_of_bedrooms: "DESC" } },
                        { label: "Bathrooms (Low to High)", value: { no_of_bathrooms: "ASC" } },
                        { label: "Bathrooms (High to Low)", value: { no_of_bathrooms: "DESC" } },

                      ].map((option, key) => (
                      <div key={key} value={JSON.stringify(option.value)} className="option py-0.5 my-1 px-2" role="button" onClick={() => handleSortChange(option)}>
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* <ul className="d-flex align-items-center p-0 mx-3">
                <li className="list-group FW-bold FS-12 text-nowrap me-2">Sort By : </li>
                <li className="list-group">
                  
                  <Form.Select
                    className="FS-12 ff_Montserrat-Regular shadow-none border-dark"
                    name="sortBy"
                    onChange={handleSortChange}
                  >
                    <option>Select---</option>
                    {[
                      {
                        label: "Square feet (400-3000)",
                        value: JSON.stringify({ square_feet: "ASC" }),
                      },
                      {
                        label: "Square feet Desc",
                        value: JSON.stringify({ square_feet: "DESC" }),
                      },
                      {
                        label: "Bedrooms(1-20)",
                        value: JSON.stringify({ no_of_bedrooms: "ASC" }),
                      },
                      {
                        label: "Bedrooms Desc",
                        value: JSON.stringify({ no_of_bedrooms: "DESC" }),
                      },
                      {
                        label: "Bathrooms(1-20)",
                        value: JSON.stringify({ no_of_bathrooms: "ASC" }),
                      },
                      {
                        label: "Bathrooms Desc",
                        value: JSON.stringify({ no_of_bathrooms: "DESC" }),
                      },
                    ].map((option, key) => (
                      <option key={key} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </li>
              </ul> */}
              <InputGroup size="sm" className="col">
                <InputGroup.Text id="basic-addon1" className="border-dark bg-transparent"><i className="icon-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  name="query"
                  value={searchQuery?.searchfield}
                  onChange={(e) => setSearchQuery((pre) => ({ ...pre, searchfield: e.target.value }))}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && e.key.trim() !== "") {
                      getData()
                    }
                  }}
                  placeholder="Search here......"
                  className="shadow-none border-dark"
                />
              </InputGroup>

            </Col>
          </Row>





          <Row className="justify-content-center justify-content-md-start">
            {!!productdata?.length &&
              productdata?.map((each, id) => (
                <Col key={id}  className="col-lg-3 col-md-4 col-sm-5 col-7 d-flex justify-content-center justify-content-sm-between">
                  <ProductCards
                    cardimg={each?.product_assets}
                    manufactured_home={each?.is_manufactured}
                    name={each?.name}
                    category_name={each?.categories?.name}
                    square_feet={each?.square_feet}
                    no_of_bedrooms={each?.no_of_bedrooms}
                    no_of_bathrooms={each?.no_of_bathrooms}
                    id={each.id}
                    style={each?.sub_categories?.name}
                  />

                </Col>
              ))}
          </Row>



          <div className="flex items-center justify-end paginationSection">
            {pagination?.totalCount > 1 && (
              <Pagination>
                {pagination?.totalPages !== 1 && (
                  <Pagination.First onClick={() => getData(1)} />
                )}
                {Array.from(
                  Array(pagination?.totalPages),
                  (_, index) => index + 1
                ).map((page) => (
                  <Pagination.Item
                    key={page}
                    active={page == pagination?.currentPage}
                    onClick={() => getData(page)}
                  >
                    {page}
                  </Pagination.Item>
                ))}
                {pagination?.totalPages !== pagination?.totalCount && (
                  <Pagination.Last onClick={() => getData(page)} />
                )}
              </Pagination>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};

export default ContentPage;
