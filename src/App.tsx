import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  // Function to make an API call to the subgraph url
  const runQuery = async (q: string) => {
    try {
      const response = await axios.post(
        `https://gateway-arbitrum.network.thegraph.com/api/${process.env.REACT_APP_THE_GRAPH}/subgraphs/id/HUZDsRpEVP2AvzDCyzDHtdc64dyDxx8FQjzsmqSg4H3B`,
        { query: q }
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Query failed. Return code is ${response.status}. ${q}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // The Graph query - Query for current ETH price
  const query = `
    {
      bundles(first: 1) {
        ethPriceUSD
      }
    }
  `;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await runQuery(query);
        setEthPrice(result.data.bundles[0].ethPriceUSD);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        {/* TheGraphDashboard component */}
        <div>
                <h1>The Graph Dashboard</h1>
                {ethPrice !== null ? (
                  <div>
                    <div>Current ETH price is {ethPrice}</div>
                  </div>
                ) : (
                  <div>Loading...</div>
                )}
              </div>
      </header>

    </div>
  );
}

export default App;
