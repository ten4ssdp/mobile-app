import React, { useState, useEffect } from 'react';

import Center from '../../component/Center';
import Bold from '../../component/Font/Bold';
import Light from '../../component/Font/Light';

export default function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function getData() {
      const res = await fetch('http://15.188.3.249:5000/api/');
      const data = await res.json();
      setData(data);
    }
    getData();
  }, []);

  return (
    <Center>
      <Bold>{data.message}</Bold>
      <Light>{data.description}</Light>
    </Center>
  );
}
