import React from 'react';
import TrendingArticlesSlider from '../TrendingArticlesSlider/TrendingArticlesSlider';
import Statistics from '../Statistics/Statistics';
import TrendingArticles from '../../../Components/TrendingArticles/TrendingArticles';
import AllPublishers from '../../../Components/AllPublisher/AllPublisher';
import Plans from '../../../Components/Plans/Plans';

const Home = () => {
    return (
        <div>
            <TrendingArticlesSlider></TrendingArticlesSlider>
            <TrendingArticles></TrendingArticles>
            <AllPublishers></AllPublishers>
            <Statistics></Statistics>
            <Plans></Plans>
        </div>
    );
};

export default Home;