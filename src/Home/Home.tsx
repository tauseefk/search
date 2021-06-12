import { useEffect, useState } from "react";
import { getResultsFor } from "../api";
import {
  getCircularIndex,
  isArrowDown,
  isArrowUp,
  isEnter,
  openURL,
  useThrottle,
} from "../utils";
import { InputBar } from "./InputBar";
import { IResultProps, Results } from "./Results";
import "./styles.scss";

export const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IResultProps[]>([]);
  const [focusedResultIdx, setFocusedResultIdx] = useState(-1);

  const debouncedFetchQueryResult = useThrottle(
    getResultsFor,
    250,
    []
  );

  const handleOnKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { code } = e;

    if (!(isEnter(code) || isArrowDown(code) || isArrowUp(code))) return;
    e.preventDefault();

    if (isEnter(code)) {
      const currentResult = results[focusedResultIdx];
      currentResult && openURL(currentResult.url);
    }
    if (isArrowDown(code)) {
      setFocusedResultIdx(
        getCircularIndex(focusedResultIdx + 1, results.length)
      );
    } else if (isArrowUp(code)) {
      setFocusedResultIdx(
        getCircularIndex(focusedResultIdx - 1, results.length)
      );
    }
  };

  const handleOnQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;

    setQuery(value);
  };

  useEffect(() => {
    debouncedFetchQueryResult(query).then((results) => {
      setResults(
        results.map((r: any) => ({
          title: r.title,
          tags: r.labels,
          description: r.body,
          url: r.html_url,
        }))
      );
    });
  }, [debouncedFetchQueryResult, query]);

  return (
    <div className="search-container">
      <InputBar
        value={query}
        setValue={setQuery}
        captureFocus={true}
        handleOnKeydown={handleOnKeydown}
        handleOnChange={handleOnQueryChange}
        placeholder="What are you looking for?"
      />
      <Results focusedResultIdx={focusedResultIdx} results={results} />
    </div>
  );
};
