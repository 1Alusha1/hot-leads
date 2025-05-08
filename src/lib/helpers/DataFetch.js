export async function getFetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl, {
      cache: "no-store", // For dynamic data
      mode: "no-cors",
    });

    console.log(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}
