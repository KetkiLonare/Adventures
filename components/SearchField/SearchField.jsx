import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/src/hooks/UserContext";
import sendHttpRequest from "../../src/http/Request";

const SearchField = ({ submit, filterdata,setview,view }) => {
  const router = useRouter();
  const { state, dispatch } = useAppContext();

  const [dropdowns, setDropdowns] = useState([]);

  const [values, setValues] = useState({
    square_feet: {},
    no_of_bedrooms: {},
    no_of_bathrooms: {},
    levels: {},
  });
  const dropdownsTEmp = [
    {
      label: "SQF",
      key: "square_feet",
      items:"",
      value:"",
      selectedValue:"Any",
    },
    {
      label: "BEDROOMS",
      key: "no_of_bedrooms",
      items:"",
      value:"",
      selectedValue:"Any",
    },
    {
      label: "BATHROOMS",
      key: "no_of_bathrooms",
      items:"",
      value:"",
      selectedValue:"Any",
    },
    {
      label: "LEVELS",
      key: "levels",
      items:"",
      value:"",
      selectedValue:"Any",
    },
    
  ];
  const getData = async () => {
    try {
      const res = await sendHttpRequest(
        "get",
        `/CRUD/filterdata`,
        {
          where: { is_deleted: false },
        },
        {},
        true
      );
      const { result } = res.data;

      const dropdownsT = [
        {
          label: "SQF",
          key: "square_feet",
          items:
            result?.length &&
            result.map(
              (item) => `${item?.min_square_feet}-${item?.max_square_feet}`
            ),
          value:
            result?.length &&
            result.map((item) => ({
              min: item?.min_square_feet,
              max: item?.max_square_feet,
            })),
          selectedValue: filterdata?.square_feet?.min
            ? `${filterdata?.square_feet?.min}-${filterdata?.square_feet?.max}`
            : "Any",
        },
        {
          label: "BEDROOMS",
          key: "no_of_bedrooms",
          items: result?.length && result.map((item) => item?.no_of_bedrooms),
          value:
            result?.length &&
            result.map((item) => ({ no_of_bedrooms: item?.no_of_bedrooms })),
          selectedValue: filterdata?.no_of_bedrooms?.no_of_bedrooms
            ? `${filterdata?.no_of_bedrooms?.no_of_bedrooms}`
            : "Any",
        },
        {
          label: "BATHROOMS",
          key: "no_of_bathrooms",
          items: result?.length && result.map((item) => item?.no_of_bathrooms),
          value:
            result?.length &&
            result.map((item) => ({ no_of_bathrooms: item?.no_of_bathrooms })),
          selectedValue: filterdata?.no_of_bathrooms?.no_of_bathrooms
            ? `${filterdata?.no_of_bathrooms?.no_of_bathrooms}`
            : "Any",
        },
        {
          label: "LEVELS",
          key: "levels",
          items: result?.length && result.map((item) => item?.levels),
          value:
            result?.length && result.map((item) => ({ levels: item?.levels })),
          selectedValue: filterdata?.levels?.levels
            ? `${filterdata?.levels?.levels}`
            : "Any",
        },
        
      ];

      setDropdowns(dropdownsT);
    } catch (e) {
      console.log(e);
    }
  };

  
  const handleDropdownSelect = ({ target }) => {
    const { name, value } = target;
    if (value === "Any") {
      setValues({ ...values, [name]: {} });
    } else {
      setValues({ ...values, [name]: JSON.parse(value) });
    }
  };

  const resetValues = (viewall=false) => {
    dispatch({ type: "FilterData", payload: {} });

    const defaultValues = {
      square_feet: {},
      no_of_bedrooms: {},
      no_of_bathrooms: {},
      levels: {},
    };

    const dropdownupdate = dropdowns.map((each, idx) => ({
      ...each,
      selectedValue: "Any",
    }));
    setDropdowns(dropdownupdate);
    setValues(defaultValues);

    if(viewall) getData({page:1,values:{}})
  };

  useEffect(() => {
    getData();
  }, []);

  useMemo(() => {
    // setview(false)
    resetValues()
  }, [view]);

  return (
    <>
      <div className="row bg-white m-0 searchFieldRow d-flex">
        {!!dropdowns?.length ?

          dropdowns?.map((dropdown, index) => (
            <div
              className={`col-md col-12 ${
                index > 0 ? " border-start" : ""
              } py-2`}
              key={index}
            >
              <span className="FW-semibold searchFieldItems">
                {dropdown.label}
              </span>
              <div
                className={`dropdown ${dropdown.isDropdownOpen ? "show" : ""} `}
              >
                <select
                  className="dropdown-select flex justify-between items-baseline w-100"
                  onChange={handleDropdownSelect}
                  name={dropdown.key}
                  value={JSON.stringify(values[dropdown.key])}
                >
                  <option className="dropdown-list_item px-3 py-1">
                    {`${dropdown.selectedValue}`}
                  </option>
                  {!!dropdown?.items?.length &&
                    dropdown.items.map((item, idx) => (
                      <option
                        className="dropdown-list_item px-3 py-1"
                        value={JSON.stringify(dropdown.value[idx])}
                        key={idx}
                      >
                        {item}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          )): dropdownsTEmp.map((dropdown, index)=>(
            <div
            className={`col-md col-12 ${
              index > 0 ? " border-start" : ""
            } py-2`}
            key={index}
          >
            <span className="FW-semibold searchFieldItems">
              {dropdown.label}
            </span>
            <div
              className={`dropdown ${dropdown.isDropdownOpen ? "show" : ""} `}
            >
              <select
                className="dropdown-select flex justify-between items-baseline w-100"
                onChange={handleDropdownSelect}
                name={dropdown.key}
                value={JSON.stringify(values[dropdown.key])}
              >
                <option className="dropdown-list_item px-3 py-1">
                  {`${dropdown.selectedValue}`}
                </option>
                {!!dropdown?.items?.length &&
                  dropdown.items.map((item, idx) => (
                    <option
                      className="dropdown-list_item px-3 py-1"
                      value={JSON.stringify(dropdown.value[idx])}
                      key={idx}
                    >
                      {item}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          )

          )}

        {!submit ? (
          <Link
            href="/searchListing"
            onClick={() => dispatch({ type: "FilterData", payload: values })}
            className="col md:border-start border-start-none  flex justify-center items-center cursor-pointer md:py-0 py-3"
          >
            <button className="FW-bold">SEARCH</button>
          </Link>
        ) : (
          <>
            <button
              onClick={() => submit({page:1, order:"ASC", values:values})}
              className="FW-bold col border-start flex justify-center items-center cursor-pointer md:py-0 py-3"
              style={{ backgroundColor: "#c01e58" }}
            >
              SEARCH
            </button>
            <button
              onClick={() => {
                resetValues();
              }}
              className="FW-bold col border-start flex justify-center items-center cursor-pointer md:py-0 py-3"
            >
              RESET
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default SearchField;
