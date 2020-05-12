import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ErrorBoundary from 'react-native-error-boundary';

export default function App() {
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
    <ErrorBoundary>
      <View style={styles.container}>
        <Text>{data.message}</Text>
        <Text>{data.description}</Text>
      </View>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
