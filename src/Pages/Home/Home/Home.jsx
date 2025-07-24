import React from 'react';
import TrendingArticlesSlider from '../TrendingArticlesSlider/TrendingArticlesSlider';
import Publishers from '../Publishers/Publishers';
import Statistics from '../Statistics/Statistics';
import TrendingArticles from '../../../Components/TrendingArticles/TrendingArticles';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider></TrendingArticlesSlider>
            <TrendingArticles></TrendingArticles>
            <Publishers></Publishers>
            <Statistics></Statistics>
        </div>
    );
};

export default Home;