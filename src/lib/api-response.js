// Next.js standard API response format helpers
export function apiResponse(statusCode, statusStr, message, data = null, errors = null) {
  return Response.json(
    {
      timestamp: new Date().toISOString(),
      statusCode,
      status: statusStr,
      message,
      data,
      errors,
    },
    {
      status: statusCode,
    }
  );
}

export function apiOk(data, message = 'OK') {
  return apiResponse(200, 'OK', message, data);
}

export function apiCreated(message, data = null) {
  return apiResponse(201, 'CREATED', message, data);
}

export function apiBadRequest(message, errors = null) {
  return apiResponse(400, 'BAD_REQUEST', message, null, errors);
}

export function apiUnauthorized(message, errors = null) {
  return apiResponse(401, 'UNAUTHORIZED', message, null, errors);
}

export function apiNotFound(message, errors = null) {
  return apiResponse(404, 'NOT_FOUND', message, null, errors);
}

export function apiError(message, errors = null) {
  return apiResponse(500, 'INTERNAL_SERVER_ERROR', message, null, errors);
}
