import React from "react";
import { Header } from "../Header/Header";
import { StatsSection } from "./StatsSection";
import { MainContent } from "./MainContent";

export const Dashboard: React.FC = () => {
  return (
    <div className="shell reveal">
      <Header />
      <div className="content">
        <StatsSection />
        <MainContent />
      </div>
    </div>
  );
};
