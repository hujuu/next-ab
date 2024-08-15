'use client'

import { useState, useCallback, useRef } from "react";

export function ShuffleMemberForm() {
    const [result, setResult] = useState([] as string[]);
    const firstRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);
    const thirdRef = useRef<HTMLInputElement>(null);
    const [members, setMembers] = useState<string[]>([]);
    const [member, setMember] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const addMember = useCallback(() => {
        setMembers([...members, member]);
        setMember("");
        inputRef.current?.focus();
    }, [members, member]);

    const callApi = useCallback(async () => {
        const members = [] as string[];
        const refs = [firstRef, secondRef, thirdRef];
        for (const r of refs) {
            if (r.current?.value) {
                members.push(r.current.value);
            }
        }
        const res = await fetch("/api/shuffle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ members }),
        });
        if (res.ok) {
            const result = await res.json() as { members: string[] };
            setResult(result.members);
        }
    }, []);

    return (
        <div>
            <label htmlFor={"first"}>1人目</label>
            <input type={"text"} ref={firstRef} id={"first"} name={"first"} placeholder={"1人目"}/>
            <label htmlFor={"second"}>2人目</label>
            <input type={"text"} ref={secondRef} id={"second"} name={"second"} placeholder={"2人目"}/>
            <label htmlFor={"third"}>First</label>
            <input type={"text"} ref={thirdRef} id={"third"} name={"third"} placeholder={"3人目"}/>
            <button onClick={callApi}>シャッフル</button>
            <label htmlFor={"result"}>Result</label>
            <output id={"result"} htmlFor={"first second third"}>{result.join("->")}</output>

            <input
                ref={inputRef}
                value={member}
                onChange={(e) => setMember(e.target.value)}
            />
            <button onClick={addMember}>Add</button>
            <ul>
                {members.map((member) => (
                    <li key={member}>{member}</li>
                ))}
            </ul>
        </div>
    );
}