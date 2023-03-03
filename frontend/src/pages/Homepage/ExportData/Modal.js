
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
        position: 'fixed',
        top: 0 ,
        left: 100,
        width:  '100%',
        height: '100%' ,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex : 999,
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '4px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
      }}>
        
        {children}
       <div style={{ display:"flex" , flexDirection : "row" , justifyContent : "space-evenly"}}>
       <button style={{
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.2rem',
        color: '#333',
        cursor: 'pointer',
        marginBottom: '10px'
    }} onClick={onClose}>
      Close
    </button>
    <button style={{
        backgroundColor: 'transparent',
        border: 'none',
        fontSize: '1.2rem',
        color: '#333',
        cursor: 'pointer',
        marginBottom: '10px'
    }} 
    //onClick={onClose}
    >
      ok
    </button>
       </div>
      </div>
      
    </div>
  );
};

export default Modal;


  
  
  
  
  






