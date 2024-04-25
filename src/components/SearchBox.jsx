import React, { useState } from "react";
import DOMPurify from "dompurify";
import articles from "../articles";

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  };

  function highlightText(text, keyword) {
    if (keyword === "") return text;
    const regex = new RegExp(`(${keyword})`, "gi");
    console.log(regex);
    return DOMPurify.sanitize(
      text.replace(regex, (match) => `<mark>${match}</mark>`)
    );
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-box-container">
      <input
        type="text"
        placeholder="Search articles..."
        className="search-input"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <ul className="article-list">
        {filteredArticles.map((article) => (
          <li key={article.id}>
            <h3
              dangerouslySetInnerHTML={{
                __html: highlightText(article.title, searchTerm),
              }}
            />
            <p
              dangerouslySetInnerHTML={{
                __html: highlightText(article.content, searchTerm),
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
