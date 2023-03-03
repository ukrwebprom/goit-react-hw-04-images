import clsx from "clsx";
import { useState } from "react";
import PropTypes from "prop-types";


export function Searchbar({onSubmit}) {
    const [request, setRequest] = useState('');
    
    const handleOnSubmit = e => {
        e.preventDefault();
        onSubmit(request)
    }

    return ( 
        <div className="Searchbar">
            <form className="SearchForm" onSubmit={handleOnSubmit}>
                <button type="submit" 
                className={clsx("SearchForm-button", !request.trim().length && "disabled")}
                disabled={!request.trim().length}>
                <span className="SearchForm-button-label">Search</span>
                </button>

                <input type="text" 
                name="request"
                className="SearchForm-input" 
                placeholder="Search images and photos" 
                autoComplete="off"
                autoFocus
                onChange = {e => setRequest(e.currentTarget.value)}
                value = {request}
                />
            </form>
        </div>
    )
}

Searchbar.propTypes = {
    onSubmit:PropTypes.func.isRequired,
}