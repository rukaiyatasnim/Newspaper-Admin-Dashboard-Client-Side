import React from 'react';
import TrendingArticlesSlider from '../TrendingArticlesSlider/TrendingArticlesSlider';
import Publishers from '../Publishers/Publishers';
import Statistics from '../Statistics/Statistics';
import Plans from '../Plans/Plans';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider></TrendingArticlesSlider>
            <Publishers></Publishers>
            <Statistics></Statistics>
            <Plans></Plans>
        </div>
    );
};

export default Home;