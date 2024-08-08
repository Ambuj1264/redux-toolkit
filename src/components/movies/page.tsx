"use client";
import { useQuery } from "@tanstack/react-query";
import getMovies from "./hook";

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getMovies(),
    queryKey: ["movies"],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Sorry There was an Error</div>;
  return (
    <div className="container mx-auto">
      <h1 className="p-5 box-decoration-slice bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-center font-bold text-4xl">
        Query
      </h1>
      <div className="grid grid-cols-4 gap-4 p-10"></div>
    </div>
  );
}
