import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import ConvertCurrency from "./components/ConvertCurrency";

const App = () => {
  const cueryClient = new QueryClient();
  return (
    <QueryClientProvider client={cueryClient}>
      <div className="w-screen h-screen bg-black">
        <ConvertCurrency />
      </div>
    </QueryClientProvider>
  );
};

export default App;
