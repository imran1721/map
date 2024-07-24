import { useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon, CloseFolderIcon, EyeCrossIcon, EyeIcon, LayersIcon, OpenFolderIcon } from "../assets/icons";
import { ResizableDiv } from "./ResizableDiv";
import { VISIBILITY_ENUM } from "../utils/constants";

const dummyList = ["list 1", "List 2", "List 3", "List 4", "List 5"];

export const LeftSideBar = ({ layers, handleLayerVisibility, setSelectedLayer, selectedLayer }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <ResizableDiv>
            <div className='text-white/80 h-[100%]'>
                <div className="h-[10%] flex py-2 items-center px-4 bg-black/100 rounded-md">
                    <img className="w-5 mr-2" src={LayersIcon} alt="Layer Icon" />
                    <span className="text-sm">Layers</span>
                </div>
                <div className="h-[90%] pb-8 p-2 overflow-auto">
                    <div className="my-3 flex items-center h-3 cursor-pointer" onClick={() => setIsExpanded((prev) => !prev)}>
                        <div className="flex mr-2">
                            <img className="h-3 mr-2" src={isExpanded ? ChevronDownIcon : ChevronLeftIcon} alt="Chevron Icon" />
                            <img className="h-3" src={isExpanded ? OpenFolderIcon : CloseFolderIcon} alt="Folder Icon" />
                        </div>
                        <div className="text-xs">Regions</div>
                    </div>
                    {isExpanded && (
                        <ul className="text-white/60 text-xs">
                            {layers.map((eachLayer) => (
                                <li
                                    className={`w-full px-4 flex cursor-pointer justify-between p-2 border-b mb-1 rounded hover:bg-blue-700/30 hover:border-gray-50/50 hover:border, ${selectedLayer.id === eachLayer.id && 'bg-blue-900 font-semibold text-white'}`}
                                    key={eachLayer.id}
                                    onClick={() =>
                                        setSelectedLayer((prev) => prev.id === eachLayer.id ? {} : eachLayer)
                                    }
                                >
                                    {eachLayer.name}
                                    <img
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleLayerVisibility(eachLayer.value)
                                        }}
                                        className="w-4"
                                        src={eachLayer.visibility === VISIBILITY_ENUM.VISIBLE ? EyeIcon : EyeCrossIcon}
                                        alt="Eye Icon"
                                    />
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* Dummy list to demonstrate resizable div */}
                    <div className="mb-3 mt-4 flex h-3 cursor-not-allowed">
                        <img className="mr-2" src={ChevronDownIcon} alt="Chevron Icon" />
                        <img className="mr-2" src={OpenFolderIcon} alt="Folder Icon" />
                        <span className="text-xs">Dummy</span>
                    </div>
                    <ul className="text-white/60 cursor-not-allowed text-xs">
                        {dummyList.map((eachLayer, index) => (
                            <li key={index} className="w-full px-4 flex justify-between p-2 border-b mb-1 rounded">
                                {eachLayer}
                                <img className="w-4" src={EyeCrossIcon} alt="Eye Icon" />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </ResizableDiv>
    );
};
