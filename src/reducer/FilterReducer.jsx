
export const FilterReducer = (state,action) => {
    const {type,payload} = action
    switch(type){
        case "PRODUCT_LIST":
            return { ...state, productList: payload.product};

        case "BEST_SELLER_ONLY":
            return {...state,bestSellerOnly:payload.bestSellerOnly}

        case "IN_STOCK_ONLY":
            return { ...state,onlyInStock:payload.onlyInStock }  

        case "SORT_BY":
            return { ...state,sortBy: payload.sortBy }   

        case "RATINGS":
            return { ...state,ratings: payload.ratings }  

        case "CLEAR":
            return {...state,
                    bestSellerOnly:payload.bestSellerOnly,
                    onlyInStock:payload.onlyInStock,
                    sortBy: payload.sortBy,
                    ratings: payload.ratings
                  }

        default:
            throw new Error("No Case Found")
    }
}
