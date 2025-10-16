function isWeekend(dayjs) {
    return (dayjs === 'Saturday' || dayjs === 'Sunday')
          ? 'its Weekend'
          : 'Its not a weekend';
}

export default isWeekend;