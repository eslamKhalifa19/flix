import { Button, Typography } from "antd";
import "./App.css";

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <Title type="primary">FLIX</Title>
      <Button type="danger" size="large">
        Flix
      </Button>
    </div>
  );
}

export default App;
