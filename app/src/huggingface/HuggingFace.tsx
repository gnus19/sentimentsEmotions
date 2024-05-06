import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import Skeletons from '../components/Skeletons';
import { redirect, useNavigate } from 'react-router-dom';

function HuggingFace() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("sentiments");
    const [sentiments, setSentiments] = useState([]);
    const [emotions, setEmotions] = useState([]);
    const [loadingSentiments, setLoadingSentiments] = useState(true);
    const [loadingEmotions, setLoadingEmotions] = useState(true);

    const SENTIMENTS: { [key: string]: string } = {
        NEG: "Negative",
        NEU: "Neutral",
        POS: "Positive"
    }

    const changeActiveTab = (tab: string) => {
        setActiveTab(tab)
        if (tab === "sentiments") {
            fetchSentimets();
        } else {
            fetchEmotions();
        }
    }

    async function fetchSentimets() {
        if (sentiments?.length !== 0) return;
        try {
            const response = await (await fetch("http://localhost:8000/huggingface/sentiments/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })).json();
            if (response?.code === "token_not_valid") {
                alert("Session expired");
                navigate("/auth")
            }
            setSentiments(response.data);
            setLoadingSentiments(false);
        } catch (error: any) {
            navigate("/auth")
        }
    }
    async function fetchEmotions() {
        if (emotions?.length !== 0) return;
        try {
            const response = await (await fetch("http://localhost:8000/huggingface/emotions/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })).json();
            if (response?.code === "token_not_valid") {
                alert("Session expired");
                navigate("/auth")
            }
            setEmotions(response.data);
            setLoadingEmotions(false);
        } catch (error: any) {
            navigate("/auth")
        }
    }

    useEffect(() => {
        if (activeTab === "sentiments") {
            fetchSentimets();
        } else {
            fetchEmotions();
        }
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
                activeTab === "sentiments" && sentiments?.length > 0 &&
                (
                    sentiments?.map((sentiment: any) => {
                        return (
                            <div className="w-full mb-2 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{sentiment.text}</h5>
                                <div className="message-info flex text-blue-600">
                                    <div className="comments flex mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                        {sentiment.comments}
                                    </div>
                                    <div className="shares flex mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                        </svg>
                                        {sentiment.shares}
                                    </div>
                                    <div className="likes flex mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                        {sentiment.likes}
                                    </div>
                                    <div className="reactions flex mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                        {sentiment.reactions_count}
                                    </div>
                                </div>
                                <p className="font-normal text-gray-700 dark:text-gray-400">The sentiment in this message it's mostly: {SENTIMENTS[sentiment.result[0][0].label]}</p>
                            </div>
                        );
                    })
                )
            }
            {
                ((activeTab === "sentiments" && loadingSentiments ) ||
                (activeTab === "emotions" && loadingEmotions)) &&
                <Skeletons amount={3} />
            }
            {
                activeTab === "emotions" && emotions?.length > 0 &&
                (
                    emotions?.map((emotion: any) => {
                        return (
                            <div className="w-full mb-2 block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">{emotion.text}</h5>
                                <div className="message-info flex text-blue-600">
                                    <div className="comments flex mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                        {emotion.comments}
                                    </div>
                                    <div className="shares flex mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                                        </svg>
                                        {emotion.shares}
                                    </div>
                                    <div className="likes flex mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                        </svg>
                                        {emotion.likes}
                                    </div>
                                    <div className="reactions flex mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                                        </svg>
                                        {emotion.reactions_count}
                                    </div>
                                </div>
                                <p className="font-normal text-gray-700 dark:text-gray-400">The emotions in this message are:</p>
                                <ol className="list-disc marker:text-blue-600 ml-2">
                                {
                                    emotion?.result[0].map((item: any) => {
                                        return (
                                            <li>
                                                <p className="font-normal text-gray-700 dark:text-gray-400">{item.label}: {item.score.toFixed(2)}</p>
                                            </li>
                                        )
                                    })
                                }
                                </ol>
                            </div>
                        );
                    })
                )
            }
            </div>
            
        </>
    );
}

export default HuggingFace;