
import  Categoryinfos  from './CategoryAll.jsx';
import CategoryCard from "./CategoryCard";
import classes from './categories.module.css';
const Category = () => {
  return (
    <>
      <div className={classes.category__container}>
        {Categoryinfos.map((infos) => (
          <CategoryCard key={infos.title} data={infos} />
        ))}
      </div>
    </>
  );
}

export default Category;
