import { getContrast } from "../../lib/contrast";
import { openURL } from "../../utils";
import "./styles.scss";

interface IQueryResults {
  results: IResultProps[];
  focusedResultIdx: number;
}
export const Results = ({ focusedResultIdx, results }: IQueryResults) => {
  return (
    <div className="results-list">
      {results.map((x, idx) => {
        return (
          <Result key={x.url} {...x} isFocused={idx === focusedResultIdx} />
        );
      })}
    </div>
  );
};

export interface IResultProps {
  title: string;
  description: string;
  tags: { [key: string]: string }[];
  url: string;
  isFocused: boolean;
}
const Result = ({ title, description, tags, url, isFocused }: IResultProps) => {
  return (
    <div
      onClick={() => openURL(url)}
      className={isFocused ? "result-container focused" : "result-container"}
    >
      <div className="result-content">
        <div className="title ellipsis">{title}</div>
        {description && (
          <div
            className={
              isFocused ? "result-body ellipsis" : "result-body ellipsis hide"
            }
          >
            {description}
          </div>
        )}
      </div>
      <div className="tags">
        {tags.map((t: any) => {
          return (
            <span
              key={t.name}
              style={{
                backgroundColor: `#${t.color}`,
                color: `${getContrast(t.color)}`,
              }}
              className="font-small tag ellipsis"
            >
              {t.name}
            </span>
          );
        })}
      </div>
    </div>
  );
};
