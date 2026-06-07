"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.css";

export type AccordionItem = {
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className={styles.list}>
      {items.map((item, index) => (
        <article className={styles.item} key={item.question}>
          <button
            aria-expanded={open === index}
            aria-controls={`faq-${index}`}
            onClick={() => setOpen(open === index ? -1 : index)}
            type="button"
          >
            <span>{item.question}</span>
            <ChevronDown aria-hidden className={open === index ? styles.open : ""} />
          </button>
          <div
            className={`${styles.answer} ${open === index ? styles.expanded : ""}`}
            id={`faq-${index}`}
            aria-hidden={open !== index}
          >
            <div className={styles.answerInner}>
              <p>{item.answer}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
