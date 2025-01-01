import { NavLink } from 'react-router';

const PageHeader = () => {
  return (
    <header>
      <h1>Todo App</h1>
      <nav className="row">
        <NavLink to="/activites">Activites</NavLink>
        <NavLink to="/activites/new">Add activty</NavLink>
        <NavLink to="/blocks">Blocks</NavLink>
        <NavLink to="/blocks/new">Add block</NavLink>
        <NavLink to="/sessions">Sessions</NavLink>
        <NavLink to="/sessions/new">Add session</NavLink>
        <NavLink to="/tracking">Tracking</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </header>
  );
};

export default PageHeader;
