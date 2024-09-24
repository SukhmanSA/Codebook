import { createContext, useContext, useReducer } from "react";
import { FilterReducer } from "../reducer/FilterReducer";

const filterInitialState = {
  productList: [],
  onlyInStock: false,
  bestSellerOnly: false,
  sortBy: null,
  ratings: null,
};

const FilterContext = createContext(filterInitialState);

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(FilterReducer, filterInitialState);

  function intitialProductList(products) {
    dispatch({
      type: "PRODUCT_LIST",
      payload: {
        product: products,
      },
    });
  }

  function bestSeller(products) {
    return state.bestSellerOnly ? products.filter((product) => product.best_seller === true) : products;
  }

function inStock(products) {
    return state.onlyInStock ? products.filter(product => product.in_stock) : products;
}

  function sort(products) {
    if (state.sortBy === "lowtohigh") {
      products.sort((a, b) => Number(a.price) - Number(b.price));
    }
    if (state.sortBy === "hightolow") {
      products.sort((a, b) => Number(b.price) - Number(a.price));
    }
    return products;
  }

  function rating(products) {
    if (state.ratings === "4STARSABOVE") {
      return products.filter((product) => product.rating >= 4);
    }
    if (state.ratings === "3STARSABOVE") {
      return products.filter((product) => product.rating >= 3);
    }
    if (state.ratings === "2STARSABOVE") {
      return products.filter((product) => product.rating >= 2);
    }
    if (state.ratings === "1STARSABOVE") {
      return products.filter((product) => product.rating >= 1);
    }
    return products;
  }

  const filteredList = rating(sort(inStock(bestSeller(state.productList))));

  const value = {
    state,
    dispatch,
    products: filteredList,
    intitialProductList,
  };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
