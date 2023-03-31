import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";

export function Result() {
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log("result", searchParams.get("query"))
  }, [])

  return (
    <div>
      {searchParams.get("query")}
    </div>
  );
}