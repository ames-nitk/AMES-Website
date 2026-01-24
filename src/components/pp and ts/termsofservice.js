import React, { useEffect } from 'react';

const TermsOfService = () => {
  // Ensures the page starts at the top when navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styles = {
    container: {
      padding: '100px 20px 40px 20px',
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif',
      lineHeight: '1.6',
      color: '#dedede',
      minHeight: '100vh',
    },
    heading: {
      color: '#f7842b',
      borderBottom: '2px solid #f7842b',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    sectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      marginTop: '25px',
      marginBottom: '10px',
    },
    text: {
      marginBottom: '15px',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Terms of Service</h1>
      <p style={styles.text}><strong>Last Updated:</strong> January 22, 2026</p>

      <p style={styles.text}>
        By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, 
        and agree that you are responsible for compliance with any applicable local laws.
      </p>

      <h2 style={styles.sectionTitle}>1. Use License</h2>
      <p style={styles.text}>
        Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, 
        non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
      </p>

      <h2 style={styles.sectionTitle}>2. Disclaimer</h2>
      <p style={styles.text}>
        The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, 
        and hereby disclaim and negate all other warranties including, without limitation, implied warranties or 
        conditions of merchantability or fitness for a particular purpose.
      </p>

      <h2 style={styles.sectionTitle}>3. Limitations</h2>
      <p style={styles.text}>
        In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for 
        loss of data or profit, or due to business interruption) arising out of the use or inability to use the 
        materials on our website.
      </p>

      <h2 style={styles.sectionTitle}>4. Accuracy of Materials</h2>
      <p style={styles.text}>
        The materials appearing on our website could include technical, typographical, or photographic errors. 
        We do not warrant that any of the materials on its website are accurate, complete or current.
      </p>

      <h2 style={styles.sectionTitle}>5. Governing Law</h2>
      <p style={styles.text}>
        These terms and conditions are governed by and construed in accordance with the laws and you irrevocably 
        submit to the exclusive jurisdiction of the courts in that State or location.
      </p>
    </div>
  );
};

export default TermsOfService;