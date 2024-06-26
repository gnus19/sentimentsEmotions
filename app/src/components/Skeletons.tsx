import React from "react";

function Skeletons({ amount }: { amount: number }) {
    let skeletons = []
    for (let index = 0; index < amount; index++) {
        skeletons.push(
            <div key={`skeleton-${index}`} className="border mb-2 border-blue-300 shadow rounded-md p-4 w-full mx-auto">
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-700 rounded"></div>
                    </div>
                    </div>
                </div>
            </div>
        ) 
    }
    return (
        <>
            {skeletons}
        </>
    )
}

export default Skeletons;