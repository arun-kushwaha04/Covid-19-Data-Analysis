import React, { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
  'https://api.covid19india.org/csv/latest/state_wise.csv';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = d => {
      d.Active = +d.Active;
      d.Confirmed = +d.Confirmed;
      d.Deaths = +d.Deaths;
      d.Recovered = +d.Recovered;
      d.Delta_Confirmed = +d.Delta_Confirmed;
      d.Delta_Deaths = +d.Delta_Deaths;
      d.Delta_Recovered = +d.Delta_Recovered;      
      d.Migrated_Other = +d.Migrated_Other;      
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);

  
  return data;
};