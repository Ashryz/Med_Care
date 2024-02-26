// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
import Filter from "../Filter/Filter";

function SearchResults() {
    // const { query } = useParams();
    // const [searchResults, setSearchResults] = useState([]);
    // useEffect(() => {
    //     axios.get(`https://dummyjson.com/products/search?q=${query}`)
    //         .then((res) => {
    //             if (res && res.data && res.data.products) {
    //                 setSearchResults(res.data.products);
    //             } else {
    //                 console.error('Invalid response format:', res);
    //             }
    //         })
    //         .catch((err) => {
    //             console.error('Error fetching products:', err);
    //         });
    // }, [query]);
    // console.log(searchResults);
    return (
        <div className="container-fluid mt-5 mb-5">
            <h1 className="text-center text-warning fw-bold mt-3 mb-5"> Your Searched Product is ... </h1>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                <Filter />
            {/* {searchResults.map((product) => (
                <div key={product.id} className="col">
                </div>
            ))} */}
            </div>
        </div>
    );
}

export default SearchResults;