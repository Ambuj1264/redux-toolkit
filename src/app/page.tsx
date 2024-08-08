"use client";
import {
  decrement,
  increment,
  incrementByAmount,
} from "@/redux/slices/features/counterSlice";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import ThemeContext from "../components/ThemeSwither";

export default function Home() {
  const count = useSelector((state: any) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();
  const themeContext = useContext(ThemeContext);
  console.log(themeContext); // Access the themeContext;

  const { theme, toggleTheme }: any = themeContext;
  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(2))}>
        Increment by 2
      </button>
      <button onClick={() => dispatch(incrementByAmount(2))}>
        Increment by 2
      </button>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <p>Current theme: {theme}</p>
      <Link href="#" className="text-blue-500">
        home
      </Link>
    </>
  );
}
