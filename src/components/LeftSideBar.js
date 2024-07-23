import { useState } from "react"
import { ChevronDownIcon, ChevronLeftIcon, CloseFolderIcon, EyeCrossIcon, EyeIcon, LayersIcon, OpenFolderIcon } from "../assets/icons"

const dummyList = ["list 1", "List 2", "List 3", "List 4", "List 5"]

export const LeftSideBar = ({ layers, handleLayerVisibility, setSelectedLayer }) => {
    const [isExpanded, setIsExpanded] = useState(true)

    return <div className='m-2 text-white/80 rounded-md w-64 border bg-black/90 fixed top-0'>
        <div className="flex py-2 items-center px-4 bg-black/100 h-8 overflow-none rounded-md">
            <img className="w-5 mr-2" src={LayersIcon} alt="Layer Icon" />
            <span className="text-sm">Layers</span>
        </div>
        <div className="pb-8 p-2 overflow-auto resize-y">

            <div className="my-3 flex h-3 cursor-pointer" onClick={() => setIsExpanded((prev) => !prev)}>
                <img className="mr-2" src={isExpanded ? ChevronDownIcon : ChevronLeftIcon} alt="Chevron Icon" />
                <img className="mr-2" src={isExpanded ? OpenFolderIcon : CloseFolderIcon} alt="Folder Icon" />
                <span className="text-xs">Regions</span>
            </div>
            {isExpanded && (<ul className="text-white/60 text-xs">
                {layers.map((eachLayer) =>
                    <li className="w-full px-4 flex cursor-pointer justify-between p-2 border-b mb-1 rounded hover:bg-gray-900 hover:border-gray-50/50 hover:border" key={eachLayer.id}
                    onClick={ () => setSelectedLayer(eachLayer)}>{eachLayer.name}
                        <img onClick={() => handleLayerVisibility(eachLayer.value)} className="w-4" src={eachLayer.visibility === "visible" ? EyeIcon : EyeCrossIcon} alt="Eye Icon" />
                    </li>)}
            </ul>)}

            {/*Dummy list to demonstrate resizable div*/}
            <div className="mb-3 mt-4 flex h-3 cursor-not-allowed">
                <img className="mr-2" src={ChevronDownIcon} alt="Chevron Icon" />
                <img className="mr-2" src={OpenFolderIcon} alt="Folder Icon" />
                <span className="text-xs">Dummy</span>
            </div>
            <ul className="text-white/60 cursor-not-allowed text-xs">
                {dummyList.map((eachLayer) =>
                    <li className="w-full px-4 flex justify-between p-2 border-b mb-1 rounded">
                        {eachLayer}
                        <img className="w-4" src={EyeCrossIcon} alt="Eye Icon" />
                    </li>)}
            </ul>
        </div>
    </div>
}   