import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Auth from "./components/Auth";
import Chat from "./components/Chat";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Auth />
      <Chat />
    </ApolloProvider>
  );
};

export default App;
