import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import Center from '../../component/Center';

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
      <Text>{data.message}</Text>
      <Text>{data.description}</Text>
    </Center>
  );
}
