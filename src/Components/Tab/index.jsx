import React from "react";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../../Reducers/TabReducer";


const index = ({ children, tabs }) => {

  const dispatch = useDispatch()
  const activeTab = useSelector((state) => state.tab.activeTab)


  return (
    <>
      <div className="w-full hidden md:flex items-center justify-start gap-2">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            className="flex items-center justify-start gap-2"
            onClick={() => dispatch(setActiveTab(tab.name))}
            variant={activeTab === tab.name ? "primary" : "ghost"}
          >
            <tab.icon />
            <span>{tab.name}</span>
          </Button>
        ))}
        {children}
      </div>
      <div className="w-full flex md:hidden items-center justify-start gap-2">
        <select className="w-full border border-indigo-500 rounded-md p-2" onChange={(e) => dispatch(setActiveTab(e.target.value))}>
          {tabs.map((tab, index) => (
            <option 
            key={index} 
            value={tab.name}
            >
              {tab.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default index;
