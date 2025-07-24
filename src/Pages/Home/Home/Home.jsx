import React from 'react';
import TrendingArticlesSlider from '../TrendingArticlesSlider/TrendingArticlesSlider';
import Publishers from '../Publishers/Publishers';
import Statistics from '../Statistics/Statistics';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider></TrendingArticlesSlider>
            <Publishers></Publishers>
            <Statistics></Statistics>
        </div>
    );
};

export default Home;