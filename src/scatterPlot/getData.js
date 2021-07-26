import { useState, useEffect } from "react";

const jsonUrl = "https://api.covid19india.org/data.json";

const getData = async () => {
  const res = await fetch(jsonUrl);
  const data = await res.json();
  // console.log(data);
  return data;
};

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData().then((data) => {
      const temp = data.cases_time_series.map((d) => {
        d.totalconfirmed = +d.totalconfirmed;
        // d.dateymd = new Date(d.dateymd);
        return d;
      });
      setData(temp);
    });
  }, []);
  // console.log(data);
  return data;
};
