"use client";

import SellDust from "./Actions/SellDust";

const DustAdminView = () => {
  return (
    <div className="h-full px-4 py-6 lg:px-8 ">
      <div className="border-none p-0 outline-none  h-full flex  flex-col  w-full">
        <div>
          <SellDust />
        </div>
      </div>
    </div>
  );
};

export default DustAdminView;
