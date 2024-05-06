import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Skeletons from '../components/Skeletons';

function HuggingFace() {
    const [activeTab, setActiveTab] = useState("sentiments");
    const [sentiments, setSentiments] = useState([]);
    const [emotions, setEmotions] = useState([]);
    const [loadingSentiments, setLoadingSentiments] = useState(false);
    const [loadingEmotions, setLoadingEmotions] = useState(false);

    const SENTIMENTS: { [key: string]: string } = {
        NEG: "Negative",
        NEU: "Neutral",
        POS: "Positive"
    }

    const changeActiveTab = (tab: string) => {
        setActiveTab(tab)
    }

    useEffect(() => {
        async function fetchSentimets() {
            try {
                const response = await (await fetch("http://localhost:8000/huggingface/sentiments/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })).json();
                console.log(response.data)
                setSentiments(response.data);
            } catch (error) {
                console.log("Error loading sentiments", error)
            }
        }
        async function fetchEmotions() {
            try {
                const response = await (await fetch("http://localhost:8000/huggingface/emotions/", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })).json();
                setEmotions(response.data);
            } catch (error) {
                console.log("Error loading emotions", error)
            }
        }
        fetchSentimets();
        fetchEmotions()
    }, [])

    return (
        <>
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 text-gray-400 dark:text-white dark:border-gray-700 dark:bg-gray-800">
                <ul className="flex flex-wrap -mb-px">
                    <li className="me-2 flex-1">
                        <a
                            onClick={() => changeActiveTab("sentiments")}
                            className={classNames([
                                "flex-1 inline-block p-4 rounded-t-lg border-b-2",
                                activeTab === "sentiments" ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            ])}
                        >
                            Sentiments
                        </a>
                    </li>
                    <li className="me-2 flex-1">
                        <a
                            onClick={() => changeActiveTab("emotions")}

                            className={classNames([
                                "flex-1 inline-block p-4 rounded-t-lg border-b-2",,
                                activeTab === "emotions" ? "text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500" : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                            ])}
                            aria-current="page"
                        >
                            Emotions
                        </a>
                    </li>
                </ul>
            </div>
            <div className="bg-slate-100 p-2.5 h-screen">
            {
                activeTab === "sentiments" && sentiments?.length > 0 ? 
                (
                    sentiments?.map((sentiment: any) => {
                        return (
                            <div className="w-full mb-2 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{sentiment.text}</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">The sentiment in this message it's mostly: {SENTIMENTS[sentiment.result[0][0].label]}</p>
                            </div>
                        );
                    })
                )
                :
                (
                    <Skeletons amount={3} />
                )
            }
            {
                activeTab === "emotions" && emotions?.length > 0 ? 
                (
                    emotions?.map((sentiment: any) => {
                        return (
                            <div className="w-full mb-2 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{sentiment.text}</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">The sentiment in this message it's mostly: {SENTIMENTS[sentiment.result[0][0].label]}</p>
                            </div>
                        );
                    })
                )
                :
                (
                    <Skeletons amount={3} />
                )
            }
            </div>
            
        </>
    );
}

export default HuggingFace;