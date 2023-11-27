import SearchField from "@/components/SearchField/SearchField";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductCards from "@/components/ProductCards/ProductCards";
import axios from "axios";
import BreadcrumbNav from "@/components/BreadcrumbNav/BreadcrumbNav";
import { useAppContext } from "../src/hooks/UserContext";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Button, Form, Pagination } from "react-bootstrap";
import sendHttpRequest from "@/src/http/Request";
import { useCallback } from "react";
import Link from "next/link";


const SearchListing = () => {
  const [productdata, setProductData] = useState([]);

  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalCount: 1,
    currentPage: 1,
    pageSize: 20,
  });

  const [category, setCategory] = useState();
  const [brands, setBrands] = useState();
  console.log(brands, "brands")
  const [sortBy, setSortBy] = useState();
  const [CategoryChange, setCategoryChange] = useState(null);
  const [brandChange, setBrandChange] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Manufacturer/Brands");
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedSortBy, setSelectedSortBy] = useState("Sort By");
  console.log(brandChange, "brandChange")
  const globRef = useRef({});
  console.log(globRef, "globRef")
  const [isBrandsOptionsVisible, setBrandsOptionsVisible] = useState(false);
  const [isCategoriesOptionsVisible, setCategoriesOptionsVisible] = useState(false);
  const [isSortByOptionsVisible, setSortByOptionsVisible] = useState(false);
  const [viewall,setViewall]=useState(false)

  const { state, dispatch } = useAppContext();

  const getData = useCallback(async ({ page, order, values, cat, manbrand }) => {
    try {
      const res = await sendHttpRequest("get", `/CRUD/products`, {
        relations: ["product_assets", "categories", "sub_categories", "brands",],
        where: { is_deleted: false, is_active: true, ...(cat || globRef.current?.cat ? { categories: { id: cat ?? globRef.current?.cat } } : {}), ...(manbrand || globRef.current?.manbrand ? { brands: { id: manbrand ?? globRef.current?.manbrand } } : {}) },
        skip: (page - 1) * 20,
        take: 20,
        order: order,
        // limit: 1,
        filter: { ...values },
      }, {}, true)
      setProductData(res.data.result);
      setPagination((prevPagination) => ({
        ...prevPagination,
        totalPages: res.data?.totalPages,
        totalCount: res?.data?.totalCount,
      }));
      // setPagination({ totalPages: res.data?.totalPages, totalCount: res.data?.totalCount, currentPage: res.data?.currentPage })
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);


  const handlePageChange = (page) => {
    getData({ page, order: sortBy, values: state.filterData });
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: page,
    }));
  };

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

  const handleBrandsChange = (id,name) => {
    setSelectedOption(name)
    setBrandChange(id);
    globRef.current = { ...(globRef.current ?? {}), manbrand: id }
    setBrandsOptionsVisible(!isBrandsOptionsVisible);
    getData({ page: 1, order: sortBy, values: state.filterData, manbrand: id });
    
  }



  useEffect(() => {
    getData({ page: 1, order: sortBy, values: state.filterData, cat: CategoryChange, manbrand: brandChange });
  }, [getData, sortBy, state.filterData]);


  const getCategory = async () => {
    const res = await sendHttpRequest("get", `/CRUD/categories`, {
      relations: [],
      where: { is_deleted: false, is_active: true },
    }, {}, true)
    setCategory(res?.data?.result)
  }

  const getBrands = async () => {
    const res = await sendHttpRequest("get", `/CRUD/brands`, {
      relations: [],
      where: { is_deleted: false, is_active: true },
    }, {}, true)
    setBrands(res?.data?.result)
  }

  useEffect(() => {
    getCategory();
    getBrands();
  }, [])

  // const viewall = () => {
  //   dispatch({ type: "FilterData", payload: {} });
  //   getData({ page: 1, order: sortBy, values: {}, cat: CategoryChange, manbrand: brandChange });

  // };


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
          <BreadcrumbNav />

          <div className="pb-3 searchFieldBtn">
            <SearchField submit={getData}
              filterdata={state?.filterData} view={viewall} setview={setViewall} />
          </div>
        </div>
      </div>

      <section className="sortBySection">
        <Container className="py-5">

          {/* <button className='FW-bold'>Sort By <i className='icon-sort-by'></i></button> */}
          {/* <Dropdown>
              <Dropdown.Toggle id="dropdown-basic" className="border-none">
                Sort By
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">
                <Form>
                      <Form.Check // prettier-ignore
                        type="radio"
                        id="radio1"
                        label="default"
                      />
                </Form>
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}

          <Row className="align-items-center justify-content-between mt-2 mb-4">
            <Col sm="auto" className="order-2 order-sm-1 mt-3 mt-sm-0">
              {productdata?.length ? <span className="FW-bold">{productdata?.length} home designs found
              </span> : <div onClick={()=>setViewall(true)}>View All</div>
              }
            </Col>
            <Col sm="auto" className="d-block d-sm-flex order-1 order-sm-2">
              {/* <ul className="d-flex align-items-center p-0">
                <li className="list-group FW-bold FS-12 me-2">Manufacturer/Brands :</li>
                <li className="list-group">
                  <Form.Select
                    className="FS-12 ff_Montserrat-Regular shadow-none border-dark"
                    name="sortBy"
                    value={brandChange}
                    onChange={handleBrandsChange}
                    placeholder="Source Type"
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
              </ul> */}
              <div className="select-container FS-12 d-flex flex-col justify-content-center">
                <div className="d-flex align-items-center justify-content-between border border-dark px-2 py-2 py-sm-1 mb-sm-0 mb-3 borderRadius-5 text-left"  onClick={handleBrandsButtonClick} role="button">
                  <button className="pe-2">{selectedOption}</button>
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
              </div>
              <div className="select-container FS-12 d-flex flex-col justify-content-center mx-sm-3 mx-0">
                <div className="d-flex align-items-center justify-content-between border border-dark px-2 py-2 py-sm-1 borderRadius-5 text-left"  onClick={handleCategoriesButtonClick} role="button">
                  <button className="pe-2">{selectedCategory}</button>
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
              <div className="select-container FS-12 d-flex flex-col justify-content-center">
                <div className="d-flex align-items-center justify-content-between border border-dark px-2 py-2 py-sm-1 mt-sm-0 mt-3 borderRadius-5 text-left"  onClick={handleSortByButtonClick} role="button">
                  <button className="pe-2">{selectedSortBy}</button>
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
                <li className="list-group FW-bold FS-12 me-2">Category :</li>
                <li className="list-group">
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
              {/* {productdata?.length == 1 ? "" : (
                <ul className="d-flex align-items-center p-0">
                  <li className="list-group FW-bold FS-12 me-2">Sort By :</li>
                  <li className="list-group">

                    <Form.Select
                      className="FS-12 ff_Montserrat-Regular shadow-none border-dark"
                      name="sortBy"
                      // value={sortBy}
                      onChange={handleSortChange}
                    >
                      <option>
                        Select Here
                      </option>
                      {[
                        { label: "Sq. ft. (Low to High)", value: { square_feet: "ASC" } },
                        { label: "Sq. ft. (High to Low)", value: { square_feet: "DESC" } },
                        { label: "Bedrooms (Low to High)", value: { no_of_bedrooms: "ASC" } },
                        { label: "Bedrooms (High to Low)", value: { no_of_bedrooms: "DESC" } },
                        { label: "Bathrooms (Low to High)", value: { no_of_bathrooms: "ASC" } },
                        { label: "Bathrooms (High to Low)", value: { no_of_bathrooms: "DESC" } },

                      ].map((option, key) => (
                        <option key={key} value={JSON.stringify(option.value)}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Select>
                  </li>
                </ul>
              )} */}
            </Col>
          </Row>

          <Row className="justify-content-center justify-content-md-start">
            {!!productdata?.length &&
              productdata?.map((each, id) => (
                <Col className="col-lg-3 col-md-4 col-sm-5 col-7 d-flex justify-content-center justify-content-sm-between" key={id}>
                  <ProductCards
                    cardimg={each?.product_assets}
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

          <div className="d-flex justify-content-end align-items-center">
            {/* <span className="me-4 FW-semibold paginationTitle">Showing 1 - 24 of 814</span> */}
            {/* <div className="flex items-center justify-end paginationSection">
              {pagination?.totalCount > 1 && (
                <Pagination>
                  {pagination?.totalPages !== 1 && <Pagination.First onClick={() => getData(1)} />}
                  {Array.from(Array(pagination?.totalPages), (_, index) => index + 1).map((page) => (
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
              )

              }
            </div> */}

            <div className="pagination">
              <Button
                variant="link"
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                Prev
              </Button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              )
                .slice(
                  pagination.currentPage - 1,
                  pagination.currentPage + 3
                )
                .map((pageNumber) => (
                  <Button
                    key={pageNumber}
                    variant="link"
                    onClick={() => handlePageChange(pageNumber)}
                    active={pagination.currentPage === pageNumber}
                  >
                    {pageNumber}
                  </Button>
                ))}
              <Button
                variant="link"
                onClick={() => {
                  handlePageChange(pagination.currentPage + 1);
                }}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default SearchListing;
