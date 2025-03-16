import c from './ImageCard.module.css';

interface Image { 
  id: string,
  urls: {
    small: string;
  };
  alt_description: string;
}


interface Props { 
  obj: Image;
  onClick: () => void;
}

const ImageCard = ({ obj, onClick }: Props) => {
  return (
    <div>
      <img 
        src={obj.urls.small} 
        alt={obj.alt_description} 
        className={c.cart} 
        onClick={onClick} 
      />
    </div>
  );
};

export default ImageCard;
