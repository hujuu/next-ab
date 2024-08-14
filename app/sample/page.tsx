import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "テストページ",
    description: "ハンズオン",
}

export default function Sample() {
    return (
        <main>
            <h1>ハンズオン</h1>
        </main>
    );
}
