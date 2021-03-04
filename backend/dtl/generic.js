function getResponseDto(data, reason, error) {
  const response = { success: true };

  if (reason) {
    response.success = false;
    response.reason = reason;
  }

  if (error) {
    response.success = false;
    response.error = {
      code: error.code,
      data: error.data,
    };
  }

  if (data) response.data = data;

  return response;
}

module.exports = {
  getResponseDto,
};
