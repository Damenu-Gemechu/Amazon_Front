import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import imgData from "./img/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import * as classes from "./carousels.Module.css";

const Carousel = () => {
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

export default Carousel;

