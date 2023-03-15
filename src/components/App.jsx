import React, { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from './Loader/Loader';
import { getImages } from "components/Utils/Pixabay";
import { Button } from "./Button/Button";
import { NoImagesMessage } from './NoImagesMessage/NoImagesMessage';
import { StupidImageGallery } from "./ImageGallery/StupidImageGallery";
import { nanoid } from 'nanoid'

export function App() {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [error, setError] = useState(false);
  const [reqID, setReqID] = useState(0);
  
  
  const searchFormSubmit = request => {
    setReqID(nanoid());
    setPage(1);
    setImages([]);
    setRequest(request);
  }

  useEffect(() => {
    async function load() {
      setLoading(true);
      const newImg = await getImages(request, page);
      setLoadMore(page * 12 < newImg.totalHits);
      setError(newImg.totalHits === 0);
      setImages(img => [...img, ...newImg.hits])
      setLoading(false);
    }
    if(request !== '') load();
  }, [request, page, reqID])

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }, [images])

  return (
    <div className="App">
      <Searchbar onSubmit={searchFormSubmit} />
      <StupidImageGallery images={images} />
      {loading && <Loader />}
      {error && <NoImagesMessage request={request} />}
      {loadMore && <Button onClick={() => setPage(p => p+1)}/>}
    </div>
  );
}