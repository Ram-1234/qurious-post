import  React from 'react';
import tempImg from "../../assets/news-intro-template.jpg"
import "./style.css"

export default function NewsCard({description,content, title, thumbnail, date, author, url}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="card" style={{height:"100%"}}>
      <img src={thumbnail||tempImg} loading='lazy' className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{author}</h5>
        <p className="card-text">{title}</p>
        <a href={url} target='_blank' rel="noreferrer" className="btn btn-primary">Full News</a>
      </div>
    </div>
  );
}
