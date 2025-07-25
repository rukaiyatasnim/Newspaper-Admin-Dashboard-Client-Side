import React from 'react';
import TrendingArticlesSlider from '../TrendingArticlesSlider/TrendingArticlesSlider';
import Statistics from '../Statistics/Statistics';
import TrendingArticles from '../../../Components/TrendingArticles/TrendingArticles';
import AllPublishers from '../../../Components/AllPublisher/AllPublisher';
import Plans from '../../../Components/Plans/Plans';
import SubscriptionModal from '../../../Components/SubscriptionModal/SubscriptionModal';
import FeaturedAuthors from '../../../Components/FeaturedAuthors/FeaturedAuthors';
import UserTestimonials from '../../../Components/UserTestimonials/UserTestimonials';

const Home = () => {
    return (
        <div>
            <TrendingArticles></TrendingArticles>
            <AllPublishers></AllPublishers>
            <FeaturedAuthors></FeaturedAuthors>
            <Statistics></Statistics>
            <Plans></Plans>
            <UserTestimonials></UserTestimonials>
            <SubscriptionModal></SubscriptionModal>
        </div>
    );
};

export default Home;