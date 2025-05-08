export default async (setState) => {
  const res = await fetch("https://get.geojs.io/v1/ip/country.json");

  const { country } = await res.json();

  if (setState) {
    return setState(country);
  }

  return country;
};
