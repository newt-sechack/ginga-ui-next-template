import ArticleCard from "#/app/_components/ArticleCard";
import { ArticleProps } from "#/libs/cms";

import styles from "./ArticleList.module.css";

type ArticleListProps = {
  posts: ArticleProps[];
};

const ArticleList: React.FC<ArticleListProps> = ({ posts }) => {
  return (
    <ul className={styles.root}>
      {posts.map((item) => (
        <ArticleCard key={item.id} {...item} />
      ))}
    </ul>
  );
};

export default ArticleList;
