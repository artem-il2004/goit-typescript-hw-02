import { ChangeEvent, FormEvent, useState } from "react";
import css from "./SearchBar.module.css";

interface Props {
  formSub: (event: FormEvent<HTMLFormElement>) => void;
}

function SearchBar({ formSub }: Props) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={formSub}>
        <input
          className={css.inputField}
          type="text"
          autoComplete="off"
          autoFocus
          name="inputField"
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className={css.subBtn}>
          Search
        </button>
      </form>
    </header>
  );
}

export default SearchBar;
