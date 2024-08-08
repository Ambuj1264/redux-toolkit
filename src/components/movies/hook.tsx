async function getData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  const response = fetch(
    "https://jsonplaceholder.typicode.com/posts",
    options
  )
    .then((response) => response.json())
    .catch((err) => console.error(err));

  return response;
}

export default async function getMovies() {
  const data = await getData();
  return data;
}
