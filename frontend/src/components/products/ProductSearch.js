import React, { Fragment, useEffect, useState } from "react";
import MetaData from ".././layout/MetaData";
import { getProducts } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from ".././layout/Loader";
import Product from ".././products/Product";
import { toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";

const ProductSearch = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productsCount, resPerPage } = useSelector(
    (state) => state.productsState);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [price, setPrice] = useState([1, 1000]);
  const [priceChanged, setPriceChanged] = useState(price);
  const [category, setCategory] = useState(null);
  const [ratings, setRatings] = useState(0);

  const categories = [
    "Electronics",
    "Mobile Phones",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const setCurrentPageNumber = (pageNo) => {
    setCurrentPage(pageNo);
  };
  useEffect(() => {
    if (error) {
      return toast.success(error, {
        position: 'bottom-center',
      });
    }
    dispatch(
      getProducts(keyword, priceChanged, category, ratings, currentPage)
    );
  }, [error, dispatch, currentPage, keyword, priceChanged, category, ratings]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"Buy Best Product"} />

          <h1 id="products_heading" className="text-center">
            Search Products
          </h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {/*Price Filter*/}
              <div className="col-6 col-md-3 mb-5 mt-3 ">
                <h4 className="mb-5">Prize Range</h4>
                <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                  <Slider
                    range={true}
                    marks={{
                      1: "$   1",
                      1000: "$1000",
                    }}
                    min={1}
                    max={1000}
                    defaultValue={price}
                    onChange={(price) => {
                      setPrice(price);
                    }}
                    handleRender={(renderProps) => {
                      return (
                        <Tooltip
                          overlay={`$${renderProps.props["aria-valuenow"]} `}
                        >
                          <div {...renderProps.props}> </div>
                        </Tooltip>
                      );
                    }}
                  />
                </div>
                <hr className="my-5" />
                {/*Catagory Filter*/}
                <div className="mt-3">
                  <h3 className="mb-3">Catagories</h3>
                  <u1 className="pl-0">
                    {categories.map((category) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={categories}
                        onClick={() => {
                          setCategory(category);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </u1>
                </div>
                {/*Rating Filter*/}
                <hr className="my-2" />
                <div>
                  <h4 className="">Ratings</h4>
                  <u1 className="pl-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <li
                        style={{
                          cursor: "pointer",
                          listStyleType: "none",
                        }}
                        key={star}
                        onClick={() => {
                          setRatings(star);
                        }}
                      >
                        <div className="rating-outer">
                          <div
                            className="rating-inner"
                            style={{ width: `${star * 20}% ` }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </u1>
                </div>
              </div>

              <div className="col-6 col-md-9 ">
                <div className="row">
                  {products &&
                    products.map((product) => (
                      <Product col={4} key={product._id} products={product} />
                    ))}
                </div>
              </div>
            </div>
          </section>
          {productsCount > 0 && productsCount > resPerPage ? (
            <div className="d-flex justify-content-center mt-10">
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNumber}
                totalItemsCount={productsCount}
                itemsCountPerPage={resPerPage}
                nextPageText={"Next"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass={"page-item"}
                linkClass={"page-link"}
              />
            </div>
          ) : null}
        </div>
      )}
    </Fragment>
  );
};

export default ProductSearch;
