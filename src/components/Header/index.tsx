import "./Header.css";
import {useHistory} from "react-router-dom";
import React, {FC} from "react";

const Header: FC = () => {
  const history = useHistory();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    if (e.target.value === 'Favorite') {
      history.push('/favorite');
    } else {
      history.push('/');
    }
  }

  return (
    <header className="header">
      <span className="header__title">Movies</span>
      <select className="header__dropmenu" id="" onChange={onChange}>
        <option className="dropmenu__item" value="Account">
          My Account
        </option>
        <option className="dropmenu__item" value="Favorite">
          My Favorite
        </option>
      </select>
    </header>
  );
};

export default Header;
