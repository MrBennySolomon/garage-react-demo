import React from "react";
import ServicesList from "../components/Services";

export default function Services() {
  return (
    <main>
      <section className="page-hero"><div className="container"><span className="eyebrow">שירותים</span><h1>שירותי המוסך</h1></div></section>
      <ServicesList />
    </main>
  );
}