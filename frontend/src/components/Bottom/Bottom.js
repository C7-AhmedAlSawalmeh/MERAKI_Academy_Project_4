import React from 'react'
import "./Bottom.css"

const Bottom = () => {
  return (
    <footer style={{ backgroundColor: 'black', color: '#fff', padding: '20px 0' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
            <p>Syetem depveloper for companies</p>
          </div>
          <div className="col-md-6" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h4>Contact Us</h4>
            <p>Jordan-Ibrid-Hakama</p>
            <p>+962795218568</p>
            <p>sawalmeh.ahmed@gmail.com</p>
          </div>
        </div>
        <hr style={{ borderColor: '#fff', width: '100%' }} />
        <div className="row" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <div className="col-md-12" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <p style={{ textAlign: 'center', fontSize: '14px' }}>Copyright &copy; 2023</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Bottom