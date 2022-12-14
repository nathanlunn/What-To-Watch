import React, {useEffect, useState} from 'react';
import '../styles/AnimeChoice.css';

export default function AnimeChoice({state, setState, anime}) {
  const [fullSynopsis, setFullSynopsis] = useState(false);

  useEffect(() => {
    setFullSynopsis(false);
  }, [anime])

  let shortSynopsis;

  if(state.leftSideOption.attributes && state.rightSideOption.attributes) {
    shortSynopsis = anime.attributes.synopsis.slice(0, 300) + '...';
  }

  const choice = () => {
    if (state.numberOfRounds - state.round === 1) {
      setState(prev => ({...prev, winner: anime, round: 0, numberOfRounds: 5, replace: ''}));
      console.log('winner');
    }
    if (anime.attributes.canonicalTitle === state.leftSideOption.attributes.canonicalTitle) {
      setState(prev => ({...prev, replace: 'right'}));
      return;
    }
    setState(prev => ({...prev, replace: 'left'}));
  }

  return (
    <div>
      {(state.leftSideOption.attributes && state.rightSideOption.attributes) && (
        <>
          {fullSynopsis ? (
            <div className='animeChoice animeChoice__fullSynopsisContainer'>
              <button
                className='home__button animeChoice__button--back'
                onClick={() => {setFullSynopsis(false)}}
              >BACK</button>
              {anime.attributes.synopsis}
            </div>
          ) : (
            <div className='animeChoice' onClick={choice}>
              <div className='animeChoice__upperContainer'>
                <img 
                  className='animeChoice__image'
                  src={anime.attributes.posterImage.small}
                />
                <div className='animeChoice__basicInfo'>
                  <div className='animeChoice__infoBlock'>
                    <h4 className='animeChoice__category'>Title:</h4>
                    <h4 className='animeChoice__info'>{anime.attributes.canonicalTitle}</h4>
                  </div>
                  <div className='animeChoice__infoBlock'>
                    <h4 className='animeChoice__category'>Age Rating:</h4>
                    <h4 className='animeChoice__info'>{anime.attributes.ageRating}</h4>
                  </div>
                  <div className='animeChoice__infoBlock'>
                    <h4 className='animeChoice__category'>Start Date:</h4>
                    <h4 className='animeChoice__info'>{anime.attributes.startDate}</h4>
                  </div>
                  <div className='animeChoice__infoBlock'>
                    <h4 className='animeChoice__category'>Episodes:</h4>
                    <h4 className='animeChoice__info'>{anime.attributes.episodeCount}</h4>
                  </div>
                </div>
              </div>
              <div className='animeChoice__synopsis'>
                <h4 className='animeChoice__category'>Synopsis:</h4>
                <h4 className='animeChoice__info'>
                  {shortSynopsis}<button 
                    className='home__button animeChoice__button--readMore'
                    onClick={(e) => {
                      e.stopPropagation();
                      setFullSynopsis(true);
                    }}
                  >Read More</button>
                </h4>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
