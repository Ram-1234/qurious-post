import  React from 'react';
import tempImg from "../../assets/news-intro-template.jpg"
import "./style.css"


export default function NewsCard({description,content, title, thumbnail, date, author, url}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div class="card border border-grey" style={{height:"100%"}}>
      <img src={thumbnail||tempImg} class="card-img-top" alt="..."/>
      <div class="card-body">
        <h5 class="card-title">{author}</h5>
        <p class="card-text">{title}</p>
        <a href={url} target='_blank' rel="noreferrer" className="btn btn-primary">Full News</a>
      </div>
    </div>
  );
}
