/* eslint-disable react-hooks/exhaustive-deps */

import Layout from "../../Component/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productURL } from "../../Api/endpoint";
import { useEffect, useState } from "react";
import ProductCard from "../../Component/Product/ProductCard";
import classes from './result.module.css';

const Results = () => {
  const [results, setResults] = useState();
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios.get(`${productURL}/products/category/${categoryName}`)
      .then((res) => { 
        setResults(res.data);
        // console.log(res.data);
        setIsLoading(false); 
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false); 
      });
  }, []);

  return (
    <Layout>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/{categoryName}</p>
        <hr />
        {isLoading ? (
          <loader /> // Consider changing to a loading spinner or other loading indicator
        ) : (
          <div className={classes.products__container}>
            {results?.map((product) => (
              <ProductCard
                key={product.id}
                renderAdd={true}
                product={product}
              />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Results;




// import Layout from "../../Component/Layout/Layout";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { productUrl } from "../../Api/endpoint";
// import { useEffect, useState } from "react";
// import ProductCard from "../../Component/Product/ProductCard";
// import classes from './Results.module.css';

// const Results = () => {
//   const [results, setResults] = useState();
//   const { categoryName } = useParams();
//   console.log(categoryName)
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     axios.get(`${productUrl}/products/category/${categoryName}`)
//       .then((res) => { 
//         setResults(res.data);
//         console.log(res.data);
//         setIsLoading(false); 
//       })
//       .catch((err) => {
//         console.log(err);
//         setIsLoading(false); 
//       });
//   }, []);

//   return (
//     <Layout>
//       <section>
//         <h1 style={{ padding: "30px" }}>Results</h1>
//         <p style={{ padding: "30px" }}>Category/{categoryName}</p>
//         <hr />
//         {isLoading ? (
//           <loader /> // Consider changing to a loading spinner or other loading indicator
//         ) : (
//           <div className={classes.products__container}>
//             {results?.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 renderAdd={true}
//                 product={product}
//               />
//             ))}
//           </div>
//         )}
//       </section>
//     </Layout>
//   );
// };

// export default Results;
