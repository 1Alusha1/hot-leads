export async function getFetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl, {
      cache: "no-store", // For dynamic data
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}
