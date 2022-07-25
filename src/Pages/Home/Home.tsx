import React from 'react';
import Bookmark from '../../Components/Bookmark/Bookmark';

const Home: React.FC = () => {
  return (
    <div className="home container">
      <div className="grid">
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
        <Bookmark />
      </div>
    </div>
  );
};

export default Home;
