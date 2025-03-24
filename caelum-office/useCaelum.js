import { useState } from 'react';
import axios from 'axios';

const useCaelum = () => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/caelum', { message });
      setResponse(res.data.reply);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error communicating with Caelum.');
    }
    setLoading(false);
  };

  return { response, sendMessage, loading };
};

export default useCaelum;
