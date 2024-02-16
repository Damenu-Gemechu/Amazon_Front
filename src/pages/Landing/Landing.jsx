import Category from "../../Component/Category/Category";
import Layout from "../../Component/Layout/Layout";
import Carousel from "../../Component/Carousel/Carousel";
import Product from "../../Component/Product/Product";

const Landing = () => {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  );
};

export default Landing;
