const forecastActions = {
  updateData(data) {
    return {
      type: 'UPDATE_DATA',
      payload: data,
    };
  },
};

export default forecastActions;
