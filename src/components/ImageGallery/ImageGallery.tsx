import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';

interface Image { 
  id: string,
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

interface Props { 
  results: Image[]; 
  onImageClick: (image: Image) => void; 
}

function ImageGallery({ results, onImageClick }: Props) {
  return (
    <ul className={css.list}>
      {results.map((obj) => (
        <li key={obj.id}>
          <ImageCard obj={obj} onClick={() => onImageClick(obj)} />
        </li>
      ))}
    </ul>
  );
}

export default ImageGallery;
