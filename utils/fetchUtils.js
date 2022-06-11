export async function unWrap(response) {
  const data = await response.json();
  const { ok, status, statusText } = response;

  return { data, ok, status, statusText };
}

export function getErrorResponse(error) {
  return { data: {}, ok: false, status: 500, statusText: error.message };
}
