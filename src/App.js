import { ChakraProvider } from '@chakra-ui/react'
import TeamsTable from './components/TeamsTable';
import './App.css';

function App() {
  return (
    <ChakraProvider>
      <main>
        <TeamsTable />
      </main>
    </ChakraProvider>
  );
}

export default App;
