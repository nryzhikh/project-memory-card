import React, { Component } from 'react';
import DataContext from './DataContext';
import { createProdia } from "prodia";
import LoadingScreen from './LoadingScreen';

const STORAGE_KEY = 'wordImagesData';

function saveToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getFromLocalStorage() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
}

class DataProvider extends Component {
  state = {
    words: [],
    images: {},
    isLoading: true,
    loadedItems: 0,
    totalItems: 0,
  };


  componentDidMount() {
    const storedData = getFromLocalStorage();
    if (storedData) {
      // Data exists in localStorage
      this.setState({ 
        words: storedData.words,
        images: storedData.images,
        isLoading: false
      });
    } else {
      // No data in localStorage, fetch from API
      this.fetchWords();
    }
  }


  fetchWords() {
    fetch('https://random-word-api.herokuapp.com/word?number=10')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
             words: data,
             totalItems: data.length
             });
        Promise.all(data.map(this.fetchImageForWord)).then(() => {
            this.setState({ isLoading: false });
          });
      });
  }

  fetchImageForWord = async (word) => {
    const prodia = createProdia({ apiKey: "c0c07f71-a048-440a-b912-e0cd0320c18d", });

    try { const job = await prodia.generate({ prompt: word, });
            const { imageUrl: fetchedImageUrl, status } = await prodia.wait(job);
            if (status === 'succeeded') {
            this.setState((prevState) => ({
                 images: {...prevState.images, [word]: fetchedImageUrl},
                 loadedItems: prevState.loadedItems + 1
                })
                , () => {
                    // Save the new state to localStorage after it's been updated
                    const { isLoading, loadedItems, totalItems, ...dataToStore } = this.state;
                    saveToLocalStorage(dataToStore);
                  }
                );
            } else {
                console.error("Image generation failed", status)
            }
    } catch (err) {
        console.log(err);
    }
}

  render() {
    const { isLoading, loadedItems, totalItems, ...data } = this.state;
    const loadingPercentage = loadedItems ? Math.floor((loadedItems / totalItems) * 100) : 0;

    return (
      <DataContext.Provider value={data}>
        {isLoading ? <LoadingScreen percentage={loadingPercentage} /> : this.props.children}
      </DataContext.Provider>
    );
}
}

export default DataProvider;

