import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';

const Dashboard = () => {
    const [articleData, setArticleData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5000/allArticles')
            .then((res) => setArticleData(res.data))
            .catch((err) => console.error('Error fetching articles', err));
    }, []);

    const pieChartData = () => {
        const countByPublisher = {};
        articleData.forEach(article => {
            const publisher = article.publisherName || "Unknown";
            countByPublisher[publisher] = (countByPublisher[publisher] || 0) + 1;
        });

        const chartArray = [['Publisher', 'Articles']];
        for (const publisher in countByPublisher) {
            chartArray.push([publisher, countByPublisher[publisher]]);
        }
        return chartArray;
    };

    const barData = [
        ['Month', 'Articles Submitted', 'Articles Approved'],
        ['Jan', 10, 7],
        ['Feb', 15, 12],
        ['Mar', 12, 10],
        ['Apr', 18, 15],
    ];

    const areaData = [
        ['Day', 'Views'],
        ['Mon', 100],
        ['Tue', 120],
        ['Wed', 180],
        ['Thu', 150],
        ['Fri', 200],
        ['Sat', 250],
        ['Sun', 220],
    ];

    return (
        <div className="p-8 space-y-12 bg-green-50 min-h-full rounded-lg shadow-md">
            <h1 className="text-4xl font-bold text-green-700">📊 Analytics Overview</h1>

            {/* Pie Chart */}
            <div className="bg-white border-l-4 border-green-500 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">Articles by Publisher</h2>
                <Chart
                    chartType="PieChart"
                    width="100%"
                    height="300px"
                    data={pieChartData()}
                    options={{
                        pieHole: 0.4,
                        is3D: false,
                        colors: ['#4ade80', '#86efac', '#22c55e', '#16a34a', '#15803d'],
                    }}
                />
            </div>

            {/* Bar Chart */}
            <div className="bg-white border-l-4 border-green-500 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">Monthly Submission vs Approval</h2>
                <Chart
                    chartType="Bar"
                    width="100%"
                    height="300px"
                    data={barData}
                    options={{
                        chart: { title: 'Monthly Stats', subtitle: 'Articles Submitted vs Approved' },
                        colors: ['#34d399', '#10b981'],
                    }}
                />
            </div>

            {/* Area Chart */}
            <div className="bg-white border-l-4 border-green-500 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">Weekly Views</h2>
                <Chart
                    chartType="AreaChart"
                    width="100%"
                    height="300px"
                    data={areaData}
                    options={{
                        title: 'Views This Week',
                        hAxis: { title: 'Day' },
                        vAxis: { title: 'Views' },
                        legend: 'none',
                        colors: ['#22c55e'],
                        backgroundColor: '#fff',
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
