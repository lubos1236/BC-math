import { useEffect, useState } from 'react';
import MarkdownComponent from "./MarkdownComponent.tsx";

export default function Navod() {
    const [text, setText] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/Navod.md')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.text();
            })
            .then((text) => setText(text))
            .catch((err) => {
                console.error('Fetch failed:', err);
                setError('Nepodarilo sa načítať súbor.');
            });
    }, []);

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">

            <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-4 rounded overflow-auto whitespace-pre-wrap">
        {text}
      </pre>


            <MarkdownComponent markDown={text}/>
        </div>
    );
}
