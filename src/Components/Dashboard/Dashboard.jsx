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

    // Prepare dynamic PieChart data with publisher and their article counts (percentages handled by Google Charts automatically)
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

    // Static Bar Chart data - example monthly submitted vs approved articles
    const barData = [
        ['Month', 'Articles Submitted', 'Articles Approved'],
        ['Jan', 10, 7],
        ['Feb', 15, 12],
        ['Mar', 12, 10],
        ['Apr', 18, 15],
    ];

    // Static Line Chart data - example daily views
    const lineData = [
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

            {/* Dynamic Pie Chart */}
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
                        chartArea: { width: '80%', height: '80%' },
                        legend: { position: 'right', textStyle: { fontSize: 14 } },
                    }}
                />
            </div>

            {/* Static Bar Chart */}
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
                        legend: { position: 'bottom' },
                    }}
                />
            </div>

            {/* Static Line Chart */}
            <div className="bg-white border-l-4 border-green-500 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-green-600 mb-4">Weekly Views</h2>
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="300px"
                    data={lineData}
                    options={{
                        title: 'Views This Week',
                        hAxis: { title: 'Day' },
                        vAxis: { title: 'Views' },
                        colors: ['#22c55e'],
                        backgroundColor: '#fff',
                        legend: { position: 'none' },
                        curveType: 'function', // smooth line
                    }}
                />
            </div>
        </div>
    );
};

export default Dashboard;
