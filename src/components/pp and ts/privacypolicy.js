import React from 'react';

const PrivacyPolicy = () => {
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
      <h1 style={styles.heading}>Privacy Policy</h1>
      <p style={styles.text}><strong>Effective Date:</strong> January 22, 2026</p>

      <p style={styles.text}>
        Your privacy is important to us. It is our policy to respect your privacy regarding any information 
        we may collect from you across our website and other platforms we own and operate.
      </p>

      <h2 style={styles.sectionTitle}>1. Information We Collect</h2>
      <p style={styles.text}>
        We only ask for personal information when we truly need it to provide a service to you. 
        We collect it by fair and lawful means, with your knowledge and consent. This may include 
        your name, email address, and technical data regarding your interaction with our site.
      </p>

      <h2 style={styles.sectionTitle}>2. Use of Data</h2>
      <p style={styles.text}>
        The collected information is used to provide, maintain, and improve our services. 
        We do not share any personally identifying information publicly or with third-parties, 
        except when required by law.
      </p>

      <h2 style={styles.sectionTitle}>3. Data Retention</h2>
      <p style={styles.text}>
        We only retain collected information for as long as necessary to provide you with your 
        requested service. What data we store, we’ll protect within commercially acceptable 
        means to prevent loss and theft.
      </p>

      <h2 style={styles.sectionTitle}>4. Cookies</h2>
      <p style={styles.text}>
        We use cookies to understand how you use our site and to improve your experience. 
        You can choose to disable cookies through your individual browser settings.
      </p>

    </div>
  );
};

export default PrivacyPolicy;