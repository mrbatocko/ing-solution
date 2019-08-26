import React from 'react';
import Select from 'react-select';
import { getSections } from '@/services/sections/sectionsServices';

import classes from './Filters.css';

class Filters extends React.Component {

  state = {
    active: false,
    sections: [],
    title: ''
  }

  onTitleChange = event => {
    this.setState({ title: event.target.value }, () => {

    });
  }

  searchByTitle = () => {
    const { title } = this.state;
    const { applyFilters } = this.props;
    if (title) {
      applyFilters({ title });
    } else {
      applyFilters({ title: '' });
    }
  }

  componentDidMount () {
    const fetch = async () => {
      const response = await getSections();
      if (response.data) {
        this.setState({ sections: response.data.data.sections });
      }
    }
    fetch();
  }

  toggleFilters = event => {
    event.preventDefault();
    this.setState({ active: !this.state.active });
  }

  render () {
    const { sections, title, active } = this.state;
    const { applyFilters } = this.props;
    return (
      <div className={classes.filters}>
        <a href="#" onClick={this.toggleFilters} className={[ classes.mobileFiltersToggle ].join(' ')}>
          Filters
          {this.state.active ? <span>&uarr;</span> : <span>&darr;</span>}
        </a>
        <div className={!active ? classes.fieldsMobileInactive : ''}>
          <div className="mb-3">
            <p className="text-sm uppercase text-semi-bold grey-dark">Search</p>
            <input
              placeholder="Type here..."
              onChange={this.onTitleChange}
              value={title}
              className="border-rounded border border-grey-dark p-1 mb-1 full-width block"
            />
            <div className="text-right">
              <button
                className="white full-width border-rounded pt-1 pb-1 bg-green-dark border-none"
                type="button"
                onClick={this.searchByTitle}>
                Go
              </button>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase text-semi-bold grey-dark">Filter by Section</p>
            <Select
              options={sections.map(s => {
                return { label: s.name, value: s._id }
              })}
              onChange={obj => applyFilters({ section: obj.label })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Filters;