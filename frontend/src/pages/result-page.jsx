import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom";


export function Result({ address }) {
  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log("result", searchParams.get("latitude"), searchParams.get("longitude"))
  }, [])

  return (
    <div>
      {address}
      {searchParams.get("latitude")}
      {searchParams.get("longitude")}
    </div>
  );
}