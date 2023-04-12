module.exports = {
    attributes: {
      id: { type: 'number', autoIncrement: true },
      user_id: { type: 'number', required: true },
      cake_id: { type: 'number', required: true },
      vote_status: { type: 'string', required: true },
      voted: { type: 'boolean', required: true },
      date_vote: { type: 'string', required: false },
    },
  };
  
  