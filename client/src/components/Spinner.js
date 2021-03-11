import React from 'react';

export default function Spinner() {
  return (
    <div style={styles.spinner}>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <div style={styles.text}>Carregando...</div>
    </div>
  );
}

const styles = {
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '25px',
  },
  text: {
    padding: '25px',
  },
};
