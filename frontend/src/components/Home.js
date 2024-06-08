import React, { Fragment, useEffect,useState } from "react";
import MetaData from "./layout/MetaData";
import { getProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./layout/Loader";
import Product from "./products/Product";
import { toast } from "react-toastify";
import  Pagination from "react-js-pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error ,productsCount,resPerPage } = useSelector(
    (state) => state.productsState
  );
  const [currentPage , setCurrentPage] = useState(1)
  

  const setCurrentPageNumber = (pageNo) =>{

  setCurrentPage(pageNo)
  }
  useEffect(() => {
    if (error) {
      return toast.success(error, {
        position: "bottom-center"
      });
    }
    dispatch(getProducts(null,null,null,null,currentPage));
  }, [error, dispatch , currentPage]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <MetaData title={"Buy Best Product"} />

          <h1 id="products_heading" className="text-center">
            Latest Products
          </h1>

          <section id="products" className="container mt-5">
            <div className="row">
              {products &&
                products.map((product) => (
                  <Product col={3} key={product._id} products={product} />
                ))}
            </div>
          </section>
          { productsCount > 0 && productsCount >resPerPage?
          <div className="d-flex justify-content-center mt-10"> 
          <Pagination
           activePage={currentPage}
           onChange={setCurrentPageNumber}
           totalItemsCount={productsCount}
           itemsCountPerPage={resPerPage}
           nextPageText={'Next'}
           firstPageText={'First'}
           lastPageText={'Last'}
           itemClass={'page-item'}
           linkClass={'page-link'}
          />
          </div> :null}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
