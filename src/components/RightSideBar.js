const TYPES = {
    "number": "123",
    "string": "abc"
}

export const RightSideBar = ({ selectedLayer }) => {
    const { name, data } = selectedLayer
    const feature = data.features[0]
    const geometry = feature.geometry.type
    const properties = feature.properties

    const attributes = Object.keys(properties).map((each) => {
        return {
            key: each,
            type: typeof properties[each]
        }
    })

    return <div className='mt-28 mx-2 text-white/80 rounded-md w-72 border border-black/50 bg-black/90 fixed top-0 right-0 shadow-2xl'>
        <div className="mb-4 flex flex-col items-start py-2 px-4 bg-black/100 h-8 overflow-none rounded-md">
            <span className="text-xs mb-1">{geometry}</span>
            <span className="text-white text-base font-semibold">{name}</span>
        </div>
        <div className="px-4 py-4">
            {attributes.map(({ key, type }) =>
                <div key={key} className="flex items-center my-1">
                    <span className="text-xs mr-2">{TYPES[type]}</span>
                    <p className="text-base text-white/90 capitalize">{key}</p>
                </div>
            )}
        </div>
    </div>
}