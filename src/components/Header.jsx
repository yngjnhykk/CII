import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

function Header() {

  const navigate = useNavigate()
  return (
    <Wrap>
      <div style={{fontSize: 32}}>
        <button onClick={() => {
          navigate('/')
        }}>CII
        </button>
      </div>
      <div style={{display: "flex", gap: 50, fontSize: 20}}>
        <div>선박 관리</div>
        <div><button onClick={()=>{navigate('/simulator')}}>시뮬레이터</button></div>
      </div>
    </Wrap>
  );
}

export default Header;

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #0c1427;
  color: white;
  height: 70px;
  padding: 0px 120px;
`;
