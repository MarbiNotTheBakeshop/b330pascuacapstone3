import { useState, useEffect } from 'react';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
      if(newPassword.length === 0 || confirmPassword === 0){
        setIsDisabled(true);
      }else{
        setIsDisabled(false);
      }

  }, [confirmPassword, newPassword])


  const handleResetPassword = async () => {
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    const token = localStorage.getItem("token"); // Replace with your actual JWT token

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        setMessage('Password reset successful.');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div className="container">
      <h2>Reset Password</h2>
      <div className="form-group">
        <label>New Password:</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Confirm Password:</label>
        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {message && <div className="alert alert-info">{message}</div>}
      <button className="btn btn-primary" disabled = {isDisabled} onClick={handleResetPassword}>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;