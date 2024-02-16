import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import imgData from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as classes from "./Carousel.Module.css";

const Carouselp = () => {
  return (
    <div>
      <ResponsiveCarousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}>
        {imgData.map((imageItemLink, index) => (
          <img key={index} src={imageItemLink} alt={`Slide ${index + 1}`} />
        ))}
      </ResponsiveCarousel>
      <div className={classes.hero__img}></div>
    </div>
  );
};

export default Carouselp;

