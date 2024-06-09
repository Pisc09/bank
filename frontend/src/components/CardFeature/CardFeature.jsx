import "../../../../designs/css/main.css";

function CardFeature({ imgSrc, altText, title, paragraph }) {
  return (
    <div className="feature-item">
      <img src={imgSrc} alt={altText} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{paragraph}</p>
    </div>
  );
}
export default CardFeature;
