import React from 'react';
import TrendingArticlesSlider from '../TrendingArticlesSlider/TrendingArticlesSlider';
import Statistics from '../Statistics/Statistics';
import TrendingArticles from '../../../Components/TrendingArticles/TrendingArticles';
import AllPublishers from '../../../Components/AllPublisher/AllPublisher';
import Plans from '../../../Components/Plans/Plans';
import SubscriptionModal from '../../../Components/SubscriptionModal/SubscriptionModal';

const Home = () => {
    return (
        <div>
            <TrendingArticles></TrendingArticles>
            <AllPublishers></AllPublishers>
            <Statistics></Statistics>
            <Plans></Plans>
            <SubscriptionModal></SubscriptionModal>
        </div>
    );
};

export default Home;