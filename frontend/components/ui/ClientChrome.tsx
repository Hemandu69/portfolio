"use client";

import { useEffect, useState } from "react";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";
import CustomCursor from "@/components/cursor/CustomCursor";

export default function ClientChrome() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log(
      "%cyou opened devtools. respect.\n%cthis seemed like a good idea at 2:13am.",
      "font-family:monospace;color:#a99cc2;font-size:12px;",
      "font-family:monospace;color:#9a938c;font-size:11px;"
    );
  }, []);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      {loaded && <SmoothScroll />}
      <CustomCursor />
    </>
  );
}
