import React from 'react';
import StatCard from './StatCard';

function StatsOverview({ completedClimbs }) {
  // Stats calculation helpers
  const calculateStats = () => {
    if (!completedClimbs || completedClimbs.length === 0) {
      return {
        total: 0,
        thisMonth: 0,
        thisWeek: 0,
        flashPercentage: 0
      };
    }
    
    const now = new Date();
    const thisMonth = completedClimbs.filter(climb => {
      const climbDate = new Date(climb.date);
      return climbDate.getMonth() === now.getMonth() && 
             climbDate.getFullYear() === now.getFullYear();
    }).length;
    
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    
    const thisWeek = completedClimbs.filter(climb => {
      const climbDate = new Date(climb.date);
      return climbDate >= startOfWeek;
    }).length;
    
    const flashCount = completedClimbs.filter(climb => climb.flash).length;
    const flashPercentage = Math.round((flashCount / completedClimbs.length) * 100);
    
    return {
      total: completedClimbs.length,
      thisMonth,
      thisWeek,
      flashPercentage
    };
  };
  
  const stats = calculateStats();

  return (
    <section className="stats-overview">
      <h2>Your Climbing Stats</h2>
      <div className="stats-grid">
        <StatCard value={stats.total} label="Total Climbs" />
        <StatCard value={stats.thisMonth} label="This Month" />
        <StatCard value={stats.thisWeek} label="This Week" />
        <StatCard value={`${stats.flashPercentage}%`} label="Flash Rate" />
      </div>
    </section>
  );
}

export default StatsOverview;