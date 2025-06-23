import { createChat } from '@n8n/chat';

import React, { useEffect } from 'react';

const MitraBot = () => {
  useEffect(() => {
   createChat({
  webhookUrl: 'https://dnyaneshlohar75.app.n8n.cloud/webhook-test/58b39116-7151-498d-ae43-d67491f03acc',
 
});


  }, []);
 
 return (<div></div>);
};

export default MitraBot;
