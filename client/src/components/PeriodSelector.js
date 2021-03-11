import React from 'react';
export default function PeriodSelector({
  allPeriods,
  currentPeriod,
  onChangePeriod,
}) {
  const handleSelectChange = (event) => {
    onChangePeriod(event.target.value);
  };

  return (
    <div style={styles.select}>
      <select
        className="browser-default"
        value={currentPeriod}
        onChange={handleSelectChange}
      >
        {allPeriods.map((period) => {
          return <option key={period}>{period}</option>;
        })}
      </select>
    </div>
  );
}

const styles = {
  select: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  },
};
