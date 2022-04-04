import { useEffect, useState} from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import NFTBalance from "components/NFTBalance";
import NFTTokenIds from "components/NFTTokenIds";
import { Menu, Layout, Tabs} from "antd";
import SearchCollections from "components/SearchCollections";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Text from "antd/lib/typography/Text";
import NFTMarketTransactions from "components/NFTMarketTransactions";
import SubMenu from "antd/lib/menu/SubMenu";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Ramper from "components/Ramper";
import Wallet from "components/Wallet";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTCreateRinkeby from "components/NFTCreateRinkeby/NFTCreate";
import NFTCreatePolygon from "components/NFTCreatePolygon/NFTCreate";

const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();



  const [inputValue, setInputValue] = useState("explore");

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" ,background:"#D5F1C4"}}>
      <Router>
        <Header style={styles.header}>
          <LogoBalora />
          <SearchCollections setInputValue={setInputValue}/>
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              marginLeft: "50px",
              width: "100%",
            }}
            defaultSelectedKeys={["nftMarket"]}
          >
{/*             <SubMenu title="General" key="general">
              <Menu.Item key="/quickstart">
                <NavLink to="/quickstart">🚀 Quick Start</NavLink>
              </Menu.Item>
              <Menu.Item key="/wallet">
                <NavLink to="/wallet">👛 Wallet</NavLink>
              </Menu.Item>
              <Menu.Item key="/1inch">
                <NavLink to="/1inch">🏦 Dex</NavLink>
              </Menu.Item>
              <Menu.Item key="/onramp">
                <NavLink to="/onramp">💵 Fiat</NavLink>
              </Menu.Item>
              <Menu.Item key="/erc20balance">
                <NavLink to="/erc20balance">💰 Balances</NavLink>
              </Menu.Item>
              <Menu.Item key="/erc20transfers">
                <NavLink to="/erc20transfers">💸 Transfers</NavLink>
              </Menu.Item>
              <Menu.Item key="/contract">
                <NavLink to="/contract">📄 Contract</NavLink>
              </Menu.Item>
            </SubMenu> */}
            {/* <SubMenu title="NFT" key="nft"> */}

              <Menu.Item key="/NFTMarketPlace" onClick={() => setInputValue("explore")} >
                <NavLink to="/NFTMarketPlace" style={{color: "#00B050"}}>Explore</NavLink>
              </Menu.Item>
              <Menu.Item key="/nftBalance">
                <NavLink to="/nftBalance" style={{color: "#00B050"}}>Collection</NavLink>
              </Menu.Item>
              <Menu.Item key="transactions">
                <NavLink to="/transactions" style={{color: "#00B050"}}>Txn</NavLink>
              </Menu.Item>
              <SubMenu title="General" key="general">
                <Menu.Item key="/nftCreateRinkeby">
                  <NavLink to="/nftCreateRinkeby">Create NFT (Rinkeby)</NavLink>
                </Menu.Item>
                <Menu.Item key="/nftCreatePolygon">
                  <NavLink to="/nftCreatePolygon">Create  NFT (Polygon)</NavLink>
                </Menu.Item>
              </SubMenu> 
            {/* </SubMenu> */}
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            <Route exact path="/quickstart">
              <QuickStart isServerInfo={isServerInfo} />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <DEX chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <DEX chain="polygon" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/nftCreateRinkeby">
              <NFTCreateRinkeby />
            </Route>
            <Route path="/nftCreatePolygon">
              <NFTCreatePolygon />
            </Route>
            <Route path="/NFTMarketPlace">
              <NFTTokenIds inputValue={inputValue} setInputValue={setInputValue}/>
            </Route>
            <Route path="/transactions">
              <NFTMarketTransactions />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/quickstart" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
            <Route path="/">
              <Redirect to="/quickstart" />
            </Route>
          </Switch>
          <Redirect to="/NFTMarketPlace" />
        </div>
      </Router>
      <Footer style={{ textAlign: "center",background: "#D5F1C4" }}>
        <Text style={{ display: "block" }}>
        😻  Welcome!
        </Text>
      </Footer>
    </Layout>
  );
};

export const LogoBalora = () => (
  <div style={{ display: "flex" }}>
    <img src="./logo-your-logo.png" alt="logo" width="300" height="35"/>
  </div>
);

export default App;
