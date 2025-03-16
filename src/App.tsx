import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from "./components/Loader/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import CustomModal from './components/ImageModal/ImageModal'; 

interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
  description?: string;
}
interface Response {
  results: Image[];
}
function App() {

  
  const [inputValue, setInputValue] = useState<string>("");
  const [results, setResults] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null); 

  const handleImageClick = (image: Image) : void => {
    setSelectedImage(image); 
  };

  const closeModal = () : void => {
    setSelectedImage(null); 
  };

  const accessKey = "bw3QZmXz-5_eoE4qHympcDLtK-WHfQECIscbYjt4ALk";

  useEffect(() => {
    if (!inputValue) return;

    async function fetchData() : Promise<void> {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get<Response>("https://api.unsplash.com/search/photos", {
          params: {
            client_id: accessKey,
            query: inputValue,
            page: page,
            per_page: 10,
          }
        });
        if (page === 1) {
          setResults(response.data.results);
        } else {
          setResults((prevResults) => [...prevResults, ...response.data.results]);
        }
      }
      catch (error) {
        setError(true);
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [inputValue, page]);

  const formSub = (e : React.FormEvent<HTMLFormElement>) :void => {
    e.preventDefault();
    const value = (e.currentTarget.elements.namedItem("inputField") as HTMLInputElement)?.value;
    if (!value.trim()) {
      setError(true);
      return;
    }
    setInputValue(value);
    setPage(1);
  }

  const handleLoadMore = () : void => {
    setPage((prevPage : number) => prevPage + 1);
  }

  return (
    <>
      <SearchBar formSub={formSub} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {results.length > 0 && <ImageGallery results={results} onImageClick={handleImageClick} />}
      {results.length > 0 && <LoadMoreBtn onClick={handleLoadMore} />}

      {selectedImage && (
        <CustomModal isOpen={!!selectedImage} onRequestClose={closeModal}>
          <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
          <p>{selectedImage.description}</p>
        </CustomModal>
      )}
    </>
  );
}

export default App;