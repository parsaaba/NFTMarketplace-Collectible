import React from "react";
import "./App.css";
import "./index.css";
import { Symfoni } from "./hardhat/SymfoniContext";
import { NFTMarketplace } from "./components/NFTMarketplace";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Symfoni autoInit={true}>
          <span>
            <h1>
              <img src={"nft.jpeg"} className="App-logo" alt="logo" />
              {`Welcome to Ankur's NFT Marketplace!`}
              <img src={"nft.jpeg"} className="App-logo" alt="logo" />
            </h1>
          </span>
          <NFTMarketplace></NFTMarketplace>
        </Symfoni>
      </header>
    </div>
  );
}

export default App;
