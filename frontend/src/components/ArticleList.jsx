import ArticleResultCard from './ArticleResultCard.jsx';

const ArticleList = ({ results = [] }) => {
  return (
    <div className="grid gap-4">
      {results.map((article) => (
        <ArticleResultCard
          key={article.link}
          title={article.title}
          snippet={article.snippet}
          source={article.source}
          link={article.link}
        />
      ))}
    </div>
  );
};

export default ArticleList;

