import { ChakraProvider } from '@chakra-ui/react'
import TeamsTable from './components/TeamsTable';
import Profile from './components/Profile'
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <main>
        <TeamsTable />
        <Profile />
      </main>
    </ChakraProvider>
  );
}

export default App;
