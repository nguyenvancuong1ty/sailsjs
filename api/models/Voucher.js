module.exports = {
    attributes: {
      id: { type: 'number', autoIncrement: true },
      code: { type: 'string', required: true },
      date: { type: 'string', required: false },
      detail: { type: 'string', required: false },
      requirement: { type: 'string', required: false }
    },
  };
  
  