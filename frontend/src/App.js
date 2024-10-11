import React, { useState, useMemo } from 'react';
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import Orb from './Components/Orb/Orb';
import Navigation from './Components/Navigation/Navigation';
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income';
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import Claims from './Components/Claims/Claims';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Payment from './Components/Payment/Payment';
import SplitExpense from './Components/Split/SplitExpense';
import BillPayments from './Components/BillPayment/BillPayment';

function App() {
  const [active, setActive] = useState(1);
  const global = useGlobalContext();
  console.log(global);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <Router>
      <AppStyled bg={bg} className="App">
        {orbMemo}
        <MainLayout>
          <Navigation active={active} setActive={setActive} />
          <main>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expenses" element={<Expenses />} />
              <Route path="/claims" element={<Claims />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/expensesplit" element={<SplitExpense />} />
              <Route path="/viewrequests" element={<BillPayments />} />
              {/* Add other routes as necessary */}
            </Routes>
          </main>
        </MainLayout>
      </AppStyled>
    </Router>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
