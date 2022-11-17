import Head from "next/head";
import { useState } from "react";
import styles from "../index.module.css";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/prompts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: textInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setTextInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
      </Head>

      <main className={styles.main}>
        <h3>Enter the prompt</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="Write a prompt"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Generate text" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
