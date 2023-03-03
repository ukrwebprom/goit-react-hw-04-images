import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from "prop-types";

export const StupidImageGallery = ({images}) => {
    return (
        <ul className="ImageGallery">
              {images.map(({id, webformatURL, tags, largeImageURL}) =>
              <li className="ImageGalleryItem" key={id}> 
              <ImageGalleryItem image={webformatURL} alt={tags} largeImage={largeImageURL} />  
              </li>)}
        </ul>
    )
}

StupidImageGallery.propTypes = {
    images:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.number, 
            webformatURL:PropTypes.string, 
            tags:PropTypes.string, 
            largeImageURL:PropTypes.string,
        })
        ).isRequired,
}